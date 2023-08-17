import { FC } from 'react'
import Image from 'next/image'
import { MovieResponse } from '@/types/movies'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { formatMinutes } from '@/lib/utils'

import MovieCard from '@/components/feed/card/MovieCard'
import AddToFavoriteMovie from '@/components/AddToFavoriteMovie'
import StatusSelector from '@/components/StatusSelector'
import { getDictionary } from '@/lib/dictionary'
interface pageProps {
  params: {
    movieId: string
    lang: "en-US" | "tr-TR" | "de-DE"
  }
}
export const revalidate = 60 * 60
const Page: FC<pageProps> = async ({ params }) => {
  const data: MovieResponse = await fetch(
    `${process.env.SITE_URL}/api/tmdb/movies/${params.movieId}?language=${params.lang}`
  ).then((res) => res.json())
  const page = await getDictionary(params.lang)
  return <div className='container w-full px-0 relative '>
    <div className='max-h-[520px] relative -z-10'>

      <AspectRatio ratio={33 / 20} className='pb-0 max-h-[520px] '>
        <Image
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          alt={data.title}
          fill
          className='object-cover '
        />
      
      </AspectRatio>
    </div>

    <div className='flex mt-4 ml-2 sm:ml-4'>
      <div className='shrink-0	 flex relative sm:w-[200px] sm:min-h-[200px]  w-[150px] h-[225px] sm:h-[300px] rounded-md border-4 border-slate-800 items-center '>
        <Image
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          alt={data.title}
          className='object-cover   rounded-md  '
          fill
        />
        <div className='max-h-[520px] h-full w-full  top-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent from-60%  to-black absolute  '></div>

      </div>
      <div className=' mx-5  sm:container'>

        <div className='flex flex-wrap gap-3 justify-between items-center mb-2'>
          <div className='flex gap-2 items-center'>
            <h1 className='font-bold text-3xl  '>
              {data.title || data.original_title}
            </h1>
            <AddToFavoriteMovie result={data} />
            <StatusSelector
              movieResult={data}
              type="movie"
            />
          </div>
          <div className='flex gap-2 flex-wrap'>
            <Badge className="  bg-sky-500 hover:bg-sky-600 active:bg-sky-600 text-sm font-medium text-white ">
              {data.release_date}
            </Badge>

            <Badge className='bg-green-600 
            active:bg-green-700 hover:bg-green-700 text-white'>
              {data.status}
            </Badge>
            {data.adult && <Badge className='bg-red-600
            active:bg-red-700 hover:bg-red-700 text-white'>
              {page.global.adult}
            </Badge>

            }
            <Badge>
              {formatMinutes(data.runtime, params.lang)}
            </Badge>

          </div>

        </div>
        <p className='mb-2'>
          {data.overview}
        </p>
        <div className='flex'>
          <p className='font-semibold  text-xl'>
            {
              page.pages.tmdb.tags
            }
          </p>
          <div className='flex flex-wrap items-center gap-1.5 mx-2'>
            {
              data.genres.map((genre) => (
                <Badge key={genre.id}>
                  {genre.name}
                </Badge>
              ))
            }
          </div>
        </div>
      </div>
    </div>
    {data.similar.length > 0 && <>
      <h2 className='font-bold text-2xl my-2 text-center mt-16'>
        {page.pages.tmdb.movies.movie.similarMovies}
      </h2>

      <ul className=" flex flex-wrap justify-center gap-5 px-20 mb-20">
        {

          data?.similar?.map((movie, index) => (
            <li key={index}>
              <MovieCard result={movie} />
            </li>

          ))
        }

      </ul>
    </>

    }
  </div >


}

export default Page

