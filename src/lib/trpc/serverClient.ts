import { appRouter } from "."
import { httpBatchLink } from "@trpc/client"

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${process.env.SITE_URL}/api/trpc`,
    }),
  ],
})