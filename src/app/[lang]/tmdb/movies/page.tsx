import { Locale } from '@/config/i18n.config'
import { serverClient } from '@/lib/trpc/serverClient'
import { FC } from 'react'

interface pageProps {
    params: {
        lang: Locale
    }
}
export const revalidate = 0
const Page: FC<pageProps> = async ({ params }) => {
    const data = await serverClient.useGetTmdbTv({
        lang: params.lang,
        id: "156888"
    })
    return <>
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
    </>
}

export default Page