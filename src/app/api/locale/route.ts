import { cookies } from "next/headers"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    cookies().set("localeCookie", body.language)

    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
    })
  } catch (error: any) {
    console.error(error)
    return new Response(error, {
      status: 500,
    })
  }
}
