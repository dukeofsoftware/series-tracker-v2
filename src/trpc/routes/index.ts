import { inferReactQueryProcedureOptions } from "@trpc/react-query"
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"

import { RateLimiter } from "@/lib/rate-limit"
import { router } from "../methods"
import {
  useGetTmdbMovie,
  useGetTmdbTv,
  usePaginateTmdbAirTodayTv,
  usePaginateTmdbOnTheAirTv,
  usePaginateTmdbPopularMovies,
  usePaginateTmdbPopularTv,
  usePaginateTmdbSearch,
  usePaginateTmdbTopRatedMovies,
  usePaginateTmdbTopRatedTv,
  usePaginateTmdbTrending,
  usePaginateTmdbUpcomingMovies,
} from "./tmdb"
import { useChangeLocaleMutation } from "./useChangeLocaleMutation"

export const limiter = new RateLimiter({
  maxRequests: 12,
  interval: 3 * 1000 /* 3 seconds */,
})

export const appRouter = router({
  useChangeLocaleMutation,
  /* TMDB */
  usePaginateTmdbTrending,
  usePaginateTmdbSearch,

  /* tvs */

  useGetTmdbTv,
  usePaginateTmdbAirTodayTv,
  usePaginateTmdbOnTheAirTv,
  usePaginateTmdbPopularTv,
  usePaginateTmdbTopRatedTv,
  /* Movies */
  useGetTmdbMovie,
  usePaginateTmdbPopularMovies,
  usePaginateTmdbTopRatedMovies,
  usePaginateTmdbUpcomingMovies,
})

export type AppRouter = typeof appRouter
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>
export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>
