'use client'

import { FC } from 'react'

interface layoutProps {
    children: React.ReactNode
    params: {
        lang: string
    }
}

const Layout: FC<layoutProps> = ({ children }) => {
    return <>
        {children}
    </>
}

export default Layout