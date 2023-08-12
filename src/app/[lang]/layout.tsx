import Navbar from "@/components/navbar"
import Providers from "@/components/providers"

import "@/styles/globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { defaultLocale } from "@/middlewares/MultiLanguageMiddleware"

import { ServerAuthProvider } from "@/components/providers/server-auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tracker",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children,
  authModal,
  params,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang ?? defaultLocale}>
      <body
        className={`${inter.className} ${
          process.env.NODE_ENV !== "production" && "debug-screens"
        }`}
      >
        <ServerAuthProvider>
          <Providers>
            <Navbar />
            {authModal}
            {children}
          </Providers>
        </ServerAuthProvider>
      </body>
    </html>
  )
}
