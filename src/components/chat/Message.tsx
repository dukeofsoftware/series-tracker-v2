'use client'

import { FC } from 'react'
import { useAuth } from '../providers/context'
import { AvatarImage, Avatar, AvatarFallback } from '../ui/avatar'
import { notFound } from 'next/navigation'

interface MessageProps {
    message: {
        senderId: string,
        created_at: {
            seconds: number,
            nanoseconds: number
        },
        message: string
    }
    user: {
        username: string
        displayName?: string
        photoURL?: string
    }
}

const Message: FC<MessageProps> = ({ message, user }) => {
    const { user: currentUser } = useAuth()
    const isSender = message.senderId === currentUser?.uid
    if (!currentUser) return notFound()
    return <>
        <div className={`flex flex-col gap-2
            }`}>
            <div className={`flex
                ${isSender ? 'justify-end' : 'justify-start'}

                `}>
                <div className={`flex gap-2 ${isSender ? 'flex-row-reverse' : 'flex-row'}

`}>
                    <Avatar >
                        <AvatarFallback>
                            {user.displayName ? user.displayName[0] : user.username[0] || "U"}

                        </AvatarFallback>
              
                        <AvatarImage
                            src={
                                isSender ? currentUser.photoURL : user?.photoURL || "/male.png" as any
                            }
                        />

                    </Avatar>
                    <div className={`flex flex-col gap-2 p-4 bg-slate-200 text-black dark:text-white dark:bg-black rounded-md max-w-md min-w-[75px]`}>
                        <p className=' '>
                            {message.message}
                        </p>
                        <p className='text-xs '>
                            {new Date(message.created_at.seconds * 1000).toLocaleString()}
                        </p>
                    </div>

                </div>
            </div>
        </div>

    </>
}

export default Message