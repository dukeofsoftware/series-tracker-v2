"use client"

import { FC, useEffect, useState } from "react"
import { MovieResponse } from "@/types/movies"
import { useTranslations } from "next-intl"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { BiLoaderAlt } from "react-icons/bi"

import { addData, getDocument } from "@/lib/firebase/firestore"
import { useAuth } from "./providers/context"
import { Button } from "./ui/button"
import { toast } from "./ui/use-toast"

interface AddToFavoritesProps {
  movieResult?:
  | MovieResponse
  | {
    id: string | number
    title: string
    poster_path: string
    release_date: string
    original_title: string
    overview: string
  }
  seriesResult?: {
    id: number
    title: string
    poster_path: string
    first_air_date?: string
    last_air_date?: string
    overview: string
  }
  type: "movie" | "series"
}

const AddToFavorites: FC<AddToFavoritesProps> = ({ movieResult, type, seriesResult }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { user } = useAuth()
  const t = useTranslations("favorites")
  const global = useTranslations("global")
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null)

  if (!user) return null

  useEffect(() => {
    const getData = async () => {
      if (!movieResult || !seriesResult) return

      try {
        let data;
        if (type === "movie") {
          data = await getDocument(
            `users/${user.uid}/movies`,
            movieResult.id.toString()
          )
        }
        if (type === "series") {
          data = await getDocument(
            `users/${user.uid}/series`,
            seriesResult.id.toString()
          )
        }

        if (data) {
          setIsFavorite(data.isFavorite)
        } else {
          setIsFavorite(false)
        }
      } catch (error) {
        setIsFavorite(false)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [])

  const handleFavorite = async () => {
    if (!user) return
    if (!movieResult || !seriesResult) return

    if (!user.emailVerified) {
      const t = useTranslations("global.toast")
      toast({
        title: t("error"),
        description: t("firebase.emailVerify"),
        variant: "destructive",
      })
      return
    }
    setIsFavorite((prev) => !prev)
    let dataFB;
    try {
      if (type === "movie") {
        dataFB = await getDocument(
          `users/${user.uid}/movies`,
          movieResult.id.toString()
        )
        if (!dataFB?.status) {
          await addData(`users/${user.uid}/movies`, movieResult.id.toString(), {
            isFavorite: !isFavorite,
            id: movieResult.id,
            title: movieResult.title,
            poster_path: movieResult.poster_path,
            release_date: movieResult.release_date,
            original_title: movieResult.original_title,
            overview: movieResult.overview,
            status: "not-started",
          })
        }
        if (isFavorite) {
          await addData(`users/${user.uid}/movies`, movieResult.id.toString(), {
            isFavorite: false,
            id: movieResult.id,
            title: movieResult.title,
            poster_path: movieResult.poster_path,
            release_date: movieResult.release_date,
            original_title: movieResult.original_title,
            overview: movieResult.overview,
          })
          toast({
            title: global("toast.success"),
            description: t("removeFromFavorites", {
              title: movieResult.title || movieResult.original_title,
            }),
          })
        }


        if (!isFavorite) {
          await addData(`users/${user.uid}/movies`, movieResult.id.toString(), {
            isFavorite: true,
            id: movieResult.id,
            title: movieResult.title,
            poster_path: movieResult.poster_path,
            release_date: movieResult.release_date,
            original_title: movieResult.original_title,
            overview: movieResult.overview,
          })
          toast({
            title: global("toast.success"),
            description: t("addToFavorites", {
              title: movieResult.title || movieResult.original_title,
            }),
          })
        }
      }
      if (type === "series") {
        dataFB = await getDocument(
          `users/${user.uid}/series`,
          seriesResult.id.toString()
        )

        if (!dataFB?.status) {
          await addData(`users/${user.uid}/series`, seriesResult.id.toString(), {
            id: seriesResult.id,
            title: seriesResult.title,
            poster_path: seriesResult.poster_path,
            date: seriesResult.first_air_date || seriesResult.last_air_date,
            overview: seriesResult.overview,
            status: "not-started",
          })
        }
        if (isFavorite)
          await addData(`users/${user.uid}/series`, seriesResult.id.toString(), {
            isFavorite: false,
            id: seriesResult.id,
            title: seriesResult.title,
            poster_path: seriesResult.poster_path,
            date: seriesResult.first_air_date || seriesResult.last_air_date,
            overview: seriesResult.overview,
          })
        toast({
          title: global("toast.success"),
          description: t("removeFromFavorites", { title: seriesResult.title }),
        })

        if (!isFavorite) {
          await addData(`users/${user.uid}/series`, seriesResult.id.toString(), {
            isFavorite: true,
            id: seriesResult.id,
            title: seriesResult.title,
            poster_path: seriesResult.poster_path,
            date: seriesResult.first_air_date || seriesResult.last_air_date,
            overview: seriesResult.overview,
          })
          toast({
            title: global("toast.success"),
            description: t("addToFavorites", {
              title: seriesResult.title,
            }),
          })
        }

      }




    } catch (error: any) {
      setIsFavorite((prev) => !prev)

      console.error(error)
      toast({
        title: global("toast.error", {
          code: error.code,
        }),
        description: error.message,
        variant: "destructive",
      })
    }
  }
  if (isLoading)
    return <BiLoaderAlt className="h-5 w-5 animate-spin text-sky-500" />
  return (
    <Button variant={"ghost"} size={"icon"} onClick={handleFavorite}>
      {isFavorite ? (
        <AiFillHeart className="h-5 w-5 text-red-500" />
      ) : (
        <AiOutlineHeart className="h-4 w-4" />
      )}
    </Button>
  )
}

export default AddToFavorites
