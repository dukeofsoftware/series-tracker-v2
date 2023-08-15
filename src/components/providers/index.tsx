"use client"

import { FC, useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import dynamic from "next/dynamic"
const ReactQueryDevtools = dynamic(() => import("@tanstack/react-query-devtools").then((mod) => mod.ReactQueryDevtools), { ssr: false })

import { ThemeProvider } from "next-themes"


interface ProvidersProps {
  children: React.ReactNode
}
const queryClient = new QueryClient()

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) return null
  return (
    <>

      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" enableSystem >

          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>

      </QueryClientProvider>

    </>
  )
}

export default Providers
