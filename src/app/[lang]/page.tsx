import { redirect } from "next/navigation"
import { TrendingPage } from "@/types/trending"

import TrendingFeed from "@/components/feed/TrendingFeed"

export default async function Page({ params }: { params: { lang: string } }) {
  if (!params.lang) return redirect(`/en-US`)

  const cachedData: TrendingPage = await fetch(
    `${process.env.SITE_URL}/api/tmdb/trending?language=${params.lang}`
  ).then((res) => res.json())
  return (
    <main>
      <TrendingFeed cachedData={cachedData} />
    </main>
  )
}

export const revalidate = 0
