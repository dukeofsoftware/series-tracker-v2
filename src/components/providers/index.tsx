"use client"

import { FC, useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import dynamic from "next/dynamic"
const ReactQueryDevtools = dynamic(() => import("@tanstack/react-query-devtools").then((mod) => mod.ReactQueryDevtools), { ssr: false })

import { ThemeProvider } from "next-themes"
import { NextIntlClientProvider } from "next-intl"
import { formatLanguage } from "@/lib/utils"


interface ProvidersProps {
  children: React.ReactNode
  lang: string
  messages: any
}
const queryClient = new QueryClient()

const Providers: FC<ProvidersProps> = ({ children, lang, messages }) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) return null
  return (
    <>
      <NextIntlClientProvider locale={formatLanguage(lang)} messages={messages} >

        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" enableSystem >

            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>

        </QueryClientProvider>
      </NextIntlClientProvider>

    </>
  )
}

export default Providers
