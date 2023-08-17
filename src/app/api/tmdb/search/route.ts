import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { options } from "@/config/tmdb-config"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const language =
      searchParams.get("language") ||
      cookies().get("NEXT_LOCALE")?.value ||
      "en-US"
    const page = searchParams.get("page") || "1"
    const adult = searchParams.get("adult") || "false"
    const query = searchParams.get("query") || ""
    const type = searchParams.get("type") || "all"
    if (!query)
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    if (type === "all") {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=${adult}&language=${language}&page=${page}`,
        options
      )
        .then((response) => response.json())
        .catch((err) => console.error(err))
      return NextResponse.json(data)
    }
    if (type === "movie") {
      const release_year = searchParams.get("year")
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=${adult}&language=${language}&${
          release_year && `primary_release_year=${release_year}`
        }&page=${page}`,
        options
      )
        .then((response) => response.json())
        .catch((err) => console.error(err))

      return NextResponse.json(data)
    }
    if (type === "series") {
      const air_year = searchParams.get("year")
      const data = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${query}&${
          air_year && `first_air_date_year=${air_year}`
        }&include_adult=${adult}&language=${language}&page=${page}}`,
        options
      )
        .then((response) => response.json())
        .catch((err) => console.error(err))
      return NextResponse.json(data)
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
