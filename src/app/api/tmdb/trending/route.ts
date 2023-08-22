import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { options } from "@/config/tmdb-config"
import { RateLimiter, RateLimiterError } from "@/lib/rate-limit"

const limiter = new RateLimiter({
  maxRequests: 12,
  interval: 3 * 1000 /* 3 seconds */,
})
export async function GET(request: NextRequest) {
  try {
    await limiter.limit()
    const { searchParams } = new URL(request.url)
    const language =
      searchParams.get("language") ||
      cookies().get("NEXT_LOCALE")?.value ||
      "en-US"
    const page = searchParams.get("page") || "1"
    const data = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?language=${language}&page=${page}`,
      options
    ).then((response) => response.json())
    data.results = data.results.filter(
      (item: any) => item.media_type !== "person"
    )

    return NextResponse.json(data, {
      status: 200,
    })
  } catch (error) {
    if (error instanceof RateLimiterError) {
      return new Response(`Too many requests. Please try again later.`, {
        status: 429,
        headers: {
          "Retry-After": `${Math.ceil(error.retryAfter / 1000)}`,
        },
      })
    }
    console.error("TMDB TRENDİNG ERROR: ", error)
    return NextResponse.json(error, {
      status: 500,
    })
  }
}
