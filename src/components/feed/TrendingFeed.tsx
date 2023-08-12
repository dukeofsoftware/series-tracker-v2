'use client'

import { usePaginateTrending } from '@/hooks/usePaginateTrending'
import { TrendingPage, TrendingResult } from '@/types/trending'
import { useSearchParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import PaginationButtons from '../PaginationButtons'
import TrendFeedCard, { TrendFeedCardSkeleton } from './TrendFeedCard'
import { dictionary } from '@/content';

interface TrendingFeedProps {
    cachedData: TrendingPage
    lang: string
}

const TrendingFeed: FC<TrendingFeedProps> = ({ cachedData, lang }) => {

    const params = useSearchParams()
    const page = useMemo(() => params.get('page')!, [params]) || "1"
    const { data, isLoading, refetch, isFetching } = usePaginateTrending(cachedData, page)
    useEffect(() => {
        refetch()
    }, [page, refetch])
    return <>
        <h1 className='text-center text-2xl font-bold my-2'>{dictionary[lang]?.trendingTitle}</h1>
        {
            isLoading || isFetching ? (<TrendFeedCardSkeleton />
            ) : (<div>
                <div className="min-h-screen ">
                    <ul className='flex flex-wrap justify-center gap-5 mt-6 px-20'>
                        {data ?
                            data?.results?.map((result: TrendingResult, index: number) => (
                                <TrendFeedCard result={result} key={index} />
                            )) : <div>
                                data Not found
                            </div>
                        }
                    </ul>
                </div>

            </div>)
        }
        <PaginationButtons data={data || cachedData} />
    </>
}

export default TrendingFeed