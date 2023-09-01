import { cookies } from "next/headers"
import { publicProcedure } from "@/trpc/methods"
import { limiter } from "@/trpc/routes"
import { TrpcTmdbPaginateSearchInput } from "@/trpc/routes/types"

import { Locale } from "@/config/i18n.config"
import { options } from "@/config/tmdb-config"
import { RateLimiterError } from "@/lib/rate-limit"

export const usePaginateTmdbTrending = publicProcedure
  .input(TrpcTmdbPaginateSearchInput)
  .query(async (opts) => {
    try {
      await limiter.limit()
      const language =
        opts.input.lang ||
        (cookies().get("NEXT_LOCALE")?.value as Locale) ||
        "en-US"
      const page = opts.input.page || "1"

      const data = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?language=${language}&page=${page}`,
        options
      ).then((response) => response.json())
      data.results = data.results.filter(
        (item: any) => item.media_type !== "person"
      )
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
        return {
          error: `Too many requests. Please try again later.`,
        }
      }
      console.error("TMDB TRENDİNG ERROR: ", error)
      return { error: "Something went wrong" }
    }
  })
