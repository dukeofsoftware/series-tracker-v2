"use client"

import { useRouter } from "next/navigation"
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { updateProfile } from "firebase/auth"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

import { addData } from "@/lib/firebase/firestore"
import {
  changeProfileName,
  ChangeProfileNameType,
} from "@/lib/validators/changeProfile"
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
import { useAuth } from "../providers/context"

const UpdateDisplayName = ({}) => {
  const router = useRouter()
  const { getFirebaseAuth } = useFirebaseAuth()
  const authUser = getFirebaseAuth()
  const { user } = useAuth()
  const global = useTranslations("global")
  const t = useTranslations("pages.settings.accountTab.updateDisplayName")
  const form = useForm<ChangeProfileNameType>({
    resolver: valibotResolver(changeProfileName),
  })
  const handleProfileNameSubmit = async (data: ChangeProfileNameType) => {
    if (!user) return null

    try {
      await updateProfile(authUser.currentUser!, {
        displayName: data.profileName,
      })
      await addData("users", user.uid, {
        displayName: data.profileName,
      })
      toast({
        title: global("toast.success"),
        description: t("toastDescription"),
      })
    } catch (error: any) {
      if (error.code === "auth/requires-recent-login") {
        toast({
          title: global("toast.error", {
            code: error.code,
          }),
          description: global("toast.reauthenticateError"),
        })
      }
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
    <Card className="w-full  md:grow">
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>{t("title")}</CardTitle>
        </div>
        <CardDescription>
          {t("description")}
          {authUser.currentUser?.displayName && (
            <p>
              {t("currentName", {
                name: authUser.currentUser.displayName,
              })}
            </p>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleProfileNameSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="profileName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("inputLabel")}</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
                  </FormControl>
                  <FormDescription>{t("inputDescription")}</FormDescription>
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

export default UpdateDisplayName
