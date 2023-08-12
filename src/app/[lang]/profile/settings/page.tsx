"use client"
import AccountTab from "@/components/settings/AccountTab"
import MailTab from "@/components/settings/MailTab"
import PasswordTab from "@/components/settings/PasswordTab"
import { dictionary } from "@/content"
import { formatLanguage } from "@/lib/utils"

import { FC } from 'react'

interface pageProps {

  params: {
    lang: string
  }

}

const Page: FC<pageProps> = ({ params }) => {
  const language = formatLanguage(params.lang)

  return <main className='container flex flex-col gap-4 mt-6'>
    <h1 className="text-center text-2xl my-2 font-bold">
      {dictionary[language].settings?.title}
    </h1>
    <AccountTab language={language} />
    <MailTab language={language} />
    <PasswordTab language={language} />

  </main>
}

export default Page