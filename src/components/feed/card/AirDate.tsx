"use client"

import { FC } from "react"

import { Badge } from "@/components/ui/badge"

interface AirDateProps {
  release_date?: string
  first_air_date?: string
}

const AirDate: FC<AirDateProps> = ({ release_date, first_air_date }) => {
  return (
    <div className="absolute left-2 top-2 flex items-center sm:left-3 sm:top-3 ">
      <Badge className=" w-full bg-sky-500/20 text-xs font-medium text-white group-hover:bg-sky-500/80 sm:text-sm">
        {release_date || first_air_date}
      </Badge>
    </div>
  )
}

export default AirDate
