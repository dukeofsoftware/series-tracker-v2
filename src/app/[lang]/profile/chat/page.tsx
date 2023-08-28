import ChatSidebar from '@/components/chat/ChatSidebar'
import { Locale } from '@/config/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { FC } from 'react'

interface pageProps {
  params: {
    lang: Locale
  }
}

const page: FC<pageProps> = async ({ params }) => {
  const { pages } = await getDictionary(params.lang)
  return <>
    <ChatSidebar />
    <div className='ml-72  place-items-center hidden sm:grid'>
      <p className=' text-sky-500 font-bold text-lg'>
        {pages.chat.empty}
      </p>
    </div>
  </>
}

export default page