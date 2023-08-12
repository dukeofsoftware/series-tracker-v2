import { FC } from 'react'
import { Card, CardContent } from '../ui/card'
import Image from "next/image"
import { AspectRatio } from '../ui/aspect-ratio'
import { Badge } from '../ui/badge'
import { Separator } from '../ui/separator'
import { TrendingResult } from '@/types/trending'
import { Skeleton } from '../ui/skeleton'
interface TrendFeedCardProps {
    result: TrendingResult
}

const TrendFeedCard: FC<TrendFeedCardProps> = ({ result }) => {
    return <Card className='group w-[280px] h-[420px] rounded-md relative'>

        <Image
            src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
            alt={result.title || result.name || result.original_title}
            fill
            className='rounded-md absolute '
        />
        {
            result.adult && <Image
                alt='adult-content'
                width={30}
                height={30}
                className='top-2 right-2 absolute bg-black/70 rounded-full z-30'
                src={`/icons/adult-content.png`}
            />
        }
        <div className='absolute top-3 left-3'>
            <Badge className=' bg-sky-500/20 group-hover:bg-sky-500/80 text-white text-sm font-medium w-full'>{result.release_date || result.first_air_date}</Badge>
        </div>
        <CardContent className=' p-4    flex     justify-center h-full  z-30 '>
            <div className='flex  w-full group-hover:opacity-100  items-end  gap-1 z-30 delay-100 duration-300 opacity-0 group-hover:-translate-y-[20px]'>

                <div className='flex flex-col'>
                    <h2 className='text-white text-lg font-semibold w-full z-30 mb-1'>{result.title || result.name || result.original_title}</h2>
                    <Separator className='mb-2' />
                    <p className='text-white text-ellipsis text-sm overflow-hidden h-[100px] line-clamp-6	'>
                        {
                            
                            result.overview || "No overview provided"
                        }

                    </p>
                    <p className='text-white  text-center mt-[2px]'>.....</p>
                </div>

            </div>

            <div className='opacity-0 group-hover:opacity-100 duration-200 w-full h-full bg-gradient-to-t from-black  from-30% bg-opacity-20 absolute bottom-0' />
        </CardContent>


    </Card >

}

export default TrendFeedCard


export const TrendFeedCardSkeleton = () => {
    const arr = Array.from({ length: 20 }, (_, i) => i)
    return (
        <ul className='flex flex-wrap justify-center gap-5 mt-6 px-20'>
            {
                arr.map((_, i) => <Skeleton
                    key={i}
                    className='w-[280px] h-[420px] rounded-md relative bg-black'
                />)
            }

        </ul>

    )
}
