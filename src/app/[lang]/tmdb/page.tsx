import { FC } from "react"

import Sidebar from "@/components/Sidebar"
import SearchFeed from "@/components/tmdb/search/SearchFeed"

interface pageProps {}

const Page: FC<pageProps> = async ({}) => {
  return (
    <div className=" flex  w-full pl-16 ">
      <Sidebar />
      <div className="ml-72 min-h-screen px-4">
        <SearchFeed />
      </div>
    </div>
  )
}

export default Page
