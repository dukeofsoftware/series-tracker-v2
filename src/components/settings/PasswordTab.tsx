"use client"

import { FC } from "react"
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { updatePassword } from "firebase/auth"
import { useForm } from "react-hook-form"

import {
  ResetPasswordType,
  resetPasswordValidator,
} from "@/lib/validators/resetPassword"
import { Button } from "@/components/ui/button"
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTranslations } from "next-intl"


const PasswordTab = () => {
  const { getFirebaseAuth } = useFirebaseAuth()
  const user = getFirebaseAuth().currentUser!
  const form = useForm<ResetPasswordType>({
    resolver: valibotResolver(resetPasswordValidator),
  })
  const t = useTranslations("pages.settings.passwordTab")
  const global = useTranslations("global")
  async function onSubmit(values: ResetPasswordType) {
    await updatePassword(user, values.password)
      .then(() => {
        toast({
          title: global("toast.success"),
          description: t("toastDescription"),
        })
      })
      .catch((error) => {
        console.error(error)
        toast({
          title: global("toast.error", {
            code: error.code,
          }),
          description: error.message,
          variant: "destructive",
        });

      })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t("title")}
        </CardTitle>
        <CardDescription>
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("inputLabel")}
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*********" {...field} />
                  </FormControl>
                  <FormDescription>{t("inputDescription")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {
                      t("confirmInputLabel")
                    }
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormDescription>
                    {
                      t("confirmInputDescription")
                    }
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              {t("buttonLabel")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default PasswordTab
