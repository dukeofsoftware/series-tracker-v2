"use client"

import Link from "next/link"

import { useAuth } from "@/components/providers/context"
import { buttonVariants } from "@/components/ui/button"
import { usePathname } from "next/navigation"

const AuthButtons = ({ }) => {
  const { user } = useAuth()
  const pathname = usePathname()

  if (user) return null
  return (
    <>
      <div className="flex items-center justify-end gap-2">
        {pathname !== "/login" && (
          <Link href="/login" className={buttonVariants({ variant: "outline" })}>
            Sign In
          </Link>
        )}
        {
          pathname !== "/register" && (<Link href="/register" className={buttonVariants()}>
            Register
          </Link>)
        }

      </div>
    </>
  )
}

export default AuthButtons
