'use client'

import { FC } from 'react'
import { BsChevronDoubleLeft } from 'react-icons/bs'
import {  buttonVariants } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface TopbarProps {
    user: {
        username: string
        displayName?: string
        photoURL?: string
    }
}

const Topbar: FC<TopbarProps> = ({ user }) => {

    return <div className='z-30 sticky top-4 w-full flex gap-2 p-2 py-4 rounded-md bg-slate-200 text-black dark:text-white dark:bg-black h-18 items-center'>
        <Link href={`/profile/chat`} className={cn(buttonVariants({size:"icon"}))}>
            <BsChevronDoubleLeft className="w-5 h-5" />
        </Link>
        <Avatar>
            <AvatarFallback>
                {user.displayName ? user.displayName[0] : user.username[0]}
            </AvatarFallback>
            <AvatarImage
                src={user.photoURL || "/male.png"}
                alt={user.displayName || user.username}
            />
        </Avatar>
        <p  className=' font-semibold text-lg'>
            {user.displayName || user.username}
        </p>
      
    </div>
}

export default Topbar