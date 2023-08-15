
import Sidebar from '@/components/Sidebar'
import SearchFeed from '@/components/tmdb/search/SearchFeed'
import { FC } from 'react'

interface pageProps {

}

const Page: FC<pageProps> = async ({ }) => {
    return <div className=' flex ml-5 '>
        <Sidebar />
        <div className='ml-72 min-h-screen'>
            <SearchFeed  />

        </div>
    </div>
}

export default Page