"use client"

import { FC } from "react"
import { usePaginateSearch } from "@/hooks/usePaginateSearch"

import TrendFeedCard, {
  TrendFeedCardSkeleton,
} from "@/components/feed/card/TrendFeedCard"
import PaginationButtons from "@/components/PaginationButtons"

interface SearchFeedProps {}

const SearchFeed: FC<SearchFeedProps> = ({}) => {
  const { isFetching, isLoading, data } = usePaginateSearch()
  return (
    <div className="w-full">
      <div className="mx-4 flex min-h-screen  w-full flex-wrap justify-center gap-4">
        {isLoading || isFetching ? (
          <TrendFeedCardSkeleton />
        ) : (
          data.results &&
          data?.results.map((item: any, index: number) => (
            <TrendFeedCard key={index} result={item} />
          ))
        )}
      </div>
      <PaginationButtons total_pages={data.total_pages} pageDB={data.page} />
    </div>
  )
}
export default SearchFeed
