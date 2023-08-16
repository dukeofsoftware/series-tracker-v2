'use client'

import { FC, useEffect, useState } from 'react'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import Link from 'next/link'
import { toast } from '../ui/use-toast'
import { useTranslations } from 'next-intl'
import { doc, onSnapshot } from "firebase/firestore"
import { db, getDocument } from "@/lib/firebase/firestore"
import { BiUser } from "react-icons/bi"

import {
    AiFillHeart,
    AiFillSetting,
    AiOutlineUnorderedList,
} from "react-icons/ai"
import { useAuth } from '../providers/context'
interface DropdownMenuItemsProps { }

const DropdownMenuItems: FC<DropdownMenuItemsProps> = ({ }) => {
    const { user } = useAuth()

    const t = useTranslations("navbar.accountDropdown")
    const global = useTranslations("global")
    const [localUsername, setLocalUsername] = useState<string | null>(null)
    const dropdownMenuArray = [
        {
            icon: <BiUser className="h-4 w-4 text-sky-500" />,
            text: t("profile"),
            link: `/profile/${localUsername}`,
        },
        {
            icon: <AiOutlineUnorderedList className="h-4 w-4" />,
            text: t("myLists"),
            link: "/profile",
        },
        {
            icon: <AiFillHeart className="h-4 w-4 text-red-500" />,
            text: t("favorites"),
            link: `/profile/${localUsername}/favorites`,
        },
        {
            icon: <AiFillSetting className="text-grey-700 h-4 w-4" />,
            text: t("settings"),
            link: "/profile/settings",
        },
    ]


    useEffect(() => {
        const getDataFB = async () => {
            if (!user?.uid) return
            const username = await getDocument(`/users`, user?.uid).then((doc) => {
                const username = doc?.username
                if (username) {
                    setLocalUsername(username)
                    return
                }
            }
            )
        }
        getDataFB()
    }, [])

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, `/users/${user?.uid}`), (doc) => {
            const username = doc.data()?.username
            if (username) {
                setLocalUsername(username)
                return
            }
        })
        return () => {
            unsubscribe
        }
    }, [])

    return (
        <>
            {
                dropdownMenuArray.map((item) => {

                    if (!localUsername) {
                        if (item.link === "/profile/settings") {
                            return <DropdownMenuItem className="p-0" key={item.text}>
                                <Link
                                    href={item.link}
                                    className="flex h-full w-full items-center gap-2   hover:bg-accent hover:text-accent-foreground rounded-md p-2"
                                >
                                    {item.icon}
                                    {item.text}
                                </Link>
                            </DropdownMenuItem>
                        }
                        return <DropdownMenuItem className="p-0" key={item.text}>
                            <button
                                onClick={() => {
                                    toast({
                                        title: global("toast.firebase.usernameProvideTitle"),
                                        description: global("toast.firebase.usernameProvide"),
                                    })
                                }}
                                className="flex h-full w-full items-center gap-2 line-through	 hover:bg-accent  hover:text-accent-foreground rounded-md p-2"
                            >
                                {item.icon}
                                {item.text}
                            </button>
                        </DropdownMenuItem>
                    }

                    return <DropdownMenuItem className="p-0" key={item.text}>
                        <Link
                            href={item.link}
                            className="flex h-full w-full items-center gap-2 	 hover:bg-accent  hover:text-accent-foreground rounded-md p-2"
                        >
                            {item.icon}
                            {item.text}
                        </Link>
                    </DropdownMenuItem>
                })
            }
        </>
    )


}

export default DropdownMenuItems