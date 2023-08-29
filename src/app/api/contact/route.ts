import { NextRequest, NextResponse } from "next/server"
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens"
import nodemailer from "nodemailer"
import { parse } from "valibot"

import { authConfig } from "@/config/server-config"
import { RateLimiter, RateLimiterError } from "@/lib/rate-limit"
import { ContactValidator } from "@/lib/validators/contactSchema"

const limiter = new RateLimiter({
  maxRequests: 1,
  /* 1 hour */
  interval: 60 * 60 * 1000,
})
export async function POST(request: NextRequest) {
  try {
    await limiter.limit()
    const tokens = await getTokens(request.cookies, authConfig)

    if (!tokens) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const body = await request.json()
    const { name, email, message } = parse(ContactValidator, body)
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }
    const transporter = nodemailer.createTransport({
      port: 465,
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD,
      },
      secure: true,
    })
    const mailData = {
      from: email,
      to: process.env.MAILER_EMAIL,
      subject: `Message From ${email}, ${name}`,
      text: message,
      html: `<div>${message}</div>`,
    }
    await transporter.sendMail(mailData, function (err, info) {
      if (err) {
        console.error(err)
        return NextResponse.json(
          { error: "Something went wrong" },
          { status: 500 }
        )
      }
    })

    return NextResponse.json({ message: "Message sent successfully" })
  } catch (error: any) {
    if (error instanceof RateLimiterError) {
      return new Response(`Too many requests. Please try again later.`, {
        status: 429,
        headers: {
          "Retry-After": `${Math.ceil(error.retryAfter / 1000)}`,
        },
      })
    }
    console.error(error)
    return NextResponse.json(
      { error: "Something went wrong", message: error },
      { status: 500 }
    )
  }
}