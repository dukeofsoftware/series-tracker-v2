import TrendingFeed from "@/components/feed/TrendingFeed";
import { formatLanguage } from "@/lib/utils";

export default async function Page({ params }: { params: { lang: string } }) {

  const cachedData = await fetch(`${process.env.SITE_URL}/api/tmdb/trending`).then(res => res.json())

  return (
    <main >
      <TrendingFeed lang={formatLanguage(params.lang)} cachedData={cachedData} />

    </main>
  )
}
