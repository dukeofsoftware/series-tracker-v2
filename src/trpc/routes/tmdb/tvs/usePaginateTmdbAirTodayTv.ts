import { publicProcedure } from "@/trpc/methods"
import { TrpcTmdbPaginateSearchInput } from "@/trpc/routes/types"
import { TRPCError } from "@trpc/server"

import { options } from "@/config/tmdb-config"
import { RateLimiterError } from "@/lib/rate-limit"

export const usePaginateTmdbAirTodayTv = publicProcedure
  .input(TrpcTmdbPaginateSearchInput)
  .query(async (opts) => {
    try {
      const page = opts.input.page || "1"
      const language = opts.input.lang || opts.ctx.language

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
