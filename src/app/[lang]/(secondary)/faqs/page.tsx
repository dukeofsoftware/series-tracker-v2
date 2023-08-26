
import { FC } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/config/i18n.config'
interface pageProps {
    params: {
        lang: Locale
    }
}
interface QuestionType {
    question: string
    answer: string
}

const Page: FC<pageProps> = async ({ params: { lang } }) => {
    const { pages } = await getDictionary(lang) as any
    return <main className='container mt-5 max-w-3xl'>
        <h1 className='text-center text-2xl font-bold'>{pages.faqs.title}</h1>
        <div className='flex flex-col gap-4'>
            {pages.faqs.questions.map((question: QuestionType, index: number) => {
                return <Accordion key={index} collapsible type='single'>
                    <AccordionItem value={question.question}>
                        <AccordionTrigger>
                            <h3 className='sm:text-lg'>{question.question}</h3>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className=''>{question.answer}</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            }
            )}
        </div>
    </main>
}

export default Page