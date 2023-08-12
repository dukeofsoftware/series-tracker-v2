"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useForm } from "react-hook-form"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useLoadingCallback } from "react-loading-hook"

import { LoginSchema, LoginType } from "@/lib/validators/authSchema"
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

const SignIn = ({}) => {
  const router = useRouter()
  const params = useSearchParams()
  const [hasLogged, setHasLogged] = useState(false)
  const { getFirebaseAuth } = useFirebaseAuth()
  const redirect = params?.get("redirect")

  const [handleLoginWithEmailAndPassword, isEmailLoading, error] =
    useLoadingCallback(async ({ email, password }: LoginType) => {
      setHasLogged(false)
      const auth = getFirebaseAuth()
      const credential = await signInWithEmailAndPassword(auth, email, password)
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

  const form = useForm<LoginType>({
    resolver: valibotResolver(LoginSchema),
  })

  async function onSubmit(data: LoginType) {
    try {
      await handleLoginWithEmailAndPassword(data)
      toast({
        title: "Success",
        description: "You are logged in successfully",
      })

      return
    } catch (error: any) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
      return
    }
  }
  if (hasLogged) {
    ;<div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <span>
        Redirecting to <strong>{redirect || "/"}</strong>
      </span>
      <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
    </div>
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 px-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn@gmail.com" {...field} />
              </FormControl>
              <FormDescription>We'll never share your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormDescription>
                We'll never share your password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <p>
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-sky-500 hover:underline active:underline"
          >
            Register
          </Link>
        </p>

        <Button type="submit" disabled={isEmailLoading}>
          Sign In
        </Button>
      </form>
    </Form>
  )
}

export default SignIn
