'use client'
import { v4 as uuidv4 } from 'uuid';
import { FC, useEffect, useState } from 'react'
import { Button, buttonVariants } from '../ui/button'
import { IoIosCreate } from 'react-icons/io'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils'
import { ScrollArea } from '../ui/scroll-area'
import { useDebounce } from 'use-debounce'
import { collection, getDocs } from 'firebase/firestore'
import { addData, db, getDocument } from '@/lib/firebase/firestore'
import { Card } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Input } from '../ui/input'
import { useAuth } from '../providers/context'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl';
interface CreateChatButtonProps { }

const CreateChatButton: FC<CreateChatButtonProps> = ({ }) => {
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
                userId: uid
            });
            await addData(`chats/${uid}/chats`, user.uid, {
                chatId: chatId,
                userId: user.uid
            });
            await addData(`chatRooms`, chatId, {
                messages: [],
                users: [user.uid, uid],
            })
            router.push(`/profile/chat/${chatId}`)
        } catch (error) {
            console.error(error)

        }
    }

    return <>
        <Dialog>
            <DialogTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>            <IoIosCreate className="w-5 h-5" />
            </DialogTrigger>
            <DialogContent>


                <DialogHeader>
                    <DialogTitle>{t("createRoom")}</DialogTitle>

                </DialogHeader>
                <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={
                        t("searchUser")
                    }
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
                                        <button onClick={
                                            () => handleCreateChat(username.uid)

                                        } className="w-full pr-5" >
                                            <Card className="m-2 flex items-center gap-2 p-2  w-full ">
                                                <Avatar>
                                                    <AvatarFallback>{username.username[0]}</AvatarFallback>
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



    </>
}

export default CreateChatButton