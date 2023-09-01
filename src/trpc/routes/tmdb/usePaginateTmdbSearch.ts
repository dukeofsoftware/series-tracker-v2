import { cookies } from "next/headers"
import { publicProcedure } from "@/trpc/methods"
import { limiter } from "@/trpc/routes"
import { TrpcSearchInput } from "@/trpc/routes/types"
import { TRPCError } from "@trpc/server"

import { Locale } from "@/config/i18n.config"
import { options } from "@/config/tmdb-config"
import { RateLimiterError } from "@/lib/rate-limit"

export const usePaginateTmdbSearch = publicProcedure
  .input(TrpcSearchInput)
  .query(async (opts) => {
    try {
      await limiter.limit()

      const language =
        opts.input.lang ||
        (cookies().get("NEXT_LOCALE")?.value as Locale) ||
        "en-US"

      const page = opts.input.page || "1"
      const adult = opts.input.adult || "false"
      const query = opts.input.query || ""
      const type = opts.input.type || "multi"
      const first_air_date_year = type === "tv" ? opts.input.date : ""
      const primary_release_year = type === "movie" ? opts.input.date : ""

      if (!query) return { error: "Query is required" }

      const url = `https://api.themoviedb.org/3/search/${type}?query=${query}&include_adult=${adult}&language=${language}&page=${page}${
        type === "movie" && primary_release_year
          ? `&primary_release_year=${primary_release_year}`
          : ""
      }${
        type === "tv" && first_air_date_year
          ? `&first_air_date_year=${first_air_date_year}`
          : ""
      }`

      const data = await fetch(url, options).then((response) => response.json())
      data.results = data.results.map((item: any) => {
        return {
          adult: item.adult,
          poster_path: item.poster_path,
          media_type: item.media_type,
          date: item.release_date || item.first_air_date,
          id: item.id,
          title:
            item.title || item.origina_title || item.name || item.original_name,
          original_title: item.original_title || item.original_name,
          overview: item.overview,
        }
      })

      return data
    } catch (error) {
      if (error instanceof RateLimiterError) {
        return new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many requests. Please try again later.",
          cause: error,
        })
      }
      console.error("TMDB SEARCH ERROR: ", error)
      return { error: "Something went wrong" }
    }
  })
