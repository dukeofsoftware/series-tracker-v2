import { FC } from "react"

import { CardContent as Content } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface CardContentProps {
  title?: string
  name?: string
  original_title?: string
  overview?: string
}

const CardContent: FC<CardContentProps> = ({
  title,
  name,
  original_title,
  overview,
}) => {
  return (
    <Content className=" z-30    flex     h-full justify-center  p-2 sm:p-4 ">
      <div className="z-30  flex w-full  items-end gap-1  opacity-0 delay-100 duration-300 group-hover:-translate-y-[5px] group-hover:opacity-100 sm:group-hover:-translate-y-[20px]">
        <div className="flex flex-col items-end sm:items-stretch	">
          <h2 className="z-30 w-full font-semibold text-white sm:mb-1 sm:text-lg">
            {title || name || original_title}
          </h2>
          <Separator className="mb-1 sm:mb-2" />
          <p className="line-clamp-6 h-[100px] overflow-hidden text-ellipsis text-xs text-white sm:text-sm	">
            {overview || "No overview provided"}
          </p>
          <p className="mt-[2px] hidden text-center  text-white sm:block">
            .....
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 h-full w-full bg-opacity-20 bg-gradient-to-t from-black  from-30% opacity-0 duration-200 group-hover:opacity-100" />
    </Content>
  )
}

export default CardContent
