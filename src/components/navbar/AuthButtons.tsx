"use client"

import Link from "next/link"

import { useAuth } from "@/components/providers/context"
import { buttonVariants } from "@/components/ui/button"

const AuthButtons = ({}) => {
  const { user } = useAuth()
  if (user) return null
  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <Link href="/login" className={buttonVariants({ variant: "outline" })}>
          Sign In
        </Link>
        <Link href="/register" className={buttonVariants()}>
          Register
        </Link>
      </div>
    </>
  )
}

export default AuthButtons
