"use client"

import { FC, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { env } from "@/env.mjs"
import axios from "axios"
import { useTranslations } from "next-intl"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { LuAlertCircle, LuChevronLeft } from "react-icons/lu"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"

interface errorProps {
  error: Error
}

const error: FC<errorProps> = ({ error }) => {
  const path = usePathname()
  const t = useTranslations("global")
  const sendError = async () => {
    await axios.post(`/api/contact/error`, {
      path: path,
      error: error.name,
      message: error.message,
      stack: error.stack,
    })
  }
  useEffect(() => {
    if (!env.NEXT_PUBLIC_SITE_URL.includes("localhost")) {
      sendError()
    }
  }, [])
  return (
    <div className="grid h-screen w-full place-items-center">
      <div className="flex max-w-[500px] flex-col gap-2">
        <Alert
          variant="destructive"
          className=" w-full border-red-500 bg-slate-950 text-red-500"
        >
          <LuAlertCircle className="h-4 w-4" />
          <AlertTitle>{t("error")}</AlertTitle>
          <AlertDescription>
            {error.message || "An error occurred."}
          </AlertDescription>
        </Alert>
        <Alert className=" w-full border-yellow-500 bg-slate-950 text-yellow-500">
          <AiOutlineInfoCircle className="h-4 w-4 text-yellow-500" />
          <AlertTitle>We are sorry for the inconvenience.</AlertTitle>
          <AlertDescription>
            Don't worry about it, we've been notified and we'll fix it as soon
            as possible.
          </AlertDescription>
        </Alert>
        <p></p>
        <div className="grid w-full place-items-center">
          <Link
            className={buttonVariants({
              variant: "ghost",
              className: "w-fit",
            })}
            href="/"
          >
            <LuChevronLeft className="mr-2 h-4 w-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default error
