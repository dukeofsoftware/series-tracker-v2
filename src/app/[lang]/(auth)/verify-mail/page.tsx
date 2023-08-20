"use client"

import { FC, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

import { emailVerification } from "@/lib/firebase/auth"
import { useAuth } from "@/components/providers/context"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface Pages {}

const Page: FC<Pages> = ({}) => {
  const { user } = useAuth()
  const global = useTranslations("global")
  const router = useRouter()
  const t = useTranslations("pages.settings.emailTab.verifyEmail")

  useEffect(() => {
    if (user?.emailVerified) {
      toast({
        title: global("toast.success"),
        description: t("verified"),
      })
      router.push("/")
    }
  }, [user?.emailVerified])
  const sendVerificationEmail = async () => {
    if (!user) return
    try {
      await emailVerification()
      toast({
        title: t("toastTitle"),
        description: t("toastDescription"),
      })
    } catch (error: any) {
      console.error(error)
      toast({
        title: global("toast.error", {
          code: error.code,
        }),
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex h-screen w-full items-center  justify-center">
      <Card className="w-full max-w-xl md:grow">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={sendVerificationEmail}>
            {t("verifyButtonLabel")}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
