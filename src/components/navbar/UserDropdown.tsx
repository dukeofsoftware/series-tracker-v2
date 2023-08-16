"use client"

import { useFirebaseAuth } from "@/hooks/useFirebaseAuth"
import { signOut } from "firebase/auth"


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
import { toast } from "../ui/use-toast"
import {   useState } from "react"
import { AiOutlineLogout } from "react-icons/ai"
import DropdownMenuItems from "./DropdownMenuItems"

const UserDropdown = ({ }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const t = useTranslations("navbar.accountDropdown")
  const global = useTranslations("global")
  if (!user) return null




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
          <DropdownMenuItems />
          <DropdownMenuItem
            disabled={loading}
            onClick={async () => {
              await handleLogOut()
            }}
            className="cursor-pointer gap-2 text-red-500 hover:text-red-500 active:text-red-500 flex h-full w-full items-center   hover:bg-red-800/30 active:bg-red-800/30  rounded-md p-2"
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
