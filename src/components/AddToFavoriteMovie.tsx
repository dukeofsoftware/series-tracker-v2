'use client'

import { FC, useEffect, useState } from 'react'
import { useAuth } from './providers/context'
import { addData, getDocument } from '@/lib/firebase/firestore'
import { Button } from './ui/button'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { toast } from './ui/use-toast'
import { MovieResponse } from '@/types/movies'
import { useTranslations } from 'next-intl'
import { BiLoaderAlt } from 'react-icons/bi'
interface AddToFavoriteMovieProps {
    result: MovieResponse
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
                const data = await getDocument(`users/${user.uid}/movies`, result.id.toString())

                if (data) {
                    setIsFavorite(data.isFavorite)
                }
                else {
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

            await addData(`users/${user.uid}/movies`, result.id.toString(), {
                isFavorite: !isFavorite,
                id: result.id,
                title: result.title,
                poster_path: result.poster_path,
                release_date: result.release_date,
                original_title: result.original_title,
                overview: result.overview,
            })
            if (isFavorite) {
                toast({
                    title: global("toast.success"),
                    description: t('removeFromFavorites', { title: result.title || result.original_title })
                })
            } else {
                toast({
                    title: global("toast.success"),
                    description: t('addToFavorites', { title: result.title || result.original_title })
                })
            }


        } catch (error: any) {
            setIsFavorite((prev) => !prev)

            console.error(error);
            toast({
                title: global("toast.error", {
                    code: error.code,
                }),
                description: error.message,
                variant: "destructive",
            });
        }

    }
    if (isLoading) return (
        <BiLoaderAlt className="w-5 h-5 animate-spin text-sky-500" />
    )
    return <Button variant={"ghost"} size={"icon"} onClick={
        handleFavorite
    } >

        {
            isFavorite ? <AiFillHeart className="w-5 h-5 text-red-500" /> : <AiOutlineHeart className="w-4 h-4" />

        }
    </Button>

}

export default AddToFavoriteMovie