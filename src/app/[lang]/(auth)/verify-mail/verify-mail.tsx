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
import { FC } from "react"

interface Pages { }

const Page: FC<Pages> = ({ }) => {
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

export default Page