import { FC } from "react"
import { MovieCardType } from "@/types/movies"

import { Locale } from "@/config/i18n.config"
import { getDictionary } from "@/lib/dictionary"
import TrendFeedCard from "@/components/feed/card/TrendFeedCard"
import { env } from "@/env.mjs"
interface pageProps {
  params: {
    userId: string
    lang: Locale
  }
}


const Page: FC<pageProps> = async ({ params }) => {
  const favorites = await fetch(
    `${env.NEXT_PUBLIC_SITE_URL}/api/firebase/${params.userId}/favorites`
  ).then((res) => res.json())
  const t = await getDictionary(params.lang)

  return (
    <div className="mt-3 min-h-screen">
      <h1 className="my-4 text-center text-3xl font-bold">
        {t.favorites.title}
      </h1>
      <ul className="flex flex-wrap justify-center gap-4">
        {favorites?.map((item: MovieCardType & { date: string }
        ) => (

          <li key={item.id}>
            <TrendFeedCard
              result={{
                ...item,
                media_type: item.media_type,
                date: item.date,

              }}
            />
          </li>
        )
        )}
      </ul>
    </div>
  )
}

export default Page
