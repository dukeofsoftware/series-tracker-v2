import { cn } from '@/lib/utils'
import { FC } from 'react'
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai'
import { buttonVariants } from './ui/button'
import { Separator } from './ui/separator'
import Link from 'next/link'
interface FooterProps {
    messages: any
}

const Footer: FC<FooterProps> = ({ messages }) => {

    const socialLinks = [
        {
            name: 'Github',
            url: "https://github.com/dukeofsoftware/series-tracker-v2",
            icon: <AiFillGithub className="w-5 h-5 mr-2 text-black dark:text-white" />

        },
        {
            name: 'LinkedIn',
            url: "https://www.linkedin.com/in/furkan-emre-kozan/",
            icon: <AiFillLinkedin className="w-5 h-5 mr-2 text-black dark:text-white" />
        }

    ]
    const fastLinks = [
        {
            name: messages.footer.sss,
            url: "/faqs",

        },
        {
            name: messages.footer.contact,
            url: "/contact",

        },
        {
            name: messages.footer.about,
            url: "/about",
        }
    ]
    return <footer className='w-full h-72 bg-gray-950 p-8 grid grid-cols-2'>

        <div className='flex flex-col flex-wrap gap-2  items-center'>
            <h3 className='font-bold text-center'>
                {messages.footer.links}
            </h3>
            <Separator className='max-w-[180px]' />
            {fastLinks.map(({ name, url }) => (
                <Link href={url} className={cn(buttonVariants({ variant: "ghost" }),"max-w-[180px] w-full")}>
                    {name}
                </Link>
            ))}

        </div>
        <div className=' flex flex-col flex-wrap gap-2  items-center'>
            <h3 className='font-bold text-center'>
                {messages.footer.social}
            </h3>
            <Separator className='max-w-[180px]' />
            {socialLinks.map(({ name, url, icon }) => (
                <a href={url} className={cn(buttonVariants({ variant: "ghost" }), "max-w-[180px] w-full")}>
                    {icon}
                    {name}</a>
            ))}

        </div>
    </footer>
}

export default Footer