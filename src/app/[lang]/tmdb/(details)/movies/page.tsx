import { FC } from "react"
import { trpcCaller } from "@/trpc/trpc-caller"

import { Locale } from "@/config/i18n.config"

interface pageProps {
  params: {
    lang: Locale
  }
}
export const revalidate = 0
const Page: FC<pageProps> = async ({ params }) => {
  const data = await trpcCaller.useGetTmdbTv({
    lang: params.lang,
    id: "156888",
  })
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export default Page
