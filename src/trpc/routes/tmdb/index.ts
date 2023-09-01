import { useGetTmdbMovie } from "./movies/useGetTmdbMovie"
import { usePaginateTmdbPopularMovies } from "./movies/usePaginateTmdbPopularMovies"
import { usePaginateTmdbTopRatedMovies } from "./movies/usePaginateTmdbTopRatedMovies"
import { usePaginateTmdbUpcomingMovies } from "./movies/usePaginateTmdbUpcomingMovies"
import { useGetTmdbTv } from "./tvs/useGetTmdbTv"
import { usePaginateTmdbAirTodayTv } from "./tvs/usePaginateTmdbAirTodayTv"
import { usePaginateTmdbOnTheAirTv } from "./tvs/usePaginateTmdbOnTheAirTv"
import { usePaginateTmdbPopularTv } from "./tvs/usePaginateTmdbPopularTv"
import { usePaginateTmdbTopRatedTv } from "./tvs/usePaginateTmdbTopRatedTv"
import { usePaginateTmdbSearch } from "./usePaginateTmdbSearch"
import { usePaginateTmdbTrending } from "./usePaginateTmdbTrending"

export {
  usePaginateTmdbTrending,
  usePaginateTmdbSearch,
  useGetTmdbTv,
  usePaginateTmdbAirTodayTv,
  usePaginateTmdbOnTheAirTv,
  usePaginateTmdbPopularTv,
  usePaginateTmdbTopRatedTv,
  useGetTmdbMovie,
  usePaginateTmdbPopularMovies,
  usePaginateTmdbTopRatedMovies,
  usePaginateTmdbUpcomingMovies,
}
