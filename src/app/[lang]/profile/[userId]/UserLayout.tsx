"use client"

import { FC, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound, usePathname } from "next/navigation"

import { getDocument } from "@/lib/firebase/firestore"
import FollowInformation from "@/components/FollowInformation"
import FollowUser from "@/components/FollowUser"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserLayoutProps {
  params: {
    userId: string
  }
  children: React.ReactNode
}

const UserLayout: FC<UserLayoutProps> = ({ params, children }) => {
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
      name: "All",
      href: `/profile/${params.userId}`,
    },
    {
      name: "Favorites",
      href: `/profile/${params.userId}/favorites`,
    },
  ]
  return (
    <div className="container">
      <div className="relative h-[520px] text-slate-50 ">
        <Image
          src={`/background.svg`}
          alt={"background"}
          fill
          className=" object-cover"
        />
        <div className="absolute bottom-5 left-6 z-30 flex flex-wrap items-center gap-2">
          <Avatar className="h-[60px] w-[60px] border-2 border-black bg-white dark:border-white dark:bg-black sm:h-[100px] sm:w-[100px]">
            <AvatarFallback>
              {user?.displayName ? user.displayName[0] : "U"}
            </AvatarFallback>
            <AvatarImage src={user?.photoURL} />
          </Avatar>
          <div className="flex flex-col gap-2">
            {user?.displayName && (
              <h1 className="texlxl font-semibold sm:text-3xl">
                {user.displayName}
              </h1>
            )}
            <p className="text-sm font-medium">{user?.username}</p>
          </div>
          <FollowUser pageUserId={params.userId} />
          <FollowInformation userId={params.userId} />
        </div>
      </div>
      <div className="z-30 flex w-full items-center  ">
        <ul className="flex w-full  rounded-md border-2 border-slate-950 dark:border-slate-50 ">
          {tabs.map((tab,index) => {
            if (pathname === tab.href) {
              return (
                <li
                  key={tab.name}
                  className="w-full grow   bg-sky-400 hover:bg-sky-600"
                >
                  <Link
                    href={tab.href}
                    className=" flex items-center justify-center p-2"
                  >
                    {tab.name}
                  </Link>
                </li>
              )
            } else {
              return (
                <li
                  key={tab.name}
                  className="w-full grow   bg-sky-500 hover:bg-sky-600"
                >
                  <Link
                    href={tab.href}
                    className=" flex h-full w-full items-center justify-center p-2"
                  >
                    {tab.name}
                  </Link>
                </li>
              )
            }
          })}
        </ul>
      </div>

      {children}
    </div>
  )
}

export default UserLayout
