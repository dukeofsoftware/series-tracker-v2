"use client"

import { FC } from "react"
import { dictionary } from "@/content"

import { formatLanguage } from "@/lib/utils"
import AccountTab from "@/components/settings/AccountTab"
import MailTab from "@/components/settings/MailTab"
import PasswordTab from "@/components/settings/PasswordTab"

interface pageProps {
  params: {
    lang: string
  }
}

const Page: FC<pageProps> = ({ params }) => {
  const language = formatLanguage(params.lang)

  return (
    <main className="container mt-6 flex flex-col gap-4">
      <h1 className="my-2 text-center text-2xl font-bold">
        {dictionary[language].settings?.title}
      </h1>
      <AccountTab language={language} />
      <MailTab language={language} />
      <PasswordTab language={language} />
    </main>
  )
}

export default Page
