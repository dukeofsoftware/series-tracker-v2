import { redirect } from "next/navigation"
import { TrendingPage } from "@/types/trending"

import TrendingFeed from "@/components/feed/TrendingFeed"
import { serverClient } from "@/lib/trpc/serverClient"
import { Locale } from "@/config/i18n.config"

export default async function Page({ params }: { params: { lang: Locale } }) {
  if (!params.lang) return redirect(`/en-US`)

  const cachedData = await serverClient.usePaginateTmdbTrending({
    lang: params.lang,
    page: "1",
  })
  return (
    <main>
      <TrendingFeed cachedData={cachedData} />
    </main>
  )
}

export const revalidate = 0
