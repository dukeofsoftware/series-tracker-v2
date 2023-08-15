"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth"
import { valibotResolver } from "@hookform/resolvers/valibot"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth"
import { useForm } from "react-hook-form"
import { useLoadingCallback } from "react-loading-hook"

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
import { useTranslations } from "next-intl"
import { useFirebaseError } from "@/hooks/useFirebaseError"


const Register = ({ }) => {
  const router = useRouter()
  const { getFirebaseAuth } = useFirebaseAuth()
  const global = useTranslations("global")
  const t = useTranslations("pages.auth.register")


  const [hasLogged, setHasLogged] = useState(false)
  const [registerWithEmailAndPassword, isRegisterLoading, error] =
    useLoadingCallback(async ({ email, password }: RegisterType) => {
      setHasLogged(false)
      const auth = getFirebaseAuth()
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await sendEmailVerification(credential.user)
      const idTokenResult = await credential.user.getIdTokenResult()
      await fetch("/api/login", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idTokenResult.token}`,
        },
      })
      setHasLogged(true)
      router.push("/profile/settings")
    })


  const form = useForm<RegisterType>({
    resolver: valibotResolver(RegisterSchema),
  })

  async function onSubmit(data: RegisterType) {
    try {
      await registerWithEmailAndPassword(data)
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

      useFirebaseError(error)
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn@gmail.com" {...field} />
              </FormControl>
              <FormDescription>{t("emailInputDescription")}</FormDescription>
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
              <FormDescription>
                {t("passwordInputDescription")}
              </FormDescription>
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
              <FormDescription>{t("confirmPasswordInputDescription")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <p>
          {t("alreadyHaveAccount")}{" "}
          <Link
            href="/sign-in"
            className="text-sky-500 hover:underline active:underline"
          >
            {t("login")}
          </Link>
        </p>
        <Button type="submit" disabled={isRegisterLoading}>
          {t("buttonLabel")}
        </Button>
      </form>
    </Form>
  )
}

export default Register
