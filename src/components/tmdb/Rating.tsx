"use client"

import React, { FC, memo, useEffect, useMemo, useState } from "react"
import { trpcCaller } from "@/trpc/trpc-caller"
import { useTranslations } from "next-intl"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

import { addData, getDocument } from "@/lib/firebase/firestore"
import { useAuth } from "@/components/providers/context"
import { toast } from "@/components/ui/use-toast"

interface RatingProps {
  type: "movie" | "series"
  movieResult?: Awaited<ReturnType<(typeof trpcCaller)["useGetTmdbMovie"]>>
  seriesResult?: Awaited<ReturnType<(typeof trpcCaller)["useGetTmdbTv"]>>
}

const Rating: FC<RatingProps> = ({ type, movieResult, seriesResult }) => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [rating, setRating] = useState<number>(0)
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  if (!user) return null
  const dataType = useMemo(() => {
    if (type === "movie") {
      return "movies"
    } else {
      return "series"
    }
  }, [type])
  const global = useTranslations("global.toast")
  const t = useTranslations()

  const changeRating = async (newRating: number) => {
    try {
      if (!user.emailVerified) {
        toast({
          title: global("error"),
          description: global("firebase.emailVerify"),
          variant: "destructive",
        })
        return
      }

      const result = type === "movie" ? movieResult : seriesResult

      if (result) {
        setRating(newRating)

        const docPath = `users/${user.uid}/${dataType}`

        const exist = await getDocument(docPath, result.id.toString())

        const dataToUpdate = {
          id: result.id,
          title: result.title,
          poster_path: result.poster_path,
          overview: result.overview,
        }

        if (!exist?.status) {
          await addData(docPath, result.id.toString(), {
            status: "completed",
            ...dataToUpdate,
          })
        }

        await addData(docPath, result.id.toString(), {
          ...dataToUpdate,
          rating: newRating,
        })

        toast({
          title: global("success"),
          description: t("starDescription", {
            title:
              "original_title" in result ? result.original_title : result.title,
          }),
        })
      }
    } catch (error) {
      console.error("CHANGE RATING ERROR:", error)
    }
  }

  const fetchMoviesRating = async () => {
    try {
      const result = type === "movie" ? movieResult : seriesResult

      if (result) {
        const docPath = `users/${user.uid}/${dataType}`

        const data = await getDocument(docPath, result.id.toString())
        if (data?.rating) {
          setRating(data.rating)
        } else {
          setRating(0)
        }
      }
    } catch (error) {
      console.error("RATING ERROR:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMoviesRating()
  }, [])

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex">
      {Array.from(Array(5).keys()).map((i) => (
        <div
          key={i}
          className="cursor-pointer"
          onMouseEnter={() => setHoverRating(i + 1)}
          onMouseLeave={() => setHoverRating(null)}
          onClick={() => changeRating(i + 1)}
        >
          {rating >= 0 && i + 1 <= (hoverRating || rating) ? (
            <AiFillStar className="h-4 w-4 text-yellow-500 sm:h-5 sm:w-5" />
          ) : (
            <AiOutlineStar className="h-4 w-4 text-yellow-500 sm:h-5 sm:w-5" />
          )}
        </div>
      ))}
    </div>
  )
}

export default memo(Rating)
