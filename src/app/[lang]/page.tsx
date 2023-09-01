import { redirect } from "next/navigation"
import { trpcCaller } from "@/trpc/trpc-caller"

import { Locale } from "@/config/i18n.config"
import TrendingFeed from "@/components/feed/TrendingFeed"

export default async function Page({ params }: { params: { lang: Locale } }) {
  if (!params.lang) return redirect(`/en-US`)

  const cachedData = await trpcCaller.usePaginateTmdbTrending({
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
