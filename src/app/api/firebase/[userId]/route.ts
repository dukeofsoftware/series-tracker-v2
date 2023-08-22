import { NextResponse } from "next/server"

import { db } from "@/lib/firebase/admin"
import { RateLimiter, RateLimiterError } from "@/lib/rate-limit"

const limiter = new RateLimiter({
  maxRequests: 10,
  interval: 60 * 1000 /* 60 seconds */,
})
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      userId: string
    }
  }
) {
  try {
    await limiter.limit()
    const seriesRef = db.collection(`users/${params.userId}/series`)
    const moviesRef = db.collection(`users/${params.userId}/movies`)
    const movies = await moviesRef
      .where(`isFavorite`, `==`, true)
      .get()
      .then((snapshot) => {
        const movies: any = []
        snapshot.forEach((doc) => {
          movies.push(doc.data())
        })
        return movies
      })

    const series = await seriesRef
      .where(`isFavorite`, `==`, true)
      .get()
      .then((snapshot) => {
        const series: any = []
        snapshot.forEach((doc) => {
          series.push(doc.data())
        })
        return series
      })
    const favorites = movies.concat(series)
    return NextResponse.json(favorites)
  } catch (error) {
    if (error instanceof RateLimiterError) {
      return new Response(`Too many requests. Please try again later.`, {
        status: 429,
        headers: {
          "Retry-After": `${Math.ceil(error.retryAfter / 1000)}`,
        },
      })
    }
    console.error(error)
    return NextResponse.error()
  }
}
