import { FC } from "react"

import { Locale } from "@/config/i18n.config"
import { getDictionary } from "@/lib/dictionary"
import ChatSidebar from "@/components/chat/ChatSidebar"

interface pageProps {
  params: {
    lang: Locale
  }
}

const page: FC<pageProps> = async ({ params }) => {
  const { pages } = await getDictionary(params.lang)
  return (
    <>
      <ChatSidebar />
      <div className="ml-72  hidden place-items-center sm:grid">
        <p className=" text-lg font-bold text-sky-500">{pages.chat.empty}</p>
      </div>
    </>
  )
}

export default page
