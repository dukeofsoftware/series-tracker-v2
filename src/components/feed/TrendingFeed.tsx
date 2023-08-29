"use client"

import { FC, useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"

import TrendFeedCard, { TrendFeedCardSkeleton } from "./card/TrendFeedCard"
import { serverClient } from "@/lib/trpc/serverClient"
import { trpc } from "@/lib/trpc/client"
import PaginationStateButtons from "./PaginationStateButtons"
import { TmdbCardType } from "@/lib/trpc/types"

interface TrendingFeedProps {
  cachedData: Awaited<ReturnType<(typeof serverClient)["usePaginateTmdbTrending"]>>
}

const TrendingFeed: FC<TrendingFeedProps> = ({ cachedData }) => {
  const [page, setPage] = useState<number>(1)
  const pageTranslation = useTranslations("pages.main")
  const t = useTranslations("global.messages")
  const ref = useRef<HTMLHeadingElement>(null)
  const { data, isLoading, refetch, isFetching } = trpc.usePaginateTmdbTrending.useQuery({
    page: page.toString(),

  }, {
    initialData: {
      pages: [
        cachedData.results, 
      ],
      pageParams: [1],
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

  })
  useEffect(() => {
    refetch()
    if (page > 1) ref.current?.scrollIntoView({ behavior: "smooth" })
  }, [page, refetch])

  return (
    <>
      <h1 ref={ref} className="my-2 text-center text-2xl font-bold">
        {pageTranslation("trendingTitle")}
      </h1>
      {isLoading || isFetching ? (
        <TrendFeedCardSkeleton />
      ) : (
        <div>
          <div className="min-h-screen ">
            <ul className="mt-6 flex flex-wrap justify-center gap-5  px-4 sm:px-12 md:px-16 lg:px-20">
              {data ? (
                data?.results?.map((result: TmdbCardType, index: number) => {
                  if (index < 4) {
                    return (
                      <li key={index}>
                        {" "}
                        <TrendFeedCard result={result} />
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
      <PaginationStateButtons pageState={page} setPageState={setPage} total_pages={data.total_pages} pageDB={data.page} />
    </>
  )
}

export default TrendingFeed
