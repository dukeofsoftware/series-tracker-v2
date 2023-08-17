'use client'

import SearchBar from '@/components/SearchBar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { db } from '@/lib/firebase/firestore'
import { collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

interface PageProps { }

const Page: FC<PageProps> = ({ }) => {

    const [text, setText] = useState("")
    const [usernames, setUsernames] = useState<any>([])
    const [value] = useDebounce(text, 500);
    const [filteredUsernames, setFilteredUsernames] = useState<any>(null)
    const getUsernames = async () => {
        const ref = collection(db, `usernames`)
        const usernames = await getDocs(ref)
        const usernamesData = usernames.docs.map(doc => {
            return {
                username: doc.id,
                ...doc.data()
            }
        })
        setUsernames(usernamesData)
        setFilteredUsernames(usernamesData)
        return usernamesData
    }

    useEffect(() => {
        getUsernames()


    }, [])
    useEffect(() => {
        if (value.length > 0) {
            const filteredUsernames = usernames.filter((username: any) => {
                return username.username.toLowerCase().includes(value.toLowerCase())
            })
            setFilteredUsernames(filteredUsernames)
        } else {
            setFilteredUsernames(usernames)
        }
        console.log(filteredUsernames)
    }, [value])
    return <>
        <div className='my-2 container max-w-md'>
            <SearchBar text={text} setText={setText} />

        </div>
        <ul className='flex flex-wrap '>
            {filteredUsernames && filteredUsernames?.length > 0 ? filteredUsernames.map((username: any) => {
                return <li key={username.username} >
                    <Link href={`/profile/${username.uid}`}>
                        <Card className='p-2 m-2 flex items-center gap-2 '>

                            <Avatar>
                                <AvatarFallback>
                                    {username.username[0]}
                                </AvatarFallback>
                                <AvatarImage src={username.photoURL || "/male.png"} alt={username.username} />

                            </Avatar>
                            {username.username}
                        </Card>
                    </Link>
                </li>
            }) : (
                <div>
                    No results
                </div>
            )}

        </ul>
      
    </>
}

export default Page