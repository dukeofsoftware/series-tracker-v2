"use client"


import { emailVerification } from "@/lib/firebase/auth"
import { useAuth } from "@/components/providers/context"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTranslations } from "next-intl"

const VerifyMail = () => {
  const { user } = useAuth()
  const global = useTranslations("global")
  const t = useTranslations("pages.settings.emailTab.verifyEmail")
  const sendVerificationEmail = async () => {
    if (!user) return
    try {
      await emailVerification()
      toast({
        title: t("toastTitle"),
        description: t("toastDescription")
      })
      
    } catch (error: any) {
      console.error(error)
      toast({
        title: global("toast.error", {
            code: error.code,
        }),
        description: error.message,
        variant: "destructive",
    }); 
    }
  }

  if (user?.emailVerified) {
    return (
      <Card className="w-full md:grow">
        <CardHeader>
          <CardTitle>
            {t("title")}
          </CardTitle>
          <CardDescription>
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold text-emerald-500">
            {t("verifiedMail")}
          </p>
        </CardContent>
      </Card>

    )
  }
  return (<Card className="w-full md:grow">
    <CardHeader>
      <CardTitle>
        {t("title")}
      </CardTitle>
      <CardDescription>
        {t("description")}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Button onClick={sendVerificationEmail}>
        {t("verifyButtonLabel")}
      </Button>
    </CardContent>
  </Card>

  )
}

export default VerifyMail
