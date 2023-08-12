import { TrendingPage } from "@/types/trending"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const usePaginateTrending = (cachedData: TrendingPage, page: string) => {
  return useQuery(
    ["trending-pagination"],
    async ({}) => {
      const query = `/api/tmdb/trending?page=${page}`
      const { data } = await axios.get(query)
      return data
    },
    {
      initialData: {
        pages: [cachedData],
        pageParams: [1],
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )
}
