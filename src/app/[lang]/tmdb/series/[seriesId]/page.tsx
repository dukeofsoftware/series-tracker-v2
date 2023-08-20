import { FC } from "react"
import Image from "next/image"
import { FrontendSeriesResponse } from "@/types/series"

import { getDictionary } from "@/lib/dictionary"
import { formatMinutes } from "@/lib/utils"
import AddToFavoriteSeries from "@/components/AddToFavoriteSeries"
import TrendFeedCard from "@/components/feed/card/TrendFeedCard"
import StatusSelector from "@/components/StatusSelector"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"

interface PageProps {
  params: {
    seriesId: string
    lang: "en-US" | "tr-TR" | "de-DE"
  }
}
export const revalidate = 60 * 60
const Page: FC<PageProps> = async ({ params }) => {
  const page = await getDictionary(params.lang)

  const data: FrontendSeriesResponse = await fetch(
    `${process.env.SITE_URL}/api/tmdb/series/${params.seriesId}?language=${params.lang}`
  ).then(async (res) => {
    return res.json()
  })
  return (
    <div className="container relative w-full px-0 ">
      <div className="relative -z-10 max-h-[520px]">
        <AspectRatio ratio={33 / 20} className="max-h-[520px] pb-0 ">
          <Image
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            alt={data.title}
            fill
            className="object-cover "
          />
        </AspectRatio>
      </div>

      <div className="ml-2 mt-4 flex flex-col sm:ml-4 sm:flex-row">
        <div className="relative mx-auto mb-4 flex	 h-[510px] w-[340px] shrink-0 items-center  rounded-md border-4 border-slate-800 sm:mx-0 sm:h-[300px] sm:min-h-[200px] sm:w-[200px] ">
          <Image
            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            alt={data.title}
            className="rounded-md   object-cover  "
            fill
          />
          <div className="absolute top-0 h-full  max-h-[520px] w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent  from-60% to-black  "></div>
        </div>
        <div className=" mx-5  sm:container">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-bold  ">{data.title}</h1>
              <div className=" flex items-center gap-2">
                <AddToFavoriteSeries result={data} />
                <StatusSelector seriesResult={data} type="series" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                className="bg-green-600 
          text-white hover:bg-green-700 active:bg-green-700"
              >
                {data.status}
              </Badge>
              <Badge
                className="bg-sky-600 
          text-white hover:bg-sky-700 active:bg-sky-700"
              >
                {data.number_of_seasons}{" "}
                {page.pages.tmdb.series.tv.season.season}
              </Badge>
              {data.adult && (
                <Badge
                  className="bg-red-600
          text-white hover:bg-red-700 active:bg-red-700"
                >
                  {page.global.adult}
                </Badge>
              )}
              <Badge>
                {formatMinutes(
                  data.runtime.reduce((a, b) => a + b, 0),
                  params.lang
                )}
              </Badge>
            </div>
          </div>
          <p className="mb-2">{data.overview}</p>
          <div className="flex">
            <p className="text-xl  font-semibold">{page.pages.tmdb.tags} </p>
            <div className="mx-2 flex flex-wrap items-center gap-1.5">
              {data.genres.map((genre) => (
                <Badge key={genre.id}>{genre.name}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      {data.similar.length > 0 && (
        <>
          <h2 className="my-2 mt-16 text-center text-2xl font-bold">
            {page.pages.tmdb.series.tv.similarSeries}
          </h2>

          <ul className=" mb-20 flex flex-wrap justify-center gap-5 px-20">
            {data?.similar?.map((series, index) => (
              <li key={index}>
                <TrendFeedCard result={series} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default Page
