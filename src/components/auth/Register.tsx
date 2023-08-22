"use client"

import Link from "next/link"
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth"
import { useUsernameStore } from "@/hooks/useUsername"
import { valibotResolver } from "@hookform/resolvers/valibot"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

import { addData, getDocument } from "@/lib/firebase/firestore"
import { autoUsername, randomUsername } from "@/lib/utils"
import { RegisterSchema, RegisterType } from "@/lib/validators/authSchema"
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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import GoogleAuth from "../GoogleAuth"

const Register = ({ }) => {
  const { getFirebaseAuth } = useFirebaseAuth()
  const global = useTranslations("global")
  const t = useTranslations("pages.auth.register")
  const form = useForm<RegisterType>({
    resolver: valibotResolver(RegisterSchema),
  })
  const setUsername = useUsernameStore((state) => state.setUsername)

  async function onSubmit(data: RegisterType) {
    try {
      const auth = getFirebaseAuth()
      const credential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      await sendEmailVerification(credential.user)
      const idTokenResult = await credential.user.getIdTokenResult()
      await fetch("/api/login", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idTokenResult.token}`,
        },
      })
      const username = await getDocument("users", credential.user.uid).then(
        (doc) => {
          return doc?.username
        }
      )

      if (!username) {
        const username = await getDocument("users", credential.user.uid).then(
          (doc) => {
            return doc?.username
          }
        )

        if (!username) {
          const newUsername = autoUsername(
            credential.user.email || randomUsername()
          )
          await addData(`usernames`, newUsername, {
            uid: credential.user.uid,
          })
          await addData(`users`, credential.user.uid, {
            username: newUsername,
          })
        }
      }
      setUsername(username)
      toast({
        title: global("toast.success"),
        description: t("toastSuccessDescription"),
      })
      toast({
        title: t("verifyToastTitle"),
        description: t("verifyToastDescription"),
      })
      return
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
  <div className="grid place-items-center mt-5">
      <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("confirmPasswordLabel")}</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <p>
              {t("alreadyHaveAccount")}{" "}
              <Link
                href="/login"
                className="text-sky-500 hover:underline active:underline"
              >
                {t("login")}
              </Link>
            </p>
            <div className="flex justify-center w-full ">

              <Button type="submit" className="w-full max-w-xs">{t("buttonLabel")}</Button>
            </div>

          </form>
        </Form>
        <div className="flex justify-center w-full ">
          <GoogleAuth className="mt-2 w-full max-w-xs" />

        </div>
      </CardContent>
    </Card>
  </div>
  )
}

export default Register
