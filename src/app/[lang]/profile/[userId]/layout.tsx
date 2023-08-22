
import { db } from "@/lib/firebase/admin"

import Image from "next/image"
import Link from "next/link"
import FollowInformation from "@/components/FollowInformation"
import FollowUser from "@/components/FollowUser"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: {
    userId: string
  }
}): Promise<Metadata> {
  const user = (await db.collection("users").doc(params.userId).get()).data()


  return {
    title: user?.displayName || user?.username,
    description: "User profile",
    keywords: "User profile",
    "og:title": user?.displayName || user?.username,
    "og:description": "User profile",
    "twitter:title": user?.displayName || user?.username,
    "twitter:description": "User profile",
    "og:image": user?.photoURL,
    "twitter:image": user?.photoURL,
    "og:image:alt": user?.displayName || user?.username,
    "twitter:image:alt": user?.displayName || user?.username,
    "og:type": "website",
    "twitter:card": "summary_large_image",


  } as Metadata
}

  

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { userId: string }
}) {
  const user = (await db.collection("users").doc(params.userId).get()).data()
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
          {tabs.map((tab) => {

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
          })
          }

        </ul>
      </div>

      {children}
    </div>
  )
}

