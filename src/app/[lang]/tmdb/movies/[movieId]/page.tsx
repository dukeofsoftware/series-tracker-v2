import { FC } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { MovieResponse } from "@/types/movies"
import { getDictionary } from "@/lib/dictionary"
import { formatMinutes } from "@/lib/utils"
import AddToFavoriteMovie from "@/components/AddToFavoriteMovie"
import MovieCard from "@/components/feed/card/MovieCard"
import StatusSelector from "@/components/StatusSelector"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"


import type { Metadata } from 'next'
import { Locale } from "@/config/i18n.config"

export async function generateMetadata({
  params,
}: {
  params: {
    movieId: string
    lang: Locale
  }
}): Promise<Metadata> {
  const data: MovieResponse = await fetch(
    `${process.env.SITE_URL}/api/tmdb/movies/${params.movieId}?language=${params.lang}`
  ).then((res) => res.json())

  return {
    title: data.title || data.original_title,
    description: data.overview,
    keywords: data.genres.map((genre) => genre.name).join(", "),
    "og:title": data.title || data.original_title,
    "og:description": data.overview,
    "twitter:title": data.title || data.original_title,
    "twitter:description": data.overview,
    "og:image": `https://image.tmdb.org/t/p/original${data.poster_path}`,
    "twitter:image": `https://image.tmdb.org/t/p/original${data.poster_path}`,
    "og:image:alt": data.title || data.original_title,
    "twitter:image:alt": data.title || data.original_title,
    "og:type": "website",
    "twitter:card": "summary_large_image",
  } as Metadata
}

interface pageProps {
  params: {
    movieId: string
    lang: Locale
  }
}
export const revalidate = 60 * 60
const Page: FC<pageProps> = async ({ params }) => {
  const data: MovieResponse = await fetch(
    `${process.env.SITE_URL}/api/tmdb/movies/${params.movieId}?language=${params.lang}`
  ).then((res) => res.json())
  const page = await getDictionary(params.lang)

  if (!data || !params.movieId) return notFound()
  return (
    <div className="container relative w-full px-0 ">
      <div className="relative -z-10 max-h-[520px]">
        <AspectRatio ratio={33 / 20} className="max-h-[520px] pb-0 ">
          <Image
            src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
            alt={data.title}
            fill
            className="object-cover "
          />
        </AspectRatio>
      </div>

      <div className="ml-2 mt-4 flex flex-col items-center sm:ml-4 md:flex-row">
        <div className="relative	 flex h-[510px] w-[340px] shrink-0  items-center rounded-md border-4 border-slate-800 sm:h-[300px] sm:min-h-[200px] sm:w-[200px] ">
          <Image
            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            alt={data.title}
            className="rounded-md   object-cover  "
            fill
          />
          <div className="absolute top-0 h-full  max-h-[520px] w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent  from-60% to-black  "></div>
        </div>
        <div className=" mx-5  sm:container">
          <div className="mb-2 mt-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-bold  ">
                {data.title || data.original_title}
              </h1>
              <AddToFavoriteMovie result={data} />
              <StatusSelector movieResult={data} type="movie" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="  bg-sky-500 text-sm font-medium text-white hover:bg-sky-600 active:bg-sky-600 ">
                {data.release_date}
              </Badge>

              <Badge
                className="bg-green-600 
            text-white hover:bg-green-700 active:bg-green-700"
              >
                {data.status}
              </Badge>
              {data.adult && (
                <Badge
                  className="bg-red-600
            text-white hover:bg-red-700 active:bg-red-700"
                >
                  {page.global.adult}
                </Badge>
              )}
              <Badge>{formatMinutes(data.runtime, params.lang)}</Badge>
            </div>
          </div>
          <p className="mb-2">{data.overview}</p>
          <div className="flex">
            <p className="text-xl  font-semibold">{page.pages.tmdb.tags}</p>
            {data?.genres && (
              <div className="mx-2 flex flex-wrap items-center gap-1.5">
                {data.genres.map((genre) => (
                  <Badge key={genre.id}>{genre.name}</Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {data?.similar?.length > 0 && (
        <>
          <h2 className="my-2 mt-16 text-center text-2xl font-bold">
            {page.pages.tmdb.movies.movie.similarMovies}
          </h2>

          <ul className=" mb-20 flex flex-wrap justify-center gap-5 px-20">
            {data?.similar?.map((movie, index) => (
              <li key={index}>
                <MovieCard result={movie} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default Page
