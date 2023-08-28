'use client'

import { FC, useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase/firestore'
import Message from './Message'

interface MessagesProps {
    serverMessages: {
        senderId: string,
        created_at: {
            seconds: number,
            nanoseconds: number
        },
        message: string

    }[]
    roomId: string
    user: {
        username: string
        displayName?: string
        photoURL?: string

    }
}

const Messages: FC<MessagesProps> = ({ serverMessages, roomId, user }) => {
    const [messages, setMessages] = useState<{
        senderId: string,
        created_at: {
            seconds: number,
            nanoseconds: number
        },
        message: string

    }[]>(serverMessages || [])

    useEffect(() => {

        const unsubscribe = onSnapshot(collection(db, `chatRooms/${roomId}/messages`), (querySnapshot) => {
            const messages: any = []
            querySnapshot.forEach((doc) => {
                messages.push(doc.data())
            })
            messages.sort((a: any, b: any) => {
                return a.created_at - b.created_at
            })
            setMessages(messages)
        }
        )
        return () => {
            unsubscribe()
        }

    }, [])


    return <div className='relative mt-4 '>
        {
            messages.map((message) => {
                return <Message message={message} user={user} />
            }
            )}
    </div>
}

export default Messages