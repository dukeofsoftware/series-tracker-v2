'use client'

import { FC, useEffect, useState } from 'react'
import { getCollection } from "@/lib/firebase/firestore"
import { SimilarMovieType } from '@/types/movies'
import MovieCard from '@/components/feed/card/MovieCard'
interface pageProps {
    params: {
        userId: string
    }
}

const Page: FC<pageProps> = ({ params }) => {
    const [loading, setLoading] = useState(true)
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

    return <>
        {
            movies?.map((movie: SimilarMovieType) => (
                <MovieCard result={movie} key={movie.id} />
            ))
        }
    </>
}

export default Page