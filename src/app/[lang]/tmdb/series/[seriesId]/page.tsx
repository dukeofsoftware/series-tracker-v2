import { AspectRatio } from '@/components/ui/aspect-ratio'
import { FC } from 'react'
import Image from 'next/image'
import { FrontendSeriesResponse } from '@/types/series'
import { Badge } from '@/components/ui/badge'
import { formatMinutes } from '@/lib/utils'
import { getDictionary } from '@/lib/dictionary'
import AddToFavoriteSeries from '@/components/AddToFavoriteSeries'
interface PageProps {
  params: {
    seriesId: string
    lang: "en-US" | "tr-TR" | "de-DE"
  }
}

const Page: FC<PageProps> = async (
  { params }
) => {
  const { pages } = await getDictionary(params.lang)

  const data: FrontendSeriesResponse = await fetch(
    `${process.env.SITE_URL}/api/tmdb/series/${params.seriesId}`
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
              {data.title}
            </h1>
            <AddToFavoriteSeries result={data} />
          </div>
          <div className='flex gap-2 flex-wrap'>

            <Badge className='bg-green-600 
          active:bg-green-700 hover:bg-green-700 text-white'>
              {data.status}
            </Badge>
            <Badge className='bg-sky-600 
          active:bg-sky-700 hover:bg-sky-700 text-white'>
              {data.number_of_seasons}{" "}
              sezon
            </Badge>
            {data.adult && <Badge className='bg-red-600
          active:bg-red-700 hover:bg-red-700 text-white'>
              Adult
            </Badge>

            }
            <Badge>
              {formatMinutes(data.runtime.reduce((a, b) => a + b, 0))}

            </Badge>

          </div>

        </div>
        <p className='mb-2'>
          {data.overview}
        </p>
        <div className='flex'>
          <p className='font-semibold  text-xl'>
            Tags:
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

  </div >

}

export default Page
