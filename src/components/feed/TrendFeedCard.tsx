import { FC } from "react"
import Image from "next/image"
import { TrendingResult } from "@/types/trending"

import { AspectRatio } from "../ui/aspect-ratio"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import { Separator } from "../ui/separator"
import { Skeleton } from "../ui/skeleton"

interface TrendFeedCardProps {
  result: TrendingResult
}

const TrendFeedCard: FC<TrendFeedCardProps> = ({ result }) => {
  return (
    <Card className="group relative h-[420px] w-[280px] rounded-md">
      <Image
        src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
        alt={result.title || result.name || result.original_title}
        fill
        className="absolute rounded-md "
      />
      {result.adult && (
        <Image
          alt="adult-content"
          width={30}
          height={30}
          className="absolute right-2 top-2 z-30 rounded-full bg-black/70"
          src={`/icons/adult-content.png`}
        />
      )}
      <div className="absolute left-3 top-3">
        <Badge className=" w-full bg-sky-500/20 text-sm font-medium text-white group-hover:bg-sky-500/80">
          {result.release_date || result.first_air_date}
        </Badge>
      </div>
      <CardContent className=" z-30    flex     h-full justify-center  p-4 ">
        <div className="z-30  flex w-full  items-end  gap-1 opacity-0 delay-100 duration-300 group-hover:-translate-y-[20px] group-hover:opacity-100">
          <div className="flex flex-col">
            <h2 className="z-30 mb-1 w-full text-lg font-semibold text-white">
              {result.title || result.name || result.original_title}
            </h2>
            <Separator className="mb-2" />
            <p className="line-clamp-6 h-[100px] overflow-hidden text-ellipsis text-sm text-white	">
              {result.overview || "No overview provided"}
            </p>
            <p className="mt-[2px]  text-center text-white">.....</p>
          </div>
        </div>

        <div className="absolute bottom-0 h-full w-full bg-opacity-20 bg-gradient-to-t from-black  from-30% opacity-0 duration-200 group-hover:opacity-100" />
      </CardContent>
    </Card>
  )
}

export default TrendFeedCard

export const TrendFeedCardSkeleton = () => {
  const arr = Array.from({ length: 20 }, (_, i) => i)
  return (
    <ul className="mt-6 flex flex-wrap justify-center gap-5 px-20">
      {arr.map((_, i) => (
        <Skeleton
          key={i}
          className="relative h-[420px] w-[280px] rounded-md bg-black"
        />
      ))}
    </ul>
  )
}
