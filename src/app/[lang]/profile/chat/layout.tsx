"use client"

import { FC } from 'react'

import ChatSidebar from "@/components/chat/ChatSidebar"

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
