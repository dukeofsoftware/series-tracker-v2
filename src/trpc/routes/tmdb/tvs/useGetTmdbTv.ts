import { publicProcedure } from "@/trpc/methods"
import { limiter } from "@/trpc/routes"
import { TrpcGetTmdbPageWithIdInput } from "@/trpc/routes/types"
import { TRPCError } from "@trpc/server"

import { options } from "@/config/tmdb-config"
import { RateLimiterError } from "@/lib/rate-limit"

export const useGetTmdbTv = publicProcedure
  .input(TrpcGetTmdbPageWithIdInput)
  .query(async (opts) => {
    try {
      await limiter.limit()

      const id = opts.input.id
      const language = opts.input.lang || opts.ctx.language

      const url = `https://api.themoviedb.org/3/tv/${id}?append_to_response=images%2Csimilar%2Cseasons&language=${language}`
      const data = await fetch(url, options).then((response) => response.json())
      if (
        data.images.backdrops.length === 0 ||
        data.images.logos.length === 0 ||
        data.images.posters.length === 0
      ) {
        const images = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/images`,
          options
        ).then((response) => response.json())
        return {
          ...data,
          first_air_date: data.first_air_date,
          adult: data.adult,
          backdrop_path: data.backdrop_path,
          genres: data.genres,
          id: data.id,
          overview: data.overview,
          poster_path: data.poster_path,
          runtime: data.episode_run_time[0],
          status: data.status,
          tagline: data.tagline,
          title: data.name || data.original_name,
          similar: data.similar.results,
          in_production: data.in_production,
          last_air_date: data.last_air_date,
          last_episode_to_air: data.last_episode_to_air,
          number_of_episodes: data.number_of_episodes,
          number_of_seasons: data.number_of_seasons,
          seasons: data.seasons,
          images: images,
        }
      }
      return {
        first_air_date: data.first_air_date,
        adult: data.adult,
        backdrop_path: data.backdrop_path,
        genres: data.genres,
        id: data.id,
        overview: data.overview,
        poster_path: data.poster_path,
        runtime: data.episode_run_time[0],
        status: data.status,
        tagline: data.tagline,
        title: data.name || data.original_name,
        similar: data.similar.results,
        images: data.images,
        in_production: data.in_production,
        last_air_date: data.last_air_date,
        last_episode_to_air: data.last_episode_to_air,
        number_of_episodes: data.number_of_episodes,
        number_of_seasons: data.number_of_seasons,
        seasons: data.seasons,
      }
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
