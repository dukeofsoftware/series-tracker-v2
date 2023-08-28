'use client'

import ChatSidebar from '@/components/chat/ChatSidebar'
import { FC } from 'react'

interface layoutProps {
    children: React.ReactNode
    params: {
        lang: string
    }
}

const Layout: FC<layoutProps> = ({ children }) => {
    return <div className='relative container flex min-h-screen'>
        
           {children}
    </div >
}

export default Layout