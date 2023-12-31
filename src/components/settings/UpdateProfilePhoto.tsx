"use client"

import { SyntheticEvent, useEffect, useState } from "react"
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth"
import { doc, onSnapshot } from "firebase/firestore"
import { useTranslations } from "next-intl"

import { db } from "@/lib/firebase/firestore"
import { uploadProfilePhoto } from "@/lib/firebase/strotage"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const UpdateProfilePhoto = ({}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [photo, setPhoto] = useState<File | null>(null)
  const { getFirebaseAuth } = useFirebaseAuth()
  const user = getFirebaseAuth()
  const global = useTranslations("global.toast")
  const t = useTranslations("pages.settings.accountTab.updateProfilePhoto")
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, `/users/${user?.currentUser?.uid}`),
      (doc) => {
        const username = doc.data()?.username
        if (username) {
          setUsername(username)
          return
        }
      }
    )
    return () => unsubscribe()
  }, [])

  async function onSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      if (!user) return null
      if (!photo) return null
      if (
        !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          photo.type
        )
      ) {
        toast({
          title: global("error", {
            code: "invalid-format",
          }),
          description: t("invalidFormat"),
          variant: "destructive",
        })
        setPhoto(null)
        return
      }

      if (photo.size > 4 * 1024 * 1024) {
        toast({
          title: global("error", {
            code: "file-size-exceeds",
          }),
          description: t("fileSizeExceeds", {
            size: "4mb",
          }),
          variant: "destructive",
        })
        setPhoto(null)

        return
      }

      setLoading(true)
      await uploadProfilePhoto(photo, user.currentUser!, username || "")
      setPhoto(null)
      setLoading(false)
      toast({
        title: global("success"),
        description: t("toastDescription"),
      })
    } catch (error: any) {
      setPhoto(null)

      console.error(error)
      toast({
        title: global("error", {
          code: error.code,
        }),
        description: error.message,
        variant: "destructive",
      })
    }
  }
  return (
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

          <CardTitle>{t("title")}</CardTitle>
        </div>
        <CardDescription>{t("description")}</CardDescription>
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
            {t("buttonLabel")}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default UpdateProfilePhoto
