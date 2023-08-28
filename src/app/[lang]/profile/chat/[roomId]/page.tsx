import { FC } from "react"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens"

import { authConfig } from "@/config/server-config"
import { db } from "@/lib/firebase/admin"
import MessageBar from "@/components/chat/MessageBar"
import Messages from "@/components/chat/Messages"
import Topbar from "@/components/chat/Topbar"

interface pageProps {
  params: {
    roomId: string
  }
}
export const revalidate = 0
const page: FC<pageProps> = async ({ params: { roomId } }) => {
  const currentUser = await getTokens(cookies(), authConfig)
  if (!currentUser) return notFound()
  const currentUserId = currentUser.decodedToken.uid

  const messages = await db
    .collection(`chatRooms/${roomId}/messages`)
    .get()
    .then((querySnapshot) => {
      const messages: any = []
      querySnapshot.forEach((doc) => {
        messages.push(doc.data())
      })
      return messages
    })
  /* sort */
  messages.sort((a: any, b: any) => {
    return a.created_at - b.created_at
  })
  /* format date to string */
  messages.forEach((message: any) => {
    message.created_at = message.created_at.toDate().toString()
  })

  const room = (await db.collection("chatRooms").doc(roomId).get()).data()

  if (!room) return notFound()

  const users = room.users as any

  if (!users.includes(currentUserId)) return notFound()

  const otherUser = users.filter((user: string) => {
    return user !== currentUserId
  })

  const user = (
    await db.collection("users").doc(otherUser[0]).get()
  ).data() as {
    username: string
    displayName?: string
    photoURL?: string
  }
  if (!user) return notFound()

  return (
    <div className="relative w-full">
      <Topbar user={user} />
      <Messages user={user} serverMessages={messages} roomId={roomId} />
      <MessageBar roomId={roomId} />
    </div>
  )
}

export default page
