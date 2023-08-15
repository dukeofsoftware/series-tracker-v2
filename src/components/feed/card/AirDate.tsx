'use client'

import { FC } from 'react'
import { Badge } from "@/components/ui/badge"

interface AirDateProps {
    release_date?: string
    first_air_date?: string
}

const AirDate: FC<AirDateProps> = ({ release_date, first_air_date }) => {
    return <div className="absolute left-3 top-3 flex gap-2 items-center">

        <Badge className=" w-full bg-sky-500/20 text-sm font-medium text-white group-hover:bg-sky-500/80">
            {release_date || first_air_date}
        </Badge>
    </div>
}

export default AirDate