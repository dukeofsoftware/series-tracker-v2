"use client"

import { FC, useEffect, useState } from "react"
import { MovieCardType } from "@/types/movies"
import { useTranslations } from "next-intl"

import { getCollection } from "@/lib/firebase/firestore"
import MovieCard from "@/components/feed/card/MovieCard"

interface pageProps {
  params: {
    userId: string
  }
}

const Page: FC<pageProps> = ({ params }) => {
  const [loading, setLoading] = useState(true)
  const t = useTranslations("favorites")
  const [movies, setMovies] = useState<
    | null
    | {
        id: number
        title: string
        poster_path: string
        release_date: string
        original_title: string
        overview: string
        isFavorite: boolean
      }[]
  >(null)
  useEffect(() => {
    const getMovies = async () => {
      const movies = await getCollection(`users/${params.userId}/movies`)
      setMovies(movies)
      setLoading(false)
    }
    getMovies()
  }, [])

  if (loading) return <div>loading</div>

  return (
    <div className="mt-3 min-h-screen">
      <h1 className="my-4 text-center text-3xl font-bold">{t("title")}</h1>
      <ul className="flex flex-wrap justify-center gap-4">
        {movies?.map((movie: MovieCardType) => (
          <li className="key={movie.id}">
            <MovieCard result={movie} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Page
