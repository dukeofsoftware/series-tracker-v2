"use client"

import { FC } from "react"
import Link from "next/link"
import { BsChevronDoubleLeft } from "react-icons/bs"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { buttonVariants } from "../ui/button"

interface TopbarProps {
  user: {
    username: string
    displayName?: string
    photoURL?: string
  }
}

const Topbar: FC<TopbarProps> = ({ user }) => {
  return (
    <div className="h-18 sticky top-4 z-30 flex w-full items-center gap-2 rounded-md bg-slate-200 p-2 py-4 text-black dark:bg-black dark:text-white">
      <Link
        href={`/profile/chat`}
        className={cn(buttonVariants({ size: "icon" }))}
      >
        <BsChevronDoubleLeft className="h-5 w-5" />
      </Link>
      <Avatar>
        <AvatarFallback>
          {user.displayName ? user.displayName[0] : user.username[0]}
        </AvatarFallback>
        <AvatarImage
          src={user.photoURL || "/male.png"}
          alt={user.displayName || user.username}
        />
      </Avatar>
      <p className=" text-lg font-semibold">
        {user.displayName || user.username}
      </p>
    </div>
  )
}

export default Topbar
