import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { options } from "@/config/tmdb-config"

export async function GET(request: NextRequest) {
  try {
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
    console.error("TMDB TRENDİNG ERROR: ", error)
    return NextResponse.json(error, {
      status: 500,
    })
  }
}
