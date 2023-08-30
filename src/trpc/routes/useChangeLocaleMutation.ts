import { cookies } from "next/headers"

import { publicProcedure } from "../methods"
import { TrpcLocaleInput } from "./types"

export const useChangeLocaleMutation = publicProcedure
  .input(TrpcLocaleInput)
  .mutation(async (opts) => {
    const language = opts.input.language
    if (!language) {
      return
    }
    cookies().set("NEXT_LOCALE", language)
    return { message: "success", status: 200 }
  })
