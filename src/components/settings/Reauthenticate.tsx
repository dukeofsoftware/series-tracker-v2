"use client"

import { useFirebaseAuth } from "@/hooks/useFirebaseAuth"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { reauthenticateWithCredential } from "firebase/auth"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

import { ReAuthType, reAuthSchema } from "@/lib/validators/authSchema"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

import { EmailAuthProvider } from "firebase/auth";
import { useAuth } from "../providers/context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { useState } from "react"
import { ImSpinner2 } from "react-icons/im"


const Reauthenticate = ({ }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuth()
    const { getFirebaseAuth } = useFirebaseAuth()
    const auth = getFirebaseAuth()
    const t = useTranslations("pages.settings.reauthenticate")
    const global = useTranslations("global.toast")

    const form = useForm<ReAuthType>({
        resolver: valibotResolver(reAuthSchema),
    })

    async function onSubmit(data: ReAuthType) {

        try {
            setIsLoading(true)
            const credential = await EmailAuthProvider.credential(
                user?.email!,
                data.password
            )

            await reauthenticateWithCredential(auth?.currentUser!, credential)


            toast({
                title: global("success"),
                description: t("toastDescription"),
            })
            setIsLoading(false)
            return
        } catch (error: any) {
            console.error(error)
            form.reset()
            toast({
                title: global("error", {
                    code: error.code,
                }),
                description: error.message,
                variant: "destructive",
            })
        }
    }
    return <>
        <Card>
            <CardHeader>
                <CardTitle>
                    {t("cardTitle")}
                </CardTitle>
                <CardDescription>
                    {t("cardDescription")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 px-4">

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("passwordLabel")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="********" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button disabled={isLoading} type="submit">
                            {isLoading && <ImSpinner2 className="w-4 h-4 text-sky-500 animate-spin mr-2" />}
                            {t("buttonLabel")}</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </>
}

export default Reauthenticate