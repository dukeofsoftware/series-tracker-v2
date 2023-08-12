'use client'

import { FC } from 'react'
import { Button } from '@/components/ui/button'
import {
    BsChevronLeft,
    BsChevronDoubleLeft,
    BsChevronBarLeft,
    BsChevronBarRight,
    BsChevronDoubleRight,
    BsChevronRight
} from "react-icons/bs";
import { usePathname, useRouter } from 'next/navigation';
import { TrendingPage } from '@/types/trending';
import { useSearchParams } from 'next/navigation'

interface PaginationButtonsProps {
    data: TrendingPage
}

const PaginationButtons: FC<PaginationButtonsProps> = ({
    data,

}) => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const page = parseInt(searchParams.get('page')!) || 1

    return <>
        <div className='flex justify-center gap-1 mt-8 mb-16'>

            <Button variant="outline" size="icon" onClick={() => router.push(`/?page=${page - 1}`)} disabled={data.page <= 1 || pathname.includes("page=1")}>
                <BsChevronLeft className='h-4 w-4' />
                <p className='sr-only'>
                    go previous
                </p>

            </Button>
            <Button variant="outline" size="icon" disabled={data.page <= 2} onClick={() => router.push(`/?page=${page - 2}`)}>
                <BsChevronDoubleLeft className='h-4 w-4' />
                <p className='sr-only'>
                    go 2 previous page
                </p>

            </Button>
            <Button variant="outline" size="icon" disabled={data.page === 1} onClick={() => router.push(`/?page=${1}`)}>
                <BsChevronBarLeft className='h-4 w-4' />
                <p className='sr-only'>
                    go to start
                </p>
            </Button>

            <Button variant="outline" size="icon" disabled={
                data.total_pages === data.page || data.page >= 500
            } onClick={() => router.push(`/?page=${500}`)}>
                <BsChevronBarRight className='h-4 w-4' />
                <p className='sr-only'>
                    go to end
                </p>
            </Button>
            <Button variant="outline" size="icon" disabled={
                data.total_pages <= data.page + 1 || data.page >= 500
            } onClick={() => router.push(`/?page=${page + 2}`)}  >
                <BsChevronDoubleRight className='h-4 w-4' />
                <p className='sr-only'>
                    go 2 next page
                </p>


            </Button>
            <Button variant="outline" size="icon" disabled={
                data.total_pages === data.page || data.page >= 500
            }
                onClick={() => router.push(`/?page=${page + 1}`)}
            >
                <BsChevronRight className='h-4 w-4' />
                <p className='sr-only'>
                    go next
                </p>

            </Button>
        </div>





    </>
}

export default PaginationButtons