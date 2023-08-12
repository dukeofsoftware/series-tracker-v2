'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu"
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { signOut } from "firebase/auth";
import { AiOutlineLogout } from "react-icons/ai"
import { useAuth } from "@/components/providers/context"
import { useLoadingCallback } from "react-loading-hook"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation";
import { BiUser } from "react-icons/bi"
import { AiOutlineUnorderedList, AiFillHeart, AiFillSetting } from "react-icons/ai"
import Link from "next/link";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import { formatLanguage } from "@/lib/utils";
import { dictionary } from "@/content";
const UserDropdown = ({ }) => {
    const language = useLanguageStore(state => formatLanguage(state.language))
    const dropdownMenuArray = [
        {
            icon: <BiUser className="w-4 h-4 text-sky-500" />,
            text: dictionary[language].accountDropdown.profile,
            link: "/profile",

        },
        {
            icon: <AiOutlineUnorderedList className="w-4 h-4" />,
            text: dictionary[language].accountDropdown.myLists,
            link: "/profile",

        },
        {
            icon: <AiFillHeart className="w-4 h-4 text-red-500" />,
            text: dictionary[language].accountDropdown.favorites,
            link: "/profile",

        },
        {
            icon: <AiFillSetting className="text-grey-700 w-4 h-4" />,
            text: dictionary[language].accountDropdown.settings,
            link: "/profile/settings",
        },


    ]
    const { getFirebaseAuth } = useFirebaseAuth();
    const router = useRouter()
    const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
        const auth = getFirebaseAuth();
        await signOut(auth);
        await fetch("/api/logout", {
            method: "GET",
        });
        router.back()
    });
    const { user } = useAuth();
    if (!user) return null
    return <>
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 font-bold">
                <Avatar>
                    <AvatarFallback>
                        {user.displayName ? user?.displayName[0] : user?.email![0]}
                    </AvatarFallback>
                    <AvatarImage
                        src={user?.photoURL!}
                        alt={user?.displayName!}

                    />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{dictionary[language].accountDropdown.dropdownTitle}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    dropdownMenuArray.map((item) => (
                        <DropdownMenuItem className="" key={item.text}>
                            <Link href={item.link} className="gap-2 flex items-center w-full h-full">
                                {item.icon}
                                {item.text}
                            </Link>
                        </DropdownMenuItem>
                    ))
                }
                <DropdownMenuItem disabled={isLogoutLoading} onClick={async () => {
                    await handleLogout()

                }} className="text-red-500 gap-2 hover:text-red-500 active:text-red-500 cursor-pointer" role="button">
                    <AiOutlineLogout className=" w-4 h-4" />
                    {dictionary[language].accountDropdown.logout}

                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}

export default UserDropdown