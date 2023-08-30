import { publicProcedure } from "@/trpc/methods"
import { limiter } from "@/trpc/routes"
import { TrpcTmdbPaginateSearchInput } from "@/trpc/routes/types"
import { TRPCError } from "@trpc/server"

import { options } from "@/config/tmdb-config"
import { RateLimiterError } from "@/lib/rate-limit"

export const usePaginateTmdbOnTheAirTv = publicProcedure
  .input(TrpcTmdbPaginateSearchInput)
  .query(async (opts) => {
    try {
      await limiter.limit()

      const page = opts.input.page || "1"
      const language = opts.input.lang || opts.ctx.language

      const url = `https://api.themoviedb.org/3/tv/on_the_air?language=${language}&page=${page}`
      const data = await fetch(url, options).then((response) => response.json())
      data.results = data.results.map((item: any) => {
        return {
          date: item.first_air_date,
          id: item.id,
          title: item.name || item.original_name,
          original_title: item.original_name || item.name,
          overview: item.overview,
          poster_path: item.poster_path,
          media_type: "tv",
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
