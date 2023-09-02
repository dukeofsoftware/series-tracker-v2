import { initTRPC } from "@trpc/server"
import type { inferAsyncReturnType } from "@trpc/server"
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch"

import { transformer } from "./transformer"




export const t = initTRPC.create({ transformer })
