
import { FC, } from "react"
import { MovieCardType } from "@/types/movies"

import MovieCard from "@/components/feed/card/MovieCard"
import { getDictionary } from "@/lib/dictionary"
import { Locale } from "@/config/i18n.config"

interface pageProps {
  params: {
    userId: string
    lang: Locale
  }
}

const Page: FC<pageProps> = async ({ params }) => {
  const favorites = await fetch(`${process.env.SITE_URL}/api/firebase/${params.userId}/favorites`).then((res) => res.json())
  const t = await getDictionary(params.lang)
  return (
    <div className="mt-3 min-h-screen">
      <h1 className="my-4 text-center text-3xl font-bold">{t.favorites.title}</h1>
      <ul className="flex flex-wrap justify-center gap-4">
        {favorites?.map((movie: MovieCardType & {
          date: string
        }) => (
          <li key={movie.id}>
            <MovieCard result={movie} date={movie.date} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Page
