"use client"

import { FC } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import {
  BsChevronBarLeft,
  BsChevronBarRight,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs"

import { Button } from "@/components/ui/button"

interface PaginationButtonsProps {
  total_pages: number
  pageDB: number
}

const PaginationParamsButtons: FC<PaginationButtonsProps> = ({
  total_pages,
  pageDB,
}) => {
  const pathname = usePathname()
  const router = useRouter()
  const params = useSearchParams()

  const page = parseInt(params.get("page")!) || 1
  const pushPage = (pageParam: number) => {
    let currentQuery = {}
    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          ...currentQuery,
          page: pageParam,
        },
      },
      { skipNull: true }
    )

    router.push(url)
  }
  return (
    <div className="mb-16 mt-8 flex w-full justify-center gap-1">
      <Button
        variant="outline"
        size="icon"
        onClick={() => pushPage(page - 1)}
        disabled={pageDB <= 1 || pathname.includes("page=1")}
      >
        <BsChevronLeft className="h-4 w-4" />
        <p className="sr-only">go previous</p>
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={pageDB <= 2}
        onClick={() => pushPage(page - 2)}
      >
        <BsChevronDoubleLeft className="h-4 w-4" />
        <p className="sr-only">go 2 previous page</p>
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={pageDB === 1}
        onClick={() => pushPage(1)}
      >
        <BsChevronBarLeft className="h-4 w-4" />
        <p className="sr-only">go to start</p>
      </Button>

      <Button
        variant="outline"
        size="icon"
        disabled={total_pages === pageDB || pageDB >= 500}
        onClick={() => pushPage(total_pages >= 500 ? 500 : total_pages)}
      >
        <BsChevronBarRight className="h-4 w-4" />
        <p className="sr-only">go to end</p>
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={total_pages <= pageDB + 1 || pageDB >= 500}
        onClick={() => pushPage(page + 2)}
      >
        <BsChevronDoubleRight className="h-4 w-4" />
        <p className="sr-only">go 2 next page</p>
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={total_pages === pageDB || pageDB >= 500}
        onClick={() => pushPage(page + 1)}
      >
        <BsChevronRight className="h-4 w-4" />
        <p className="sr-only">go next</p>
      </Button>
    </div>
  )
}

export default PaginationParamsButtons
