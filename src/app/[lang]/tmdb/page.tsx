import SearchFeed from "@/components/tmdb/SearchFeed"
import Sidebar from "@/components/tmdb/Sidebar"

const Page = async ({}) => {
  return (
    <div className=" flex w-full flex-col  lg:flex-row lg:pl-16 ">
      <Sidebar />
      <div className="mt-4 min-h-screen px-4 lg:ml-72">
        <SearchFeed />
      </div>
    </div>
  )
}

export default Page
