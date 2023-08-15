"use client"

import Link from "next/link"
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth"
import { signOut } from "firebase/auth"
import {
  AiFillHeart,
  AiFillSetting,
  AiOutlineLogout,
  AiOutlineUnorderedList,
} from "react-icons/ai"
import { BiUser } from "react-icons/bi"

import { useAuth } from "@/components/providers/context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "../ui/use-toast"

const UserDropdown = ({ }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const t = useTranslations("navbar.accountDropdown")
  const global = useTranslations("global")
  if (!user) return null
  const dropdownMenuArray = [
    {
      icon: <BiUser className="h-4 w-4 text-sky-500" />,
      text: t("profile"),
      link: "/profile",
    },
    {
      icon: <AiOutlineUnorderedList className="h-4 w-4" />,
      text: t("myLists"),
      link: "/profile",
    },
    {
      icon: <AiFillHeart className="h-4 w-4 text-red-500" />,
      text: t("favorites"),
      link: `/profile/${user?.uid}/favorites`,
    },
    {
      icon: <AiFillSetting className="text-grey-700 h-4 w-4" />,
      text: t("settings"),
      link: "/profile/settings",
    },
  ]
  const { getFirebaseAuth } = useFirebaseAuth()
  const handleLogOut = async () => {
    try {
      setLoading(true)
      const auth = getFirebaseAuth();
      await signOut(auth);
      await fetch("/api/logout", {
        method: "GET",
      });
      setLoading(false)
      window.location.reload();
    } catch (error: any) {
      console.error(error)
      toast({
        title: global("toast.error", {
          code: error.code,
        }),
        description: error.message,
        variant: "destructive",
      });
    }

  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 font-bold">
          <Avatar>
            <AvatarFallback>
              {user.displayName ? user?.displayName[0] : user?.email![0]}
            </AvatarFallback>
            <AvatarImage src={user?.photoURL!} alt={user?.displayName!} />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            {t("dropdownTitle")}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {dropdownMenuArray.map((item) => (
            <DropdownMenuItem className="" key={item.text}>
              <Link
                href={item.link}
                className="flex h-full w-full items-center gap-2"
              >
                {item.icon}
                {item.text}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem
            disabled={loading}
            onClick={async () => {
              await handleLogOut()
            }}
            className="cursor-pointer gap-2 text-red-500 hover:text-red-500 active:text-red-500"
            role="button"
          >
            <AiOutlineLogout className=" h-4 w-4" />
            {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default UserDropdown
