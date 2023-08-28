"use client"
import { FC, useEffect, useState } from 'react'
import { useAuth } from './providers/context'
import { getCollection } from '@/lib/firebase/firestore'

interface ChatSidebarProps { }

const ChatSidebar: FC<ChatSidebarProps> = ({ }) => {
    const [followers, setFollowers] = useState<any[] | null>(null)
    const [following, setFollowing] = useState<any[] | null>(null)

    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [isFollow, setIsFollow] = useState<null | boolean>(null)

    const getData = async () => {
        try {

            const followers = await getCollection(`follow/${user?.uid}/followers`)
            const following = await getCollection(`follow/${user?.uid}/following`)
            setFollowers(followers)
            setFollowing(following)

        } catch (error) {
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return <>
        <aside className='w-72 left-0 fixed top-0'>

        </aside>
    </>
}

export default ChatSidebar