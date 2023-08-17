'use client'

import { FC, useEffect, useState } from 'react'
import { getCollection } from "@/lib/firebase/firestore"
import { SimilarMovieType } from '@/types/movies'
import MovieCard from '@/components/feed/card/MovieCard'
import { useTranslations } from 'next-intl'
interface pageProps {
    params: {
        userId: string
    }
}

const Page: FC<pageProps> = ({ params }) => {
    const [loading, setLoading] = useState(true)
    const t = useTranslations("favorites")
    const [movies, setMovies] = useState<null | {
        id: number
        title: string
        poster_path: string
        release_date: string
        original_title: string
        overview: string
        isFavorite: boolean
    }[]>(null)
    useEffect(() => {
        const getMovies = async () => {
            const movies = await getCollection(`users/${params.userId}/movies`)
            setMovies(movies)
            setLoading(false)
        }
        getMovies()

    }, [])

    if (loading) return <div>loading</div>

    return <div className='mt-3 min-h-screen'>
        <h1 className='font-bold text-3xl my-4 text-center'>
            {t("title")}
        </h1>
        <ul className='flex flex-wrap gap-4 justify-center'>
            {
                movies?.map((movie: SimilarMovieType) => (
                    <li className='key={movie.id}'>
                        <MovieCard result={movie} />
                    </li>
                ))
            }
        </ul>
    </div>
}

export default Page