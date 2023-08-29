"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { getCollection, getDocument } from "@/lib/firebase/firestore"
import { useAuth } from "@/components/providers/context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import CreateChatButton from "./CreateChatButton"

const ChatSidebar = ({}) => {
  const [users, setUsers] = useState<any[]>([])

  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const getData = async () => {
    try {
      setIsLoading(true)
      const chats = await getCollection(`chats/${user?.uid}/chats`)
      const users = await Promise.all(
        chats.map(async (chat: any) => {
          const user = await getDocument(`users`, chat?.userId)
          return {
            ...user,
            chatId: chat?.chatId,
          }
        })
      )

      setUsers(users)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <aside className="w-full sm:fixed sm:left-3 sm:w-72">
      <Card className="min-h-[95vh] w-full rounded-md p-3">
        <div className="flex items-center justify-end py-2">
          <CreateChatButton />
        </div>
        <ScrollArea>
          <div className="flex flex-col gap-2">
            {isLoading && <div>Loading...</div>}
            {!isLoading &&
              users.map((user) => {
                return (
                  <Link
                    href={`/profile/chat/${user.chatId}`}
                    key={user.id}
                    className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-500/20 active:bg-gray-500/20"
                  >
                    <Avatar>
                      <AvatarFallback>{user.username[0]}</AvatarFallback>
                      <AvatarImage
                        src={user.photoURL || "/male.png"}
                        alt={user.username}
                      />
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h1 className="text-sm font-semibold">
                          {user?.username}
                        </h1>
                      </div>
                    </div>
                  </Link>
                )
              })}
          </div>
        </ScrollArea>
      </Card>
    </aside>
  )
}

export default ChatSidebar
