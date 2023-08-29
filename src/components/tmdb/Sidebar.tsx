"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import qs from "query-string"
import { useDebounce } from "use-debounce"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { buttonVariants } from "../ui/button"

const SearchBar = dynamic(() => import("../SearchBar").then((mod) => mod), {
  ssr: false,
})

const Sidebar = ({}) => {
  const params = useSearchParams()

  const [text, setText] = useState(params.get("query"))
  const t = useTranslations("search")
  const [type, setType] = useState(params.get("type"))
  const [adult, setAdult] = useState<boolean>(
    params.get("adult") === "true" ? true : false
  )
  const [value] = useDebounce(text, 500)
  const path = usePathname()

  const router = useRouter()
  useEffect(() => {
    if (!value) return
    /* check for spaces */

    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const url = qs.stringifyUrl(
      {
        url: path,
        query: {
          ...currentQuery,
          query: value,
        },
      },
      { skipNull: true }
    )

    router.push(url)
  }, [value])
  useEffect(() => {
    let currentQuery = {}
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    const url = qs.stringifyUrl(
      {
        url: path,
        query: {
          ...currentQuery,
          type: type,
        },
      },
      { skipNull: true }
    )

    router.push(url)
  }, [type])
  useEffect(() => {
    let currentQuery = {}
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    const url = qs.stringifyUrl(
      {
        url: path,
        query: {
          ...currentQuery,
          adult: adult,
        },
      },
      { skipNull: true }
    )

    router.push(url)
  }, [adult])

  return (
    <>
      <aside className="fixed hidden h-[91vh] w-72 rounded-md  bg-gray-200/80 py-2 dark:bg-gray-900 lg:block">
        <ScrollArea className="mx-3 flex flex-col ">
          <SearchBar text={text!} setText={setText} />
          <Select defaultValue={type!} onValueChange={(e) => setType(e)}>
            <SelectTrigger className="my-2 w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">{t("all")}</SelectItem>
                <SelectItem value="movies">{t("movie")}</SelectItem>
                <SelectItem value="series">{t("series")}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="mt-2 flex items-center space-x-2">
            <Switch
              checked={adult}
              onCheckedChange={(e) => setAdult(e)}
              className=""
              id="adult"
            />
            <Label htmlFor="adult" className="text-lg font-bold">
              {t("adultContent")}
            </Label>
          </div>
        </ScrollArea>
      </aside>
      <Sheet>
        <div className="flex w-full items-center justify-center lg:hidden">
          <SheetTrigger
            className={cn(
              buttonVariants({ variant: "outline" }),
              "max-w-xs lg:hidden "
            )}
          >
            {t("title")}
          </SheetTrigger>
        </div>
        <SheetContent side={"top"} className="lg:hidden">
          <SheetHeader>
            <SheetTitle>{t("searchFor")}</SheetTitle>
          </SheetHeader>
          <ScrollArea className="mx-3 mt-3 flex flex-col gap-3 ">
            <SearchBar text={text!} setText={setText} />
            <Select defaultValue={type!} onValueChange={(e) => setType(e)}>
              <SelectTrigger className="my-2 w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">{t("all")}</SelectItem>
                  <SelectItem value="movies">{t("movie")}</SelectItem>
                  <SelectItem value="series">{t("series")}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="mt-2 flex items-center space-x-2">
              <Switch
                checked={adult}
                onCheckedChange={(e) => setAdult(e)}
                className=""
                id="adult"
              />
              <Label htmlFor="adult" className="text-lg font-bold">
                {t("adultContent")}
              </Label>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default Sidebar
