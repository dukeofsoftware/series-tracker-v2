import { cookies } from "next/headers"
import { initTRPC } from "@trpc/server"
import type { inferAsyncReturnType } from "@trpc/server"
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch"
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens"

import { authConfig } from "@/config/server-config"
import { transformer } from "./transformer"
import { Locale } from "@/config/i18n.config"
export async function createContext(opts?: FetchCreateContextFnOptions) {
  const user = await getTokens(cookies(), authConfig)
  const language = (cookies().get("NEXT_LOCALE")?.value as Locale) || "en-US"
  return {
    language: language,
    user,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>

export const t = initTRPC.context<Context>().create({ transformer })
