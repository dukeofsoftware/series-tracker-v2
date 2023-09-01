import { TrendFeedCardSkeleton } from '@/components/feed/card/TrendFeedCard'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Skeleton } from '@/components/ui/skeleton'
import { AiFillStar } from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'

const Loading = async () => {
    return <div className="container relative w-full px-0 ">
        <div className="relative -z-10 max-h-[520px]">
            <AspectRatio ratio={33 / 20} className="max-h-[520px] pb-0 ">
                <Skeleton className='absolute top-0 left-0 w-full h-full' />
            </AspectRatio>
        </div>

        <div className="ml-2 mt-4 flex flex-col sm:ml-4 sm:flex-row">
            <Skeleton className="relative mx-auto mb-4 flex	 h-[510px] w-[340px] shrink-0 items-center  rounded-md border-4 border-slate-800 sm:mx-0 sm:h-[300px] sm:min-h-[200px] sm:w-[200px] ">


            </Skeleton>
            <div className=" mx-5 sm:container">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <Skeleton className="w-[300px] h-9" />
                        <div className=" flex items-center gap-2">
                            <FaHeart className="w-5 h-5 text-red-500 animate-pulse" />
                            <div className='flex'>
                                {
                                    Array(5).fill(0).map((_, i) => (<AiFillStar key={i} className=" w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 animate-pulse" />))
                                }
                            </div>
                            <div className='rounded-md border-white'>
                                <Skeleton className="p-2 w-32 h-9" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Skeleton
                            className="bg-green-600 h-6 w-[4rem]
         hover:bg-green-700 active:bg-green-700 rounded-full"
                        />

                        <Skeleton
                            className="bg-sky-600 
         hover:bg-sky-700 active:bg-sky-700 w-24 h-6 rounded-full"
                        />

                        <Skeleton className='h-6 w-16 rounded-full' />

                    </div>
                </div>
                <div className="mb-2 flex flex-col gap-1">
                    {
                        Array(6).fill(0).map((_, i) => (<Skeleton key={i} className="w-full h-5" />))
                    }
                </div>
                <div className="flex">
                    <Skeleton className="h-8 w-20" />
                    <span className='font-bold text-lg mx-1'>
                        :
                    </span>

                    <div className="mx-2 flex flex-wrap items-center gap-1.5 ">
                        {
                            Array(6).fill(0).map((_, i) => (<Skeleton key={i} className="h-6 w-[4rem] rounded-full" />))
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full grid place-items-center'>
            <Skeleton className="my-2 mt-16 h-8 w-40 " />

        </div>

        <ul className=" mb-20 flex flex-wrap justify-center gap-5 px-20">
            <TrendFeedCardSkeleton />
        </ul>
    </div>
}

export default Loading