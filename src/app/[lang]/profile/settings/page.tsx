import { FC } from "react"


import AccountTab from "@/components/settings/AccountTab"
import MailTab from "@/components/settings/MailTab"
import PasswordTab from "@/components/settings/PasswordTab"
import { getDictionary } from "@/lib/dictionary"

interface pageProps {
  params: {
    lang: "tr-TR" | "en-US" | "de-DE"
  }
}

const Page: FC<pageProps> = async ({ params }) => {
  const lang = await getDictionary(params.lang)

  return (
    <main className="container mt-6 flex flex-col gap-4">
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
