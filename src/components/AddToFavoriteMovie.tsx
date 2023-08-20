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

interface AddToFavoriteMovieProps {
  result:
    | MovieResponse
    | {
        id: string | number
        title: string
        poster_path: string
        release_date: string
        original_title: string
        overview: string
      }
}

const AddToFavoriteMovie: FC<AddToFavoriteMovieProps> = ({ result }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { user } = useAuth()
  const t = useTranslations("favorites")
  const global = useTranslations("global")
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null)

  if (!user) return null

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getDocument(
          `users/${user.uid}/movies`,
          result.id.toString()
        )

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

    try {
      const dataFB = await getDocument(
        `users/${user.uid}/movies`,
        result.id.toString()
      )

      if (!dataFB?.status) {
        await addData(`users/${user.uid}/movies`, result.id.toString(), {
          isFavorite: !isFavorite,
          id: result.id,
          title: result.title,
          poster_path: result.poster_path,
          release_date: result.release_date,
          original_title: result.original_title,
          overview: result.overview,
          status: "not-started",
        })
      }

      if (isFavorite)
        await addData(`users/${user.uid}/movies`, result.id.toString(), {
          isFavorite: false,
          id: result.id,
          title: result.title,
          poster_path: result.poster_path,
          release_date: result.release_date,
          original_title: result.original_title,
          overview: result.overview,
        })
      toast({
        title: global("toast.success"),
        description: t("removeFromFavorites", {
          title: result.title || result.original_title,
        }),
      })

      if (!isFavorite) {
        await addData(`users/${user.uid}/movies`, result.id.toString(), {
          isFavorite: true,
          id: result.id,
          title: result.title,
          poster_path: result.poster_path,
          release_date: result.release_date,
          original_title: result.original_title,
          overview: result.overview,
        })
        toast({
          title: global("toast.success"),
          description: t("addToFavorites", {
            title: result.title || result.original_title,
          }),
        })
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

export default AddToFavoriteMovie
