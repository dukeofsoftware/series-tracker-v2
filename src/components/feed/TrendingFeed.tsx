"use client"

import { FC, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { dictionary } from "@/content"
import { usePaginateTrending } from "@/hooks/usePaginateTrending"
import { TrendingPage, TrendingResult } from "@/types/trending"

import PaginationButtons from "../PaginationButtons"
import TrendFeedCard, { TrendFeedCardSkeleton } from "./TrendFeedCard"

interface TrendingFeedProps {
  cachedData: TrendingPage
  lang: string
}

const TrendingFeed: FC<TrendingFeedProps> = ({ cachedData, lang }) => {
  const params = useSearchParams()
  const page = useMemo(() => params.get("page")!, [params]) || "1"
  const { data, isLoading, refetch, isFetching } = usePaginateTrending(
    cachedData,
    page
  )
  useEffect(() => {
    refetch()
  }, [page, refetch])
  return (
    <>
      <h1 className="my-2 text-center text-2xl font-bold">
        {dictionary[lang]?.trendingTitle}
      </h1>
      {isLoading || isFetching ? (
        <TrendFeedCardSkeleton />
      ) : (
        <div>
          <div className="min-h-screen ">
            <ul className="mt-6 flex flex-wrap justify-center gap-5 px-20">
              {data ? (
                data?.results?.map((result: TrendingResult, index: number) => (
                  <TrendFeedCard result={result} key={index} />
                ))
              ) : (
                <div>data Not found</div>
              )}
            </ul>
          </div>
        </div>
      )}
      <PaginationButtons data={data || cachedData} />
    </>
  )
}

export default TrendingFeed
