'use client'

import { SyntheticEvent, useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { uploadProfilePhoto } from '@/lib/firebase/strotage'
import { toast } from '@/components/ui/use-toast'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase/firestore'

const UpdateProfilePhoto = ({ }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [photo, setPhoto] = useState<File | null>(null)
    const { getFirebaseAuth } = useFirebaseAuth()
    const user = getFirebaseAuth()

    const [username, setUsername] = useState<string | null>(null)
    useEffect(() => {

        const unsubscribe = onSnapshot(doc(db, `/users/${user?.currentUser?.uid}`), (doc) => {
            const username = doc.data()?.username
            if (username) {
                setUsername(username)
                return
            }
        })
        return () => {
            unsubscribe()
        }
    }, [])


    const global = useTranslations("global.toast")
    const t = useTranslations("pages.settings.accountTab.updateProfilePhoto")
    async function onSubmit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            if (!user) return null
            if (!photo) return null
            setLoading(true)
            await uploadProfilePhoto(photo, user.currentUser!, username || "")
            setPhoto(null)
            setLoading(false)
            toast({
                title: global("success"),
                description: t("toastDescription"),
            })
        } catch (error: any) {
            console.error(error)
            toast({
                title: global("error", {
                    code: error.code,
                }),
                description: error.message,
                variant: "destructive",
            });
        }
    }
    return <>
        <Card className="w-full md:grow">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage
                            height={90}
                            width={90}
                            src={user.currentUser?.photoURL || ""}
                        />
                        <AvatarFallback>
                            {user.currentUser?.displayName &&
                                user?.currentUser.displayName[0]}
                        </AvatarFallback>
                    </Avatar>

                    <CardTitle>
                        {t("title")}
                    </CardTitle>
                </div>
                <CardDescription>
                    {
                        t("description")
                    }
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-8">
                    <Input
                        type="file"
                        onChange={(e) => {
                            if (!e.target.files) return null
                            setPhoto(e.target.files[0])
                        }}
                    />

                    <Button type="submit" disabled={loading}>
                        {
                            t("buttonLabel")
                        }
                    </Button>
                </form>
            </CardContent>
        </Card>
    </>
}

export default UpdateProfilePhoto