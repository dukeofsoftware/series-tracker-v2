import { cookies } from "next/headers"
import { publicProcedure } from "@/trpc/methods"
import { limiter } from "@/trpc/routes"
import { TrpcGetTmdbPageWithIdInput } from "@/trpc/routes/types"
import { TRPCError } from "@trpc/server"

import { Locale } from "@/config/i18n.config"
import { options } from "@/config/tmdb-config"
import { RateLimiterError } from "@/lib/rate-limit"

export const useGetTmdbMovie = publicProcedure
  .input(TrpcGetTmdbPageWithIdInput)
  .query(async (opts) => {
    try {
      await limiter.limit()

      const id = opts.input.id
      const language =
        opts.input.lang ||
        (cookies().get("NEXT_LOCALE")?.value as Locale) ||
        "en-US"

      const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=images%2Csimilar%2Cseasons&language=${language}`
      const data = await fetch(url, options).then((response) => response.json())
      if (
        data.images.backdrops.length === 0 ||
        data.images.logos.length === 0 ||
        data.images.posters.length === 0
      ) {
        const images = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/images`,
          options
        ).then((response) => response.json())
        return {
          ...data,
          images: images,
          media_type: "movie",
          similar: data.similar.results.map((movie: any) => {
            return {
              id: movie.id,
              title: movie.title,
              original_title: movie.original_title,
              overview: movie.overview,
              poster_path: movie.poster_path,
              release_date: movie.release_date,
            }
          }),
        }
      }
      return data
    } catch (error) {
      if (error instanceof RateLimiterError) {
        return new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many requests. Please try again later.",
          cause: error,
        })
      }
      console.error("TMDB TMDB MOVİE ERROR: ", error)
      return { error: "Something went wrong" }
    }
  })
