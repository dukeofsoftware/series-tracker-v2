'use client'

import {  SyntheticEvent, useState } from 'react'
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
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const UpdateProfilePhoto= ({ }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [photo, setPhoto] = useState<File | null>(null)
    const { getFirebaseAuth } = useFirebaseAuth()
    const user = getFirebaseAuth()
    const router = useRouter()
    const global = useTranslations("global.toast")
    const t = useTranslations("pages.settings.accountTab.updateProfilePhoto")
    async function onSubmit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault
        try {
            if (!user) return null
            setLoading(true)
            if (!photo) return null
            await uploadProfilePhoto(photo, user.currentUser!)
            setPhoto(null)
            setLoading(false)
            router.refresh()
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
          });         }
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