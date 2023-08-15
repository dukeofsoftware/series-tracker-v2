interface Genre {
  id: number
  name: string
}

interface Network {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

interface Season {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string | null
  season_number: number
  vote_average: number
}

interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

interface SimilarShow {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string | null
  first_air_date: string
  name: string
  vote_average: number
  vote_count: number
}

export interface TVShow {
  adult: boolean
  backdrop_path: string | null
  created_by: any[] // Update this type if you have more information
  episode_run_time: number[]
  first_air_date: string
  genres: Genre[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: Episode
  name: string
  next_episode_to_air: Episode
  networks: Network[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  seasons: Season[]
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
  images: {
    backdrops: string[]
    logos: string[]
    posters: string[]
  }
  similar: {
    page: number
    results: SimilarShow[]
    total_pages: number
    total_results: number
  }
}

interface Episode {
  id: number
  name: string
  overview: string
  vote_average: number
  vote_count: number
  air_date: string
  episode_number: number
  episode_type: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string | null
}

interface ProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

interface ProductionCountry {
  iso_3166_1: string
  name: string
}

interface Genre {
  id: number
  name: string
}

interface Backdrop {
  aspect_ratio: number
  height: number
  iso_639_1: string | null
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

interface Logo {
  aspect_ratio: number
  height: number
  iso_639_1: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

interface Poster {
  aspect_ratio: number
  height: number
  iso_639_1: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

interface LastEpisodeToAir {
  id: number
  name: string
  overview: string
  vote_average: number
  vote_count: number
  air_date: string
  episode_number: number
  episode_type: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
}

interface Season {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
  vote_average: number
}

interface Images {
  backdrops: Backdrop[]
  id: number
  logos: Logo[]
  posters: Poster[]
}

export interface FrontendSeriesResponse {
  first_air_date: string
  adult: boolean
  backdrop_path: string
  genres: Genre[]
  id: number
  overview: string
  poster_path: string
  runtime: number[]
  status: string
  tagline: string
  title: string
  similar: any[] // Bu kısmın türünü tam olarak bilemiyorum, bu yüzden any olarak bıraktım
  images: Images
  in_production: boolean
  last_air_date: string
  last_episode_to_air: LastEpisodeToAir
  number_of_episodes: number
  number_of_seasons: number
  seasons: Season[]
}
