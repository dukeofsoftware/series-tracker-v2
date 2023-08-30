"use client"

import { FC, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Analytics } from "@vercel/analytics/react"
import { NextIntlClientProvider } from "next-intl"
import { ThemeProvider } from "next-themes"

import { formatLanguage } from "@/lib/utils"
import { TrpcProvider } from "./TrpcProvider"



interface ProvidersProps {
  children: React.ReactNode
  lang: string
  messages: any
}

const Providers: FC<ProvidersProps> = ({ children, lang, messages }) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) return null
  return (
    <>
      <NextIntlClientProvider locale={formatLanguage(lang)} messages={messages}>
        <TrpcProvider>

          <ThemeProvider attribute="class" enableSystem>
            {children}
            <Analytics
              mode={
                process.env.NODE_ENV === "production"
                  ? "production"
                  : "development"
              }
              debug={process.env.NODE_ENV !== "production"}
            />
          </ThemeProvider>
        </TrpcProvider>

      </NextIntlClientProvider>
    </>
  )
}

export default Providers
