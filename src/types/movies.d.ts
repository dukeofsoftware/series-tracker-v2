import { MovieCardType } from "@/types/movies"

interface Genre {
  id: number
  name: string
}

interface ProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

interface SimilarItem {
  // Benzer yapımların bilgilerini içeren nesne
  // Burada her bir benzer yapımın ayrı özellikleri bulunabilir, ancak veri örneğinde bu ayrıntılara sahip değiliz.
  // Dolayısıyla bu nesneyi genel bir yapı olarak temsil ediyorum.
  [key: string]: any
}

interface Images {
  backdrops: string[]
  logos: string[]
  posters: string[]
}

export interface MovieData {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: any // null
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: { iso_3166_1: string; name: string }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  similar: {
    page: number
    results: SimilarItem[]
    total_pages: number
    total_results: number
  }
  images: Images
}
export interface MovieResponse {
  adult: boolean
  backdrop_path: string
  genres: Genre[]
  id: number
  original_title: string
  overview: string
  poster_path: string
  runtime: number
  release_date: string
  status: string
  tagline: string
  title: string
  similar: SimilarMovieType[]
  images: Images
}

export interface MovieCardType {
  id: number
  title: string
  poster_path: string
  release_date: string
  original_title: string
  overview: string
}
