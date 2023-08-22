import { FC } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { MovieCardType } from "@/types/movies"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const CardContent = dynamic(() => import("./CardContent"), { ssr: false })
const AdultContent = dynamic(() => import("./AdultContent"), { ssr: false })
const AirDate = dynamic(() => import("./AirDate"), { ssr: false })
interface TrendFeedCardProps {
  result: MovieCardType
  date?: string
  priorImage?: boolean
}

const TrendFeedCard: FC<TrendFeedCardProps> = ({
  result,
  priorImage,
  date,
}) => {
  return (
    <Link href={`/tmdb/movies/${result.id}`}>
      <Card className="group relative  h-[240px] w-[160px] rounded-md sm:h-[420px] sm:w-[280px]">
        <Image
          src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
          alt={result.title || result.original_title}
          fill
          priority={priorImage}
          className="absolute rounded-md "
        />
        <AirDate release_date={result.release_date || date} />
        <CardContent
          title={result.title}
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
          <Skeleton className="relative h-[420px] w-[280px] rounded-md bg-black" />
        </li>
      ))}
    </ul>
  )
}
