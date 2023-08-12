"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { dictionary } from "@/content"
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth"
import { useLanguageStore } from "@/hooks/useLanguageStore"
import { signOut } from "firebase/auth"
import {
  AiFillHeart,
  AiFillSetting,
  AiOutlineLogout,
  AiOutlineUnorderedList,
} from "react-icons/ai"
import { BiUser } from "react-icons/bi"
import { useLoadingCallback } from "react-loading-hook"

import { formatLanguage } from "@/lib/utils"
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

const UserDropdown = ({}) => {
  const language = useLanguageStore((state) => formatLanguage(state.language))
  const dropdownMenuArray = [
    {
      icon: <BiUser className="h-4 w-4 text-sky-500" />,
      text: dictionary[language].accountDropdown.profile,
      link: "/profile",
    },
    {
      icon: <AiOutlineUnorderedList className="h-4 w-4" />,
      text: dictionary[language].accountDropdown.myLists,
      link: "/profile",
    },
    {
      icon: <AiFillHeart className="h-4 w-4 text-red-500" />,
      text: dictionary[language].accountDropdown.favorites,
      link: "/profile",
    },
    {
      icon: <AiFillSetting className="text-grey-700 h-4 w-4" />,
      text: dictionary[language].accountDropdown.settings,
      link: "/profile/settings",
    },
  ]
  const { getFirebaseAuth } = useFirebaseAuth()
  const router = useRouter()
  const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
    const auth = getFirebaseAuth()
    await signOut(auth)
    await fetch("/api/logout", {
      method: "GET",
    })
    router.back()
  })
  const { user } = useAuth()
  if (!user) return null
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
            {dictionary[language].accountDropdown.dropdownTitle}
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
            disabled={isLogoutLoading}
            onClick={async () => {
              await handleLogout()
            }}
            className="cursor-pointer gap-2 text-red-500 hover:text-red-500 active:text-red-500"
            role="button"
          >
            <AiOutlineLogout className=" h-4 w-4" />
            {dictionary[language].accountDropdown.logout}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default UserDropdown
