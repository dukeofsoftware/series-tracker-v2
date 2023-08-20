"use client"

import { FC } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { AiFillHeart, AiFillSetting } from "react-icons/ai"
import { BiUser } from "react-icons/bi"

import { useAuth } from "../providers/context"
import { DropdownMenuItem } from "../ui/dropdown-menu"
import { toast } from "../ui/use-toast"

interface DropdownMenuItemsProps {}

const DropdownMenuItems: FC<DropdownMenuItemsProps> = ({}) => {
  const { user } = useAuth()

  const t = useTranslations("navbar.accountDropdown")
  const global = useTranslations("global")
  const dropdownMenuArray = [
    {
      icon: <BiUser className="h-4 w-4 text-sky-500" />,
      text: t("profile"),
      link: `/profile/${user?.uid}`,
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

  return (
    <>
      {dropdownMenuArray.map((item) => {
        if (!user?.uid) {
          if (item.link === "/profile/settings") {
            return (
              <DropdownMenuItem className="p-0" key={item.text}>
                <Link
                  href={item.link}
                  className="flex h-full w-full items-center gap-2   rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                >
                  {item.icon}
                  {item.text}
                </Link>
              </DropdownMenuItem>
            )
          }
          return (
            <DropdownMenuItem className="p-0" key={item.text}>
              <button
                onClick={() => {
                  toast({
                    title: global("toast.firebase.usernameProvideTitle"),
                    description: global("toast.firebase.usernameProvide"),
                  })
                }}
                className="flex h-full w-full items-center gap-2 rounded-md	 p-2  line-through hover:bg-accent hover:text-accent-foreground"
              >
                {item.icon}
                {item.text}
              </button>
            </DropdownMenuItem>
          )
        }

        return (
          <DropdownMenuItem className="p-0" key={item.text}>
            <Link
              href={item.link}
              className="flex h-full w-full items-center gap-2 	 rounded-md  p-2 hover:bg-accent hover:text-accent-foreground"
            >
              {item.icon}
              {item.text}
            </Link>
          </DropdownMenuItem>
        )
      })}
    </>
  )
}

export default DropdownMenuItems
