import { cookies } from "next/headers"
import { TRPCError } from "@trpc/server"
import nodemailer from "nodemailer"

import { Locale } from "@/config/i18n.config"
import { options } from "@/config/tmdb-config"
import { RateLimiter, RateLimiterError } from "@/lib/rate-limit"
import {
  TrpcGetTmdbPageWithIdInput,
  TrpcLocaleInput,
  TrpcSearchInput,
  TrpcSendMailInput,
  TrpcTmdbPaginateSearchInput,
} from "@/lib/trpc/types"
import { publicProcedure, router } from "./trpc"

const limiter = new RateLimiter({
  maxRequests: 12,
  interval: 3 * 1000 /* 3 seconds */,
})
const sendMailLimiter = new RateLimiter({
  maxRequests: 1,
  /* 4 hour */
  interval: 4 * 60 * 60 * 1000,
})
export const appRouter = router({
  usePaginateTmdbTrending: publicProcedure
    .input(TrpcTmdbPaginateSearchInput)
    .query(async (opts) => {
      try {
        await limiter.limit()
        if (opts.input.lang === undefined) {
          opts.input.lang =
            (cookies().get("NEXT_LOCALE")?.value as Locale) || "en-US"
        }
        if (opts.input.page === undefined) {
          opts.input.page = "1"
        }

        const data = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?language=${opts.input.lang}&page=${opts.input.page}`,
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
              item.title ||
              item.origina_title ||
              item.name ||
              item.original_name,
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
    }),
  usePaginateTmdbSearch: publicProcedure
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

        const data = await fetch(url, options).then((response) =>
          response.json()
        )
        data.results = data.results.map((item: any) => {
          return {
            adult: item.adult,
            poster_path: item.poster_path,
            media_type: item.media_type,
            date: item.release_date || item.first_air_date,
            id: item.id,
            title:
              item.title ||
              item.origina_title ||
              item.name ||
              item.original_name,
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
    }),

  useGetTmdbMovie: publicProcedure
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
        const data = await fetch(url, options).then((response) =>
          response.json()
        )
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
    }),
  usePaginateTmdbUpcomingMovies: publicProcedure
    .input(TrpcTmdbPaginateSearchInput)
    .query(async (opts) => {
      try {
        await limiter.limit()
        const page = opts.input.page || "1"
        const language =
          opts.input.lang ||
          (cookies().get("NEXT_LOCALE")?.value as Locale) ||
          "en-US"
        const url = `https://api.themoviedb.org/3/movie/upcoming?language=${language}&page=${page}`
        const data = await fetch(url, options).then((response) =>
          response.json()
        )
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
        console.error("TMDB UPCOMİNG MOVİES ERROR: ", error)
        return { error: "Something went wrong" }
      }
    }),
  usePaginateTmdbTopRatedMovies: publicProcedure
    .input(TrpcTmdbPaginateSearchInput)
    .query(async (opts) => {
      try {
        await limiter.limit()

        const page = opts.input.page || "1"
        const language =
          opts.input.lang ||
          (cookies().get("NEXT_LOCALE")?.value as Locale) ||
          "en-US"
        const url = `https://api.themoviedb.org/3/movie/top_rated?language=${language}&page=${page}`
        const data = await fetch(url, options).then((response) =>
          response.json()
        )
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
        console.error("TMDB TOP RATED MOVİES ERROR: ", error)
        return { error: "Something went wrong" }
      }
    }),
  usePaginateTmdbPopularMovies: publicProcedure
    .input(TrpcTmdbPaginateSearchInput)
    .query(async (opts) => {
      try {
        await limiter.limit()

        const page = opts.input.page || "1"
        const language =
          opts.input.lang ||
          (cookies().get("NEXT_LOCALE")?.value as Locale) ||
          "en-US"
        const url = `'https://api.themoviedb.org/3/movie/popular?language=${language}&page=${page}`
        const data = await fetch(url, options).then((response) =>
          response.json()
        )
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
    }),
  useGetTmdbTv: publicProcedure
    .input(TrpcGetTmdbPageWithIdInput)
    .query(async (opts) => {
      try {
        await limiter.limit()

        const id = opts.input.id
        const language =
          opts.input.lang ||
          (cookies().get("NEXT_LOCALE")?.value as Locale) ||
          "en-US"

        const url = `https://api.themoviedb.org/3/tv/${id}?append_to_response=images%2Csimilar%2Cseasons&language=${language}`
        const data = await fetch(url, options).then((response) =>
          response.json()
        )
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
    }),
  usePaginateTmdbAirTodayTv: publicProcedure
    .input(TrpcTmdbPaginateSearchInput)
    .query(async (opts) => {
      try {
        const page = opts.input.page || "1"
        const language =
          opts.input.lang ||
          (cookies().get("NEXT_LOCALE")?.value as Locale) ||
          "en-US"
        const url = `https://api.themoviedb.org/3/tv/airing_today?language=${language}&page=${page}`
        const data = await fetch(url, options).then((response) =>
          response.json()
        )
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
    }),
  usePaginateTmdbOnTheAirTv: publicProcedure
    .input(TrpcTmdbPaginateSearchInput)
    .query(async (opts) => {
      try {
        await limiter.limit()

        const page = opts.input.page || "1"
        const language =
          opts.input.lang ||
          (cookies().get("NEXT_LOCALE")?.value as Locale) ||
          "en-US"
        const url = `https://api.themoviedb.org/3/tv/on_the_air?language=${language}&page=${page}`
        const data = await fetch(url, options).then((response) =>
          response.json()
        )
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
    }),
  usePaginateTmdbPopularTv: publicProcedure
    .input(TrpcTmdbPaginateSearchInput)
    .query(async (opts) => {
      try {
        await limiter.limit()
        const page = opts.input.page || "1"
        const language =
          opts.input.lang ||
          (cookies().get("NEXT_LOCALE")?.value as Locale) ||
          "en-US"
        const url = `https://api.themoviedb.org/3/tv/popular?language=${language}&page=${page}`
        const data = await fetch(url, options).then((response) =>
          response.json()
        )
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
    }),
  usePaginateTmdbTopRatedTv: publicProcedure
    .input(TrpcTmdbPaginateSearchInput)
    .query(async (opts) => {
      try {
        await limiter.limit()
        const page = opts.input.page || "1"
        const language =
          opts.input.lang ||
          (cookies().get("NEXT_LOCALE")?.value as Locale) ||
          "en-US"
        const url = `https://api.themoviedb.org/3/tv/top_rated?language=${language}&page=${page}`
        const data = await fetch(url, options).then((response) =>
          response.json()
        )
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
    }),
  useChangeLocaleMutation: publicProcedure
    .input(TrpcLocaleInput)
    .mutation(async (opts) => {
      const language = opts.input.language
      if (!language) {
        return
      }
      cookies().set("NEXT_LOCALE", language)
      return { message: "success", status: 200 }
    }),
  useSendMailMutation: publicProcedure
    .input(TrpcSendMailInput)
    .mutation(async (opts) => {
      const limiter = new RateLimiter({
        maxRequests: 1,
        /* 1 hour */
        interval: 60 * 60 * 1000,
      })
      if (!opts.ctx.user) {
        return new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to do this",
          cause: "You are not authorized to do this",
        })
      }
      try {
        await sendMailLimiter.limit()
        const transporter = nodemailer.createTransport({
          port: 465,
          service: "gmail",
          host: "smtp.gmail.com",
          auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_PASSWORD,
          },
          secure: true,
        })
        const email = opts.input.email
        const name = opts.input.name
        const message = opts.input.message
        const mailData = {
          from: email,
          to: process.env.MAILER_EMAIL,
          subject: `Message From ${email}, ${name}`,
          text: message,
          html: `<div>${message}</div>`,
        }
        await transporter.sendMail(mailData, function (err, info) {
          if (err) {
            console.error(err)
            return new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Something went wrong",
              cause: err,
            })
          }
        })
        return { message: "Message sent successfully" }
      } catch (error) {
        if (error instanceof RateLimiterError) {
          return new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "Too many requests. Please try again later.",
            cause: error,
          })
        }
        console.error(error)
        return new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
          cause: error,
        })
      }
    }),
})

export type AppRouter = typeof appRouter
