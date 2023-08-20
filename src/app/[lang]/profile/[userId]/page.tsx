"use client"

import { FC, useEffect, useState } from "react"
import { useTranslations } from "next-intl"

import { getCollection } from "@/lib/firebase/firestore"
import { columns as movieColumns } from "@/components/table/movie-columns"
import { MovieTable } from "@/components/table/movie-table"
import { columns as seriesColumns } from "@/components/table/series-columns"
import { SeriesTable } from "@/components/table/series-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PageProps {
  params: {
    userId: string
  }
}

const Page: FC<PageProps> = ({ params }) => {
  const [loading, setLoading] = useState(true)
  const t = useTranslations("pages.profile")
  const [movies, setMovies] = useState<any[]>([])
  const [series, setSeries] = useState<any[]>([])
  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getCollection(`users/${params.userId}/movies`)
      setMovies(movies)
    }
    const fetchSeries = async () => {
      const series = await getCollection(`users/${params.userId}/series`)
      setSeries(series)
      setLoading(false)
    }

    fetchMovies()
    fetchSeries()
  }, [])
  if (loading) return <div>loading</div>
  return (
    <div>
      <Tabs defaultValue="series" className="w-full">
        <TabsList className="my-2 flex w-full">
          <TabsTrigger className="grow" value="series">
            {t("tabs.series")}
          </TabsTrigger>
          <TabsTrigger className="grow" value="movies">
            {t("tabs.movies")}
          </TabsTrigger>
        </TabsList>
        <TabsContent className="min-h-[50vh]" value="movies">
          <MovieTable columns={movieColumns} data={movies} />
        </TabsContent>
        <TabsContent className="min-h-[50vh]" value="series">
          <SeriesTable columns={seriesColumns} data={series} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Page
