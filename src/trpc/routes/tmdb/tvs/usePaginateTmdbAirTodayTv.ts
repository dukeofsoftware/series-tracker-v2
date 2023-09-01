import { cookies } from "next/headers"
import { publicProcedure } from "@/trpc/methods"
import { TrpcTmdbPaginateSearchInput } from "@/trpc/routes/types"
import { TRPCError } from "@trpc/server"

import { Locale } from "@/config/i18n.config"
import { options } from "@/config/tmdb-config"
import { RateLimiterError } from "@/lib/rate-limit"

export const usePaginateTmdbAirTodayTv = publicProcedure
  .input(TrpcTmdbPaginateSearchInput)
  .query(async (opts) => {
    try {
      const page = opts.input.page || "1"
      const language =
        opts.input.lang ||
        (cookies().get("NEXT_LOCALE")?.value as Locale) ||
        "en-US"

      const url = `https://api.themoviedb.org/3/tv/airing_today?language=${language}&page=${page}`
      const data = await fetch(url, options).then((response) => response.json())
      data.results = data.results.map((item: any) => {
        return {
          date: item.first_air_date,
          id: item.id,
          title: item.name || item.original_name,
          original_title: item.original_name || item.name,
          overview: item.overview,
          poster_path: item.poster_path,
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
