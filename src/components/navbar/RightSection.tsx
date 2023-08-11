'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BiUser } from "react-icons/bi"
import { AiOutlineUnorderedList, AiFillHeart, AiFillSetting, AiOutlineLogout, AiOutlineLoading3Quarters } from "react-icons/ai"

import Link from "next/link"

import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { signOut } from "firebase/auth";
import { useAuth } from "../providers/context"
import { buttonVariants } from "../ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useLoadingCallback } from "react-loading-hook"
const RightSection = ({ }) => {
    const router = useRouter();
    const { user } = useAuth();
    const { getFirebaseAuth } = useFirebaseAuth();
    const [hasLoggedOut, setHasLoggedOut] = useState(false);
    const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
        const auth = getFirebaseAuth();
        await signOut(auth);
        setHasLoggedOut(true);
        await fetch("/api/logout", {
            method: "GET",
        });
        router.push("/")
    });




    const dropdownMenuArray = [
        {
            icon: <BiUser className="w-4 h-4 text-sky-500" />,
            text: "Profile",
            link: "/profile",

        },
        {
            icon: <AiOutlineUnorderedList className="w-4 h-4" />,
            text: "My lists",
            link: "/profile",

        },
        {
            icon: <AiFillHeart className="w-4 h-4 text-red-500" />,
            text: "Favorites",
            link: "/profile",

        },
        {
            icon: <AiFillSetting className="text-grey-700 w-4 h-4" />,
            text: "Settings",
            link: "/profile/settings",
        },


    ]
    return <>

        {user ? <div>
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
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
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

                    }} className="text-red-500 gap-2 hover:text-red-500 active:text-red-500">
                        <AiOutlineLogout className=" w-4 h-4" />
                        Log out

                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div> : <div className="flex items-center justify-end gap-2">
            <Link href='/login' className={buttonVariants({ variant: "outline" })}>
                Sign In
            </Link>
            <Link href='/register' className={buttonVariants()}>
                Register
            </Link>
        </div>
        }
    </>
}

export default RightSection