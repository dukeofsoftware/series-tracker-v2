import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { MovieData } from "@/types/movies"

import { options } from "@/config/tmdb-config"
import { RateLimiter, RateLimiterError } from "@/lib/rate-limit"

const limiter = new RateLimiter({
  maxRequests: 12,
  interval: 5 * 1000 /* 5 seconds */,
})
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      movieId: string
    }
  }
) {
  try {
    await limiter.limit()
    const { movieId } = params
    if (!movieId)
      return NextResponse.json(
        { message: "Movie id is required" },
        { status: 400 }
      )
    const { searchParams } = new URL(req.url)
    const language =
      searchParams.get("language") ||
      cookies().get("NEXT_LOCALE")?.value ||
      "en-US"

    let result: MovieData = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=similar,images&language=${language}`,
      options
    ).then((response) => response.json())

    if (
      result.images.backdrops.length === 0 ||
      result.images.logos.length === 0 ||
      result.images.posters.length === 0
    ) {
      const images = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/images`,
        options
      )
        .then((response) => response.json())
        .catch((err) => console.error(err))
      const formattedResult = {
        adult: result.adult,
        backdrop_path: result.backdrop_path,
        genres: result.genres,
        id: result.id,
        original_title: result.original_title,
        overview: result.overview,
        poster_path: result.poster_path,
        runtime: result.runtime,
        release_date: result.release_date,
        status: result.status,
        tagline: result.tagline,
        title: result.title,
        similar: result.similar.results.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            original_title: movie.original_title,
            overview: movie.overview,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
          }
        }),
        images: images,
      }
      return NextResponse.json(formattedResult, { status: 200 })
    } else {
      const formattedResult = {
        adult: result.adult,
        backdrop_path: result.backdrop_path,
        genres: result.genres,
        id: result.id,
        original_title: result.original_title,
        overview: result.overview,
        poster_path: result.poster_path,
        runtime: result.runtime,
        release_date: result.release_date,
        status: result.status,
        tagline: result.tagline,
        title: result.title,
        similar: result.similar.results,
        images: result.images,
      }
      return NextResponse.json(formattedResult, { status: 200 })
    }
  } catch (error) {
    if (error instanceof RateLimiterError) {
      return new Response(`Too many requests. Please try again later.`, {
        status: 429,
        headers: {
          "Retry-After": `${Math.ceil(error.retryAfter / 1000)}`,
        },
      })
    }
    console.error("MOVİES ID API", error)
    return NextResponse.json(error, {
      status: 500,
    })
  }
}
