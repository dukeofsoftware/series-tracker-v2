import { inferAsyncReturnType } from "@trpc/server"
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch"
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens"

import { authConfig } from "@/config/server-config"

export function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  const getUser = async () => {
    // @ts-ignore
    const tokens = await getTokens(req.cookies as any, authConfig)
    return tokens
  }
  const user = getUser()

  return { user }
}
export type Context = inferAsyncReturnType<typeof createContext>
