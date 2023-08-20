"use client"

import { FC, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { useDebounce } from "use-debounce"

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
import { Switch } from "@/components/ui/switch"

const SearchBar = dynamic(() => import("./SearchBar").then((mod) => mod), {
  ssr: false,
})

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const params = useSearchParams()

  const [text, setText] = useState(params.get("query"))

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
          query: value.split(" ").join("-"),
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
    if (!adult) return
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
    <aside className=" fixed h-[91vh] w-72  rounded-md bg-gray-900 py-2">
      <ScrollArea className="mx-3 flex flex-col ">
        <SearchBar text={text!} setText={setText} />
        <Select defaultValue={type!} onValueChange={(e) => setType(e)}>
          <SelectTrigger className="my-2 w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="movies">Movies</SelectItem>
              <SelectItem value="series">Series</SelectItem>
              <SelectItem value="people">People</SelectItem>
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
            Adult Content
          </Label>
        </div>
      </ScrollArea>
    </aside>
  )
}

export default Sidebar
