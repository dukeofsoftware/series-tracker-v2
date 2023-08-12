"use client"

import { FC, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth"
import { valibotResolver } from "@hookform/resolvers/valibot"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth"
import { useForm } from "react-hook-form"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
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

interface RegisterProps {}

const Register: FC<RegisterProps> = ({}) => {
  const router = useRouter()
  const params = useSearchParams()
  const [hasLogged, setHasLogged] = useState(false)
  const { getFirebaseAuth } = useFirebaseAuth()
  const redirect = params?.get("redirect")
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
      router.push(redirect ?? "/")
    })

  function getLoginUrl() {
    if (redirect) {
      return `/login?redirect=${redirect}`
    }

    return "/login"
  }
  const form = useForm<RegisterType>({
    resolver: valibotResolver(RegisterSchema),
  })

  async function onSubmit(data: RegisterType) {
    try {
      await registerWithEmailAndPassword(data)
      toast({
        title: "Success",
        description: "You are logged in successfully",
      })
      toast({
        title: "Check Your Email",
        description: "Plase check your email and verify.",
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormDescription>Type your password again</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <p>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-sky-500 hover:underline active:underline"
          >
            Sign in
          </Link>
        </p>
        <Button type="submit" disabled={isRegisterLoading}>
          Register
        </Button>
      </form>
    </Form>
  )
}

export default Register
