import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { TVShow } from "@/types/series"

import { options } from "@/config/tmdb-config"

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      seriesId: string
    }
  }
) {
  try {
    const { seriesId } = params
    if (!seriesId)
      return NextResponse.json(
        { message: "seriesId is required" },
        { status: 400 }
      )
    const { searchParams } = new URL(req.url)
    const language =
      searchParams.get("language") ||
      cookies().get("NEXT_LOCALE")?.value ||
      "en-US"
    let result: TVShow = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}?append_to_response=images%2Csimilar%2Cseasons&language=${language}`,
      options
    )
      .then((response) => response.json())
      .catch((err) => console.error(err))

    if (
      result.images.backdrops.length === 0 ||
      result.images.logos.length === 0 ||
      result.images.posters.length === 0
    ) {
      const images = await fetch(
        "https://api.themoviedb.org/3/tv/37854/images",
        options
      )
        .then((response) => response.json())
        .catch((err) => console.error(err))

      const formattedResult = {
        adult: result.adult,
        backdrop_path: result.backdrop_path,
        genres: result.genres,
        id: result.id,
        overview: result.overview,
        poster_path: result.poster_path,
        runtime: result.episode_run_time,
        status: result.status,
        tagline: result.tagline,
        title: result.name,
        similar: result.similar.results,
        images: images,
        in_production: result.in_production,
        last_air_date: result.last_air_date,
        last_episode_to_air: result.last_episode_to_air,
        number_of_episodes: result.number_of_episodes,
        number_of_seasons: result.number_of_seasons,
        seasons: result.seasons,
      }
      return NextResponse.json(formattedResult, { status: 200 })
    } else {
      const formattedResult = {
        adult: result.adult,
        backdrop_path: result.backdrop_path,
        genres: result.genres,
        id: result.id,
        overview: result.overview,
        poster_path: result.poster_path,
        runtime: result.episode_run_time,
        status: result.status,
        tagline: result.tagline,
        title: result.name,
        similar: result.similar.results,
        images: result.images,
        in_production: result.in_production,
        last_air_date: result.last_air_date,
        last_episode_to_air: result.last_episode_to_air,
        number_of_episodes: result.number_of_episodes,
        number_of_seasons: result.number_of_seasons,
        seasons: result.seasons,
      }
      return NextResponse.json(formattedResult, { status: 200 })
    }
  } catch (e) {
    console.error("MOVİES ID API", e)
    return NextResponse.json(e, {
      status: 500,
    })
  }
}
