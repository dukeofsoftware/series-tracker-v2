'use client'

import { FC, useEffect, useState } from 'react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { AiOutlineUserDelete } from 'react-icons/ai'
import { Button } from './ui/button'
import { addData, deleteData, getDocument } from "@/lib/firebase/firestore"
import { useAuth } from "./providers/context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { ImSpinner8 } from 'react-icons/im'
interface FollowUserProps {
    pageUserId: string
}

const FollowUser: FC<FollowUserProps> = ({ pageUserId }) => {
    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [isFollow, setIsFollow] = useState<null | boolean>(null)

    const getFollow = async () => {
        try {
            const doc = await getDocument(`follow/${user?.uid}/followers`, pageUserId)
            if (!doc) {
                setIsFollow(false)
            }
            else {
                setIsFollow(true)
            }
        } catch (error) {
            console.log("FOLLOW: ", error)
        }
        finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getFollow()
    }, [])
    const handleFollow = async () => {
        try {
            if (!user) return
            if (isFollow) {
                console.log("first")
                await deleteData(`follow/${user?.uid}/followers`, pageUserId)
                await deleteData(`follow/${pageUserId}/following`, user?.uid)
                setIsFollow(false)
            }
            else {
                console.log("ikinci")
                await addData(`follow/${user?.uid}/followers`, pageUserId, { id: pageUserId })
                await addData(`follow/${pageUserId}/following`, user?.uid, { id: user?.uid })

                setIsFollow(true)
            }
        } catch (error) {
            console.log("FOLLOW: ", error)
        }

    }
    if (pageUserId === user?.uid) return null
    return <Button onClick={handleFollow} variant={"ghost"} size={"icon"} className='z-30 ' >
        {isLoading ? <ImSpinner8 className="w-4 h-4 text-sky-500" /> :
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {
                            isFollow ? <AiOutlineUserDelete className="w-6 h-6 text-red-500" /> : <AiOutlineUserAdd className="w-6 h-6 text-sky-500" />

                        }
                    </TooltipTrigger>
                    <TooltipContent>
                        {
                            isFollow ? "Unfollow" : "Follow"
                        }
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        }
    </Button>

}

export default FollowUser