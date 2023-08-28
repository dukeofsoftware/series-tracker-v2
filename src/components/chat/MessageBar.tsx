"use client"

import { FC, useRef } from "react"
import { notFound } from "next/navigation"
import { v4 as uuidv4 } from "uuid"

import { addData } from "@/lib/firebase/firestore"
import { useAuth } from "../providers/context"
import { Button } from "../ui/button"

interface MessageBarProps {
  roomId: string
}

const MessageBar: FC<MessageBarProps> = ({ roomId }) => {
  const { user } = useAuth()
  if (!user) return notFound()
  const ref = useRef<HTMLInputElement>(null)

  /* send message */
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!ref.current?.value) return
    await addData(`chatRooms/${roomId}/messages`, uuidv4(), {
      senderId: user?.uid,
      created_at: new Date(),
      message: ref.current?.value,
    })
    ref.current.value = ""
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-center">
      <form
        className="flex h-16  w-full max-w-xl items-center justify-center   gap-2 px-4 py-2"
        onSubmit={sendMessage}
      >
        <input
          ref={ref}
          className="h-full w-full rounded-md border 
border-gray-200 bg-slate-200       px-2  py-1  text-slate-950 dark:bg-slate-950 dark:text-white"
          type="text"
          placeholder="Type a message"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}

export default MessageBar
