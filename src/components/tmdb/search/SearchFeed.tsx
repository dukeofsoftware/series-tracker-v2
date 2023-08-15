'use client'

import TrendFeedCard, { TrendFeedCardSkeleton } from '@/components/feed/card/TrendFeedCard'
import { usePaginateSearch } from '@/hooks/usePaginateSearch'
import { FC } from 'react'

interface SearchFeedProps {

}

const SearchFeed: FC<SearchFeedProps> = ({ }) => {
    const { isFetching, isLoading, data } = usePaginateSearch()
    return <div className='flex flex-wrap  gap-4 mx-4'>
        {isLoading || isFetching ? <TrendFeedCardSkeleton /> : 
        
        data.results && data?.results.map((item: any, index: number) => <TrendFeedCard key={index} result={item} />)}
    </div>
}
export default SearchFeed