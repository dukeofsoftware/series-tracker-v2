import { FC } from "react"

import TrendFeedCard from "./feed/card/TrendFeedCard"

interface SimilarsProps {
  title: string
  similar: any[]
}

const Similars: FC<SimilarsProps> = ({ title, similar }) => {
  if (similar?.length) return null
  return (
    <>
      <h2 className="my-2 mt-16 text-center text-2xl font-bold">{title}</h2>

      <ul className=" mb-20 flex flex-wrap justify-center gap-5 px-20">
        {similar?.map((result, index) => (
          <li key={index}>
            <TrendFeedCard result={result} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default Similars
