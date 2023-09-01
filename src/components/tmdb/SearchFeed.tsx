"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { trpcReact } from "@/trpc/trpc-react"

import TrendFeedCard, {
  TrendFeedCardSkeleton,
} from "@/components/feed/card/TrendFeedCard"
import PaginationParamsButtons from "@/components/feed/PaginationParamsButtons"

const SearchFeed = ({}) => {
  const params = useSearchParams()
  const query = params.get("query")
  const type = params.get("type") as "movie" | "tv" | "multi"
  const year = params.get("year")
  const adult = params.get("adult")
  const page = params.get("page") || "1"
  const { isFetching, data, refetch } =
    trpcReact.usePaginateTmdbSearch.useQuery(
      {
        page: page,
        query: query as string,
        type: type || "multi",
        date: year || "",
        adult: adult === "true" ? "true" : "false",
      },
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled: false,
      }
    )
  useEffect(() => {
    if (!query) return
    if (query.length < 3) return
    refetch()
  }, [query])

  return (
    <div className="w-full">
      <div className="mx-4 flex min-h-screen  w-full flex-wrap justify-center gap-4">
        {isFetching ? (
          <TrendFeedCardSkeleton />
        ) : (
          data?.results &&
          data?.results.map((item: any, index: number) => (
            <TrendFeedCard key={index} result={item} />
          ))
        )}
      </div>
      {data?.total_pages && (
        <PaginationParamsButtons
          total_pages={data.total_pages}
          pageDB={data.page}
        />
      )}
    </div>
  )
}
export default SearchFeed
