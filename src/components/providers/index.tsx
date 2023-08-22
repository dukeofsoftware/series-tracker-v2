"use client"

import { FC, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Analytics } from "@vercel/analytics/react"
import { NextIntlClientProvider } from "next-intl"
import { ThemeProvider } from "next-themes"

import { formatLanguage } from "@/lib/utils"

const ReactQueryDevtools = dynamic(
  () =>
    import("@tanstack/react-query-devtools").then(
      (mod) => mod.ReactQueryDevtools
    ),
  { ssr: false }
)

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
      <NextIntlClientProvider locale={formatLanguage(lang)} messages={messages}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" enableSystem>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
            <Analytics
              mode={
                process.env.NODE_ENV === "production"
                  ? "production"
                  : "development"
              }
              debug={process.env.NODE_ENV !== "production"}
            />
            
          </ThemeProvider>
        </QueryClientProvider>
      </NextIntlClientProvider>
    </>
  )
}

export default Providers
