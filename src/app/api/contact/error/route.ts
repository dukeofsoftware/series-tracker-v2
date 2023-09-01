import { NextRequest, NextResponse } from "next/server"
import { env } from "@/env.mjs"
import nodemailer from "nodemailer"

import { RateLimiter, RateLimiterError } from "@/lib/rate-limit"

const limiter = new RateLimiter({
  maxRequests: 1,
  /* 10 seconds */
  interval: 10 * 1000,
})
export async function POST(request: NextRequest) {
  try {
    await limiter.limit()

    const body = await request.json()
    const { error, path, message, stack } = body

    const transporter = nodemailer.createTransport({
      port: 465,
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: env.MAILER_EMAIL,
        pass: env.MAILER_PASSWORD,
      },
      secure: true,
    })
   

    const mailData = {
      from: env.MAILER_EMAIL,
      to: env.MAILER_EMAIL,
      subject: `Error from ${path}`,
      text: `${error}: ${message}\n${stack}`,
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
