import { FC } from "react"

import { Badge } from "@/components/ui/badge"

interface AirDateProps {
  date: string
}

const AirDate: FC<AirDateProps> = ({ date }) => {
  return (
    <div className="absolute left-2 top-2 flex items-center sm:left-3 sm:top-3 ">
      <Badge className=" w-full bg-sky-500/20 text-xs font-medium text-white group-hover:bg-sky-500/80 sm:text-sm">
        {date}
      </Badge>
    </div>
  )
}

export default AirDate
