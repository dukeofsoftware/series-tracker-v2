import { FC } from 'react'

interface pageProps {
  params: {
    seriesId: string
  }
}

const page: FC<pageProps> = (
  { params }
) => {
  return <>
    page
  </>
}

export default page