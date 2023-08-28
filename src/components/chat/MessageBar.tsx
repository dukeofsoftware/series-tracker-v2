'use client'

import { FC, useRef } from 'react'
import { addData } from '@/lib/firebase/firestore'
import { useAuth } from '../providers/context'
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../ui/button';
import { notFound } from 'next/navigation';

interface MessageBarProps {
    roomId: string
}

const MessageBar: FC<MessageBarProps> = ({ roomId }) => {
    const { user } = useAuth()
    if(!user) return notFound()
    const ref = useRef<HTMLInputElement>(null)

    /* send message */
    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!ref.current?.value) return
        await addData(`chatRooms/${roomId}/messages`, uuidv4(), {
            senderId: user?.uid,
            created_at: new Date(),
            message: ref.current?.value
        })
        ref.current.value = ''
    }



    return <div className='fixed bottom-0 left-0 right-0 flex justify-center items-center w-full'>
        <form className='flex justify-center  w-full h-16 px-4 py-2   max-w-xl gap-2 items-center' onSubmit={sendMessage}>

            <input ref={ref} className='w-full h-full rounded-md border 
bg-slate-200 text-slate-950       dark:bg-slate-950  dark:text-white  border-gray-200 px-2 py-1' type="text" placeholder='Type a message' />
            <Button type='submit'>Send</Button>


        </form>
    </div>


}

export default MessageBar