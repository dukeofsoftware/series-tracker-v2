'use client'

import PaginationButtons from '@/components/PaginationButtons'
import TrendFeedCard, { TrendFeedCardSkeleton } from '@/components/feed/card/TrendFeedCard'
import { usePaginateSearch } from '@/hooks/usePaginateSearch'
import { FC } from 'react'

interface SearchFeedProps {

}

const SearchFeed: FC<SearchFeedProps> = ({ }) => {
    const { isFetching, isLoading, data } = usePaginateSearch()
    return <div className='w-full'>
        <div className='flex flex-wrap  gap-4 mx-4 min-h-screen w-full'>
            {isLoading || isFetching ? <TrendFeedCardSkeleton /> :

                data.results && data?.results.map((item: any, index: number) => <TrendFeedCard key={index} result={item} />)}


        </div>
        <PaginationButtons total_pages={data.total_pages} pageDB={data.page} />
    </div>
}
export default SearchFeed