import { FC } from "react"

import Register from "@/components/auth/Register"

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  return (
    <main className="">
      <Register />
    </main>
  )
}

export default Page
