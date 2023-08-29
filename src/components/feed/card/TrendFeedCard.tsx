import { FC } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { TrendingResult } from "@/types/trending"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import  CardContent  from "./CardContent"
import AdultContent from "./AdultContent"
import AirDate from "./AirDate"
interface TrendFeedCardProps {
  result: TrendingResult
  priorImage?: boolean
}

const TrendFeedCard: FC<TrendFeedCardProps> = ({ result, priorImage }) => {
  return (
    <Link
      href={
        result.media_type === "movie"
          ? `/tmdb/movies/${result.id}`
          : `/tmdb/series/${result.id}`
      }
    >
      <Card className="group relative   h-[240px] w-[160px] rounded-md sm:h-[420px] sm:w-[280px]">
        <Image
          src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
          alt={result.title || result.name || result.original_title}
          fill
          priority={priorImage}
          className="absolute rounded-md "
        />
        {result.adult && <AdultContent />}
        <AirDate
          release_date={result.release_date}
          first_air_date={result.first_air_date}
        />
        <CardContent
          title={result.title}
          name={result.name}
          original_title={result.original_title}
          overview={result.overview}
        />
      </Card>
    </Link>
  )
}

export default TrendFeedCard

export const TrendFeedCardSkeleton = () => {
  const arr = Array.from({ length: 20 }, (_, i) => i)
  return (
    <ul className="mt-6 flex flex-wrap justify-center gap-5 px-20">
      {arr.map((_, i) => (
        <li key={i}>
          <Skeleton className="relative h-[240px] w-[160px] rounded-md bg-black sm:h-[420px] sm:w-[280px]" />
        </li>
      ))}
    </ul>
  )
}
