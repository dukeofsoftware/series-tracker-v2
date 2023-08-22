"use client"

import { useRouter } from "next/navigation"
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { updateEmail } from "firebase/auth"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

import {
  ResetEmailType,
  resetEmailValidator,
} from "@/lib/validators/resetEmail"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const UpdateEmail = ({ }) => {
  const { getFirebaseAuth } = useFirebaseAuth()
  const user = getFirebaseAuth().currentUser!
  const router = useRouter()
  const form = useForm<ResetEmailType>({
    resolver: valibotResolver(resetEmailValidator),
  })
  const t = useTranslations("pages.settings.emailTab.changeEmail")
  const global = useTranslations("global.toast")

  async function onSubmit(values: ResetEmailType) {
    await updateEmail(user, values.email)
      .then(() => {
        toast({
          title: global("success"),
          description: t("toastDescription"),
        })
        router.refresh()
      })
      .catch((error) => {
        console.error(error)
        if (error.code === "auth/requires-recent-login") {
          toast({
            title: global("error", {
              code: error.code,
            }),
            description: global("reauthenticateError"),
          })
          return
        }
        toast({
          title: global("error", {
            code: error.code,
          }),
          description: error.message,
          variant: "destructive",
        })
      })
  }
  return (
    <Card className="w-full md:grow">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="emre@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("confirmInputLabel")}</FormLabel>
                  <FormControl>
                    <Input placeholder="emre@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    {t("confirmInputDescription")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{t("buttonLabel")}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default UpdateEmail
