import { FC } from "react"

import { getDictionary } from "@/lib/dictionary"
import AccountTab from "@/components/settings/AccountTab"
import MailTab from "@/components/settings/MailTab"
import PasswordTab from "@/components/settings/PasswordTab"

interface pageProps {
  params: {
    lang: "tr-TR" | "en-US" | "de-DE"
  }
}

const Page: FC<pageProps> = async ({ params }) => {
  const lang = await getDictionary(params.lang)

  return (
    <main className="mx-2 mt-2 flex flex-col gap-4 sm:container md:mt-6">
      <h1 className="my-2 text-center text-2xl font-bold">
        {lang.pages.settings.title}
      </h1>
      <AccountTab />
      <MailTab />
      <PasswordTab />
    </main>
  )
}

export default Page
