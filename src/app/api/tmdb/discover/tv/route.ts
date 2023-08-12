import { NextResponse } from "next/server"

export async function GET() {
  try {
    return NextResponse.redirect("/login")
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
