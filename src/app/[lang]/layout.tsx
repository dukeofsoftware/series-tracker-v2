import Navbar from "@/components/navbar"
import Providers from "@/components/providers"

import "@/styles/globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { i18n, Locale } from "@/config/i18n.config"
import { formatLanguage } from "@/lib/utils"
import Footer from "@/components/Footer"
import { ServerAuthProvider } from "@/components/providers/server-auth-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const messages = (
    await import(`@/content/${formatLanguage(params.lang)}.json`)
  ).default

  return {
    title: {
      template: `%s | ${messages.seo.mainLayout.title}`,
      default: messages.seo.mainLayout.title,
    },
    applicationName: messages.seo.title,
    description: messages.seo.mainLayout.description,

    keywords: messages.seo.mainLayout.keywords,
    "color-scheme": "dark light",
    creator: "Furkan Emre Kozan",
    authors: [
      {
        name: "Furkan Emre Kozan",
        url: "https://furkan-emre-kozan.vercel.app",
      },
    ],
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en-US",
        "de-DE": "/de-DE",
        "tr-TR": "/tr-TR",
      },
    },
    manifest:"/manifest.json",
    icons:{
      src:"/assets/icons/icon-192x192.png",
    },
    publisher: "vercel",
  } as Metadata
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  let messages
  try {
    messages = (await import(`@/content/${formatLanguage(lang)}.json`)).default
  } catch (error) {
    console.error(error)
    messages = (await import(`@/content/${formatLanguage("en")}.json`)).default
  }
  return (
    <html lang={formatLanguage(lang)}>
      <body
        className={`${inter.className} ${
          process.env.NODE_ENV !== "production" && "debug-screens"
        } bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50 `}
      >
        <ServerAuthProvider>
          <Providers lang={lang} messages={messages}>
            <div className="flex h-full w-full flex-col">
              <Navbar />
              <div className="min-h-screen grow">{children}</div>
              <Footer messages={messages} />
            </div>
            <Toaster />
          </Providers>
        </ServerAuthProvider>
      </body>
    </html>
  )
}
