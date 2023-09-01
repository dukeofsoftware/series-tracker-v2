"use client"

import { FC, memo, useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { trpcCaller } from "@/trpc/trpc-caller"
import { useTranslations } from "next-intl"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { BiLoaderAlt } from "react-icons/bi"

import { addData, getDocument } from "@/lib/firebase/firestore"
import { useAuth } from "@/components/providers/context"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface AddToFavoritesProps {
  movieResult?: Awaited<ReturnType<(typeof trpcCaller)["useGetTmdbMovie"]>>

  seriesResult?: Awaited<ReturnType<(typeof trpcCaller)["useGetTmdbTv"]>>

  type: "movie" | "series"
}

const AddToFavorites: FC<AddToFavoritesProps> = ({
  movieResult,
  type,
  seriesResult,
}) => {
  const { user } = useAuth()
  const t = useTranslations("favorites")
  const global = useTranslations("global")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null)
  const pathname = usePathname()
  if (!user && !pathname.startsWith("/profile")) return null
  const dataType = useMemo(() => {
    if (type === "movie") {
      return "movies"
    } else {
      return "series"
    }
  }, [type])
  useEffect(() => {
    const getData = async () => {
      try {
        const id = movieResult?.id || seriesResult?.id
        if (!id) return
        const data = await getDocument(
          `users/${user?.uid}/${dataType}`,
          id.toString()
        )
        setIsFavorite(data?.isFavorite ?? false)
      } catch (error) {
        setIsFavorite(false)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [movieResult?.id, seriesResult?.id, dataType, user?.uid])

  const handleFavorite = async () => {
    if (!user) return
    if (!user.emailVerified) {
      toast({
        title: global("toast.error"),
        description: global("toast.firebase.emailVerify"),
        variant: "destructive",
      })
      return
    }
    setIsFavorite((prev) => !prev)
    const id = movieResult?.id || seriesResult?.id
    if (!id) return
    try {
      const data = await getDocument(
        `users/${user.uid}/${dataType}`,
        id.toString()
      )
      if (!data?.status) {
        await addData(`users/${user.uid}/${dataType}`, id.toString(), {
          ...movieResult,
          ...seriesResult,
          isFavorite: !isFavorite,
          status: "not-started",
        })
      } else {
        await addData(`users/${user.uid}/${dataType}`, id.toString(), {
          isFavorite: !isFavorite,
        })
      }
      const title =
        movieResult?.title || movieResult?.original_title || seriesResult?.title
      const description = isFavorite
        ? t("removeFromFavorites", { title })
        : t("addToFavorites", { title })
      toast({
        title: global("toast.success"),
        description,
      })
    } catch (error: any) {
      setIsFavorite((prev) => !prev)
      console.error(error)
      toast({
        title: global("toast.error", { code: error.code }),
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <>
      {isLoading ? (
        <BiLoaderAlt className="h-5 w-5 animate-spin text-sky-500" />
      ) : (
        <Button variant="ghost" size="icon" onClick={handleFavorite}>
          {isFavorite ? (
            <AiFillHeart className="h-5 w-5 text-red-500" />
          ) : (
            <AiOutlineHeart className="h-4 w-4" />
          )}
        </Button>
      )}
    </>
  )
}

export default memo(AddToFavorites)
