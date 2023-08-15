"use client"
import { FC, useEffect } from "react"

import { formatLanguage } from "@/lib/utils"
import AccountTab from "@/components/settings/AccountTab"
import MailTab from "@/components/settings/MailTab"
import PasswordTab from "@/components/settings/PasswordTab"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers/context"
import {useTranslations} from 'next-intl';

interface pageProps {
  params: {
    lang: string
  }
}

const Page: FC<pageProps> = async ({ params }) => {

  return (
    <main className="container mt-6 flex flex-col gap-4">
      <h1 className="my-2 text-center text-2xl font-bold">

      </h1>
      <AccountTab  />
      <MailTab  />
      <PasswordTab  />
    </main>
  )
}

export default Page
