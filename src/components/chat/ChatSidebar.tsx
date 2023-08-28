"use client"
import { FC, useEffect, useState } from 'react'
import { useAuth } from '../providers/context'
import { getCollection, getDocument } from '@/lib/firebase/firestore'
import { Card } from '../ui/card'
import { ScrollArea } from '../ui/scroll-area'

import CreateChatButton from './CreateChatButton'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
interface ChatSidebarProps { }

const ChatSidebar: FC<ChatSidebarProps> = ({ }) => {
    const [users, setUsers] = useState<any[]>([])

    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const getData = async () => {
        try {
            setIsLoading(true)
            const chats = await getCollection(`chats/${user?.uid}/chats`)
            const users = await Promise.all(chats.map(async (chat: any) => {
                const user = await getDocument(`users`, chat?.userId)
                return {
                    ...user,
                    chatId: chat?.chatId
                }
            }))

            setUsers(users)

        } catch (error) {
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return <>
        <aside className='w-full sm:w-72 sm:left-3 sm:fixed'>

            <Card className='p-3 w-full min-h-[95vh] rounded-md'>
                <div className='flex items-center justify-end py-2'>
                    <CreateChatButton />
                </div>
                <ScrollArea>
                    <div className='flex flex-col gap-2'>
                        {isLoading && <div>
                            Loading...
                        </div>}
                        {!isLoading && users.map((user) => {
                            return <Link href={`/profile/chat/${user.chatId}`} key={user.id} className='flex gap-2 items-center p-2 active:bg-gray-500/20 hover:bg-gray-500/20 rounded-md'>
                                <Avatar>
                                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                                    <AvatarImage
                                        src={user.photoURL || "/male.png"}
                                        alt={user.username}
                                    />
                                </Avatar>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h1 className='text-sm font-semibold'>{
                                            user?.username
                                        }</h1>
                                    </div>
                                </div>
                            </Link>
                        })}
                    </div>

                </ScrollArea>
            </Card>
        </aside>
    </>
}

export default ChatSidebar