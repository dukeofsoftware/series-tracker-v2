import { NextRequest, NextResponse } from "next/server"

import { options } from "@/config/tmdb-config"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const isAdult = searchParams.get("isAdult") || false
    const language = searchParams.get("language") || "en-US"
    const genres = searchParams.get("genres") || ""
    const page = searchParams.get("page") || 1

    const movies = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=${isAdult}&include_video=false&language=${language}&page=${page.toString()}&sort_by=popularity.desc`,
      options
    )
      .then((response) => response.json())
      .catch((err) => console.error(err))
    return NextResponse.json(movies, {
      status: 200,
    })
  } catch (error) {
    console.error("DISCOVER MOVIE: ", error)
    return NextResponse.json(error, {
      status: 500,
    })
  }
}
