"use client"

import { FC, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { usePaginateTrending } from "@/hooks/usePaginateTrending"
import { TrendingPage, TrendingResult } from "@/types/trending"
import { useTranslations } from "next-intl"

import PaginationButtons from "../PaginationButtons"
import TrendFeedCard, { TrendFeedCardSkeleton } from "./card/TrendFeedCard"

interface TrendingFeedProps {
  cachedData: TrendingPage
}

const TrendingFeed: FC<TrendingFeedProps> = ({ cachedData }) => {
  const params = useSearchParams()
  const page = useMemo(() => params.get("page")!, [params]) || "1"
  const pageTranslation = useTranslations("pages.main")
  const t = useTranslations("global.messages")

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
        {pageTranslation("trendingTitle")}
      </h1>
      {isLoading || isFetching ? (
        <TrendFeedCardSkeleton />
      ) : (
        <div>
          <div className="min-h-screen ">
            <ul className="mt-6 flex flex-wrap justify-center gap-5  px-4 sm:px-12 md:px-16 lg:px-20">
              {data ? (
                data?.results?.map((result: TrendingResult, index: number) => {
                  if (index < 4) {
                    return (
                      <li key={index}>
                        {" "}
                        <TrendFeedCard result={result} priorImage={true} />
                      </li>
                    )
                  }
                  return (
                    <li key={index}>
                      <TrendFeedCard result={result} />
                    </li>
                  )
                })
              ) : (
                <div>{t("notFound")}</div>
              )}
            </ul>
          </div>
        </div>
      )}
      <PaginationButtons total_pages={data.total_pages} pageDB={data.page} />
    </>
  )
}

export default TrendingFeed
