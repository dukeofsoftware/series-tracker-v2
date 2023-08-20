"use client"

import { FC, useEffect, useState } from "react"
import Link from "next/link"

import { getCollection, getDocument } from "@/lib/firebase/firestore"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import FollowUser from "./FollowUser"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ScrollArea } from "./ui/scroll-area"

interface FollowInformationProps {
  userId: string
}
const FollowInformation: FC<FollowInformationProps> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [following, setIsFollowing] = useState<null | any>(null)

  const [followers, setIsFollowers] = useState<null | any>(null)
  const getFollow = async () => {
    try {
      const followersFB = await getCollection(`follow/${userId}/followers`)

      const followingFB = await getCollection(`follow/${userId}/following`)

      const formattedFollowing = await Promise.all(
        followersFB.map(async (item: { id: string }) => {
          const user = await getDocument(`users`, item.id).then((res) => {
            return {
              ...res,
              id: item.id,
            }
          })
          return user
        })
      )
      const formattedFollowers = await Promise.all(
        followingFB.map(async (item: { id: string }) => {
          const user = await getDocument(`users`, item.id).then((res) => {
            return {
              ...res,
              id: item.id,
            }
          })
          return user
        })
      )

      if (formattedFollowers.length === 0) {
        setIsFollowers(null)
      }
      if (formattedFollowing.length === 0) {
        setIsFollowing(null)
      }
      if (formattedFollowers.length !== 0) {
        setIsFollowers(formattedFollowers)
      }
      if (formattedFollowing.length !== 0) {
        setIsFollowing(formattedFollowing)
      }
      return
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getFollow()
  }, [])
  return (
    <div className="flex flex-col items-center justify-center ">
      {followers ? (
        <Dialog>
          <DialogTrigger className="text-sx italic underline">
            {followers?.length} Followers
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Followers</DialogTitle>
            </DialogHeader>
            <ScrollArea className="flex h-[380px] flex-col gap-2">
              {followers?.map(
                (item: {
                  id: string
                  username?: string
                  photoURL?: string
                  displayName?: string
                }) => (
                  <div className="flex  rounded-md border-2 p-2 hover:bg-slate-500/20">
                    <Link
                      href={`/profile/${item.id}`}
                      className="flex items-center  gap-2"
                    >
                      <Avatar>
                        <AvatarFallback>
                          {item?.username ? item.username[0] : "U"}
                        </AvatarFallback>
                        <AvatarImage
                          src={item?.photoURL || "/male.png"}
                          alt={item?.username || "user"}
                        />
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">
                          {item?.displayName}
                        </p>
                        <p className="text-xs text-slate-600  dark:text-slate-200">
                          {item?.username}
                        </p>
                      </div>
                    </Link>
                    <div className="ml-auto">
                      <FollowUser pageUserId={item.id} />
                    </div>
                  </div>
                )
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      ) : (
        <p className="text-sx italic underline">
          {followers?.length || 0} Followers
        </p>
      )}
      <pre></pre>
      {following ? (
        <Dialog>
          <DialogTrigger className="text-sx italic underline">
            {following?.length || 0} Following
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Following</DialogTitle>
            </DialogHeader>
            <ScrollArea className="flex h-[380px] flex-col gap-2">
              {following?.map(
                (item: {
                  id: string
                  username?: string
                  photoURL?: string
                  displayName?: string
                }) => (
                  <div className="flex  rounded-md border-2 p-2 hover:bg-slate-500/20">
                    <Link
                      href={`/profile/${item.id}`}
                      className="flex items-center  gap-2"
                    >
                      <Avatar>
                        <AvatarFallback>
                          {item?.username ? item.username[0] : "U"}
                        </AvatarFallback>
                        <AvatarImage
                          src={item?.photoURL || "/male.png"}
                          alt={item?.username || "user"}
                        />
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">
                          {item?.displayName}
                        </p>
                        <p className="text-xs text-slate-600  dark:text-slate-200">
                          {item?.username}
                        </p>
                      </div>
                    </Link>
                    <div className="ml-auto">
                      <FollowUser pageUserId={item.id} />
                    </div>
                  </div>
                )
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      ) : (
        <p className="text-sx italic underline">
          {following?.length || 0} Following
        </p>
      )}
    </div>
  )
}

export default FollowInformation
