import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { TrendingPage } from "@/types/trending"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const usePaginateSearch = () => {
  const params = useSearchParams()
  const query = params.get("query")
  const type = params.get("type")
  const year = params.get("year")
  const adult = params.get("adult")
  const page = params.get("page") || "1"

  const response = useQuery(
    ["search-pagination"],
    async ({}) => {
      if (!query) return
      if (query.length < 3) return
      

      const responseQuery = `/api/tmdb/search?query=${query}&page=${page}
                ${type ? `type=${type}&` : ""}
                ${adult ? `adult=${adult}&` : ""}
                ${year ? `year=${year}&` : ""}
            `
      const { data } = await axios.get(responseQuery)
      return data
    },
    {
      initialData: {
        pageParams: [1],
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )
  useEffect(() => {
    response.refetch()
  }, [query, type, year, adult, page])
  return {
    ...response,
  }
}
