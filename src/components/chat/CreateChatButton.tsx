"use client"

import { FC, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { collection, getDocs } from "firebase/firestore"
import { useTranslations } from "next-intl"
import { IoIosCreate } from "react-icons/io"
import { useDebounce } from "use-debounce"
import { v4 as uuidv4 } from "uuid"

import { addData, db, getDocument } from "@/lib/firebase/firestore"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/components/providers/context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {  buttonVariants } from "../ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CreateChatButtonProps {}

const CreateChatButton: FC<CreateChatButtonProps> = ({}) => {
  const t = useTranslations("pages.chat")
  const [text, setText] = useState("")
  const [usernames, setUsernames] = useState<any>([])
  const [value] = useDebounce(text, 500)
  const router = useRouter()
  const [filteredUsernames, setFilteredUsernames] = useState<any>(null)
  const { user } = useAuth()
  const getUsernames = async () => {
    const ref = collection(db, `usernames`)
    const usernames = await getDocs(ref)
    const usernamesData = usernames.docs.map((doc) => {
      return {
        username: doc.id,
        ...doc.data(),
      }
    })
    setUsernames(usernamesData)
    setFilteredUsernames(usernamesData)
    return usernamesData
  }

  useEffect(() => {
    getUsernames()
  }, [])
  useEffect(() => {
    if (value.length > 0) {
      const filteredUsernames = usernames.filter((username: any) => {
        return username.username.toLowerCase().includes(value.toLowerCase())
      })
      setFilteredUsernames(filteredUsernames)
    } else {
      setFilteredUsernames(usernames)
    }
  }, [value])

  const handleCreateChat = async (uid: string) => {
    try {
      if (!user) return
      const data = await getDocument(`chats/${user.uid}/chats`, uid)
      if (data) {
        router.push(`/profile/chat/${data.chatId}`)
        return
      }
      const chatId = uuidv4()

      await addData(`chats/${user.uid}/chats`, uid, {
        chatId: chatId,
        userId: uid,
      })
      await addData(`chats/${uid}/chats`, user.uid, {
        chatId: chatId,
        userId: user.uid,
      })
      await addData(`chatRooms`, chatId, {
        messages: [],
        users: [user.uid, uid],
      })
      router.push(`/profile/chat/${chatId}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (<Dialog>
        <DialogTrigger
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
        >
          {" "}
          <IoIosCreate className="h-5 w-5" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("createRoom")}</DialogTitle>
          </DialogHeader>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("searchUser")}
          />
          <ScrollArea className="flex h-[380px] flex-col gap-2">
            <ul>
              {filteredUsernames && filteredUsernames?.length > 0 ? (
                filteredUsernames.map((username: any) => {
                  if (username.uid === user?.uid) {
                    return
                  }

                  return (
                    <li key={username.username}>
                      <button
                        onClick={() => handleCreateChat(username.uid)}
                        className="w-full pr-5"
                      >
                        <Card className="m-2 flex w-full items-center gap-2  p-2 ">
                          <Avatar>
                            <AvatarFallback>
                              {username.username[0]}
                            </AvatarFallback>
                            <AvatarImage
                              src={username.photoURL || "/male.png"}
                              alt={username.username}
                            />
                          </Avatar>
                          {username.username}
                        </Card>
                      </button>
                    </li>
                  )
                })
              ) : (
                <div>No results</div>
              )}
            </ul>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    
  )
}

export default CreateChatButton
