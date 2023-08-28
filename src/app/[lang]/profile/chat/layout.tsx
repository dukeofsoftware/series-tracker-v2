"use client"

import { FC } from 'react'

interface layoutProps {
  children: React.ReactNode
  params: {
    lang: string
  }
}

const Layout: FC<layoutProps> = ({ children }) => {
  return <div className="container relative flex min-h-screen">{children}</div>
}

export default Layout
