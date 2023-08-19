import Navbar from "@/components/navbar"
import Providers from "@/components/providers"

import "@/styles/globals.css"
import { Locale, i18n } from '@/config/i18n.config'

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ServerAuthProvider } from "@/components/providers/server-auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { formatLanguage } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}


export const metadata: Metadata = {
  title: "Tracker",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children,
  params: {
    lang
  }
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {


  let messages;
  try {
    messages = (await import(`@/content/${formatLanguage(lang)}.json`)).default;
  } catch (error) {
    console.error(error);
    messages = (await import(`@/content/${formatLanguage("en")}.json`)).default;

  }
  return (
    <html lang={formatLanguage(lang)}>
      <body
        className={`${inter.className} ${process.env.NODE_ENV !== "production" && "debug-screens"
          } dark:bg-slate-900 dark:text-slate-50 bg-slate-50 text-slate-900 `}
      >

        <ServerAuthProvider>

          <Providers lang={lang} messages={messages}>
            <Navbar />
            {children}
            <Toaster />
          </Providers>
        </ServerAuthProvider>

      </body>
    </html>
  )
}
