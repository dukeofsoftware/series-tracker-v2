"use client"

import { FC } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"
import { Separator } from "./ui/separator"

interface FooterProps {
  messages: any
}

const Footer: FC<FooterProps> = ({ messages }) => {
  const pathname = usePathname()
  const socialLinks = [
    {
      name: "Github",
      url: "https://github.com/dukeofsoftware/series-tracker-v2",
      icon: (
        <AiFillGithub className="mr-2 h-5 w-5 text-black dark:text-white" />
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/furkan-emre-kozan/",
      icon: (
        <AiFillLinkedin className="mr-2 h-5 w-5 text-black dark:text-white" />
      ),
    },
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
    },
  ]
  if (pathname.startsWith("/profile/chat")) return null
  return (
    <footer className="mt-8 grid h-72 w-full grid-cols-2 bg-gray-950 p-8">
      <div className="flex flex-col flex-wrap items-center  gap-2">
        <h3 className="text-center font-bold">{messages.footer.links}</h3>
        <Separator className="max-w-[180px]" />
        {fastLinks.map(({ name, url }) => (
          <Link
            key={name}
            href={url}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full max-w-[180px]"
            )}
          >
            {name}
          </Link>
        ))}
      </div>

      <div className=" flex flex-col flex-wrap items-center  gap-2">
        <h3 className="text-center font-bold">{messages.footer.social}</h3>
        <Separator className="max-w-[180px]" />
        {socialLinks.map(({ name, url, icon }) => (
          <a
            key={name}
            href={url}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full max-w-[180px]"
            )}
          >
            {icon}
            {name}
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
