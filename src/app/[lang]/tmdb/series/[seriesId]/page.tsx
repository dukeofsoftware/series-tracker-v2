import { AspectRatio } from '@/components/ui/aspect-ratio'
import { FC } from 'react'
import Image from 'next/image'
import { FrontendSeriesResponse } from '@/types/series'
import { Badge } from '@/components/ui/badge'
import { formatMinutes } from '@/lib/utils'
import { getDictionary } from '@/lib/dictionary'
import AddToFavoriteSeries from '@/components/AddToFavoriteSeries'
import StatusSelector from '@/components/StatusSelector'
import TrendFeedCard from '@/components/feed/card/TrendFeedCard'
interface PageProps {
  params: {
    seriesId: string
    lang: "en-US" | "tr-TR" | "de-DE"
  }
}
export const revalidate = 60 * 60
const Page: FC<PageProps> = async (
  { params }
) => {
  const page = await getDictionary(params.lang)

  const data: FrontendSeriesResponse = await fetch(
    `${process.env.SITE_URL}/api/tmdb/series/${params.seriesId}?language=${params.lang}`
  ).then(async (res) => {

    return res.json()
  })
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

    <div className='flex flex-col sm:flex-row mt-4 ml-2 sm:ml-4'>
      <div className='shrink-0 mx-auto sm:mx-0 mb-4	 flex relative sm:w-[200px] sm:min-h-[200px]  w-[340px] h-[510px] sm:h-[300px] rounded-md border-4 border-slate-800 items-center '>
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
          <div className='flex gap-2 items-center flex-wrap'>
            <h1 className='font-bold text-3xl  '>
              {data.title}
            </h1>
            <div className=' flex gap-2 items-center'>
              <AddToFavoriteSeries result={data} />
              <StatusSelector
                seriesResult={data}
                type="series"
              />
            </div>
          </div>
          <div className='flex gap-2 flex-wrap'>

            <Badge className='bg-green-600 
          active:bg-green-700 hover:bg-green-700 text-white'>
              {data.status}
            </Badge>
            <Badge className='bg-sky-600 
          active:bg-sky-700 hover:bg-sky-700 text-white'>
              {data.number_of_seasons}{" "}
              {page.pages.tmdb.series.tv.season.season}
            </Badge>
            {data.adult && <Badge className='bg-red-600
          active:bg-red-700 hover:bg-red-700 text-white'>
              {page.global.adult}
            </Badge>

            }
            <Badge>
              {formatMinutes(data.runtime.reduce((a, b) => a + b, 0),params.lang)}

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
            }          </p>
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
        {page.pages.tmdb.series.tv.similarSeries}
      </h2>

      <ul className=" flex flex-wrap justify-center gap-5 px-20 mb-20">
        {

          data?.similar?.map((series, index) => (
            <li key={index}>
              <TrendFeedCard result={series} />
            </li>

          ))
        }

      </ul>
    </>

    }


  </div >

}

export default Page
