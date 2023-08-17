"use client"
import { getDocument } from "@/lib/firebase/firestore"
import { useEffect, useState } from "react"

import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { notFound, usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function Layout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { userId: string }
}) {
    const { theme } = useTheme()
    const [user, setUser] = useState<any>(null)
    const pathname = usePathname()
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getDocument("users", params.userId)
            if (!user) return notFound()
            setUser({
                ...user,
            })
        }
        fetchUser()
    }, [params.userId])

    const tabs = [
        {
            name: "Favorites",
            href: `/profile/${params.userId}/favorites`,

        },
        {
            name: "Lists",
            href: `/profile/${params.userId}/lists`
        },

    ]
    return (
        <div className="container">
            <div className='max-h-[520px] h-full relative -z-10'>

                <AspectRatio ratio={33 / 20} className='pb-0 max-h-[520px] '>
                    <Image
                        src={
                            theme === "dark" ?
                                `/background.svg` :
                                `/white-background.svg`}
                        alt={"background"}
                        fill
                        className='object-cover'
                    />

                </AspectRatio>
                <div className="flex gap-2 items-center z-10 absolute bottom-5 left-6">
                    <Avatar className="sm:w-[100px] sm:h-[100px] w-[60px] h-[60px] dark:bg-black border-2 dark:border-white bg-white border-black">
                        <AvatarFallback>
                            {user?.displayName ? user.displayName[0] : "U"}
                        </AvatarFallback>
                        <AvatarImage src={user?.photoURL} />
                    </Avatar>
                    <div className="flex flex-col gap-2">
                        {user?.displayName && <h1 className="sm:text-3xl texlxl font-semibold">
                            {user.displayName}</h1>}
                        <p className="text-sm font-medium">
                            {user?.username}
                        </p>

                    </div>

                </div>
            </div>
            <div className="flex items-center w-full  ">
                <ul className="flex border-2  w-full border-slate-950 dark:border-slate-50 rounded-md ">
                    {tabs.map((tab) => {
                        if (pathname === tab.href) {
                            return (<li key={tab.name} className="grow w-full   bg-sky-400 hover:bg-sky-600">

                                <Link href={tab.href} className=" p-2 flex items-center justify-center">
                                    {tab.name}
                                </Link>
                            </li>)
                        }
                        else {
                            return (
                                <li key={tab.name} className="grow w-full   bg-sky-500 hover:bg-sky-600">

                                    <Link href={tab.href} className=" h-full w-full p-2 flex items-center justify-center">
                                        {tab.name}
                                    </Link>
                                </li>
                            )
                        }
                    }

                    )}
                </ul>


            </div>


            {children}

        </div>

    )
}
