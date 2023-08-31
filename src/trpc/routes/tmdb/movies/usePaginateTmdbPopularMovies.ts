import { publicProcedure } from "@/trpc/methods"
import { limiter } from "@/trpc/routes"
import { TrpcTmdbPaginateSearchInput } from "@/trpc/routes/types"
import { TRPCError } from "@trpc/server"

import { options } from "@/config/tmdb-config"
import { RateLimiterError } from "@/lib/rate-limit"
import { cookies } from "next/headers"
import { Locale } from "@/config/i18n.config"

export const usePaginateTmdbPopularMovies = publicProcedure
  .input(TrpcTmdbPaginateSearchInput)
  .query(async (opts) => {
    try {
      await limiter.limit()

      const page = opts.input.page || "1"
      const language = opts.input.lang || cookies().get("NEXT_LOCALE")?.value as Locale || "en-US"
      const url = `'https://api.themoviedb.org/3/movie/popular?language=${language}&page=${page}`
      const data = await fetch(url, options).then((response) => response.json())
      data.results = data.results.map((item: any) => {
        return {
          adult: item.adult,
          poster_path: item.poster_path,
          date: item.release_date,
          id: item.id,
          title: item.title || item.origina_title,
          original_title: item.original_title || item.original_name,
          overview: item.overview,
          media_type: "movie",
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
      console.error("TMDB POPULAR MOVİES ERROR: ", error)
      return { error: "Something went wrong" }
    }
  })
