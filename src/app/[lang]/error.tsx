'use client'

import { FC, useEffect } from 'react'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { LuAlertCircle, LuChevronLeft } from "react-icons/lu"
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { env } from '@/env.mjs'
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
            stack: error.stack
        })
    }
    useEffect(() => {
        if (!env.NEXT_PUBLIC_SITE_URL.includes("localhost")) {
            sendError()
        }
    }, [])
    return <div className='h-screen w-full grid place-items-center'>
        <div className='max-w-[500px] flex flex-col gap-2'>
            <Alert variant="destructive" className=' w-full bg-slate-950 text-red-500 border-red-500' >
                <LuAlertCircle className="h-4 w-4" />
                <AlertTitle>{t("error")}</AlertTitle>
                <AlertDescription>
                    {error.message || "An error occurred."}
                </AlertDescription>
            </Alert>
            <Alert className=' w-full bg-slate-950 text-yellow-500 border-yellow-500' >
                <AiOutlineInfoCircle className="text-yellow-500 h-4 w-4" />
                <AlertTitle>
                    We are sorry for the inconvenience.
                </AlertTitle>
                <AlertDescription>
                    Don't worry about it, we've been notified and we'll fix it as soon as possible.
                </AlertDescription>
            </Alert>
            <p>

            </p>
            <div className="grid place-items-center w-full">
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
}

export default error