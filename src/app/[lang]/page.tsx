import { redirect } from "next/navigation"

import TrendingFeed from "@/components/feed/TrendingFeed"
import { Locale } from "@/config/i18n.config"
import { trpcCaller } from "@/trpc/trpc-caller"

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
