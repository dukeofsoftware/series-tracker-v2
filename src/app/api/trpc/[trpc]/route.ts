import { ServerRuntime } from "next"
import { createContext } from "@/trpc/init"
import { appRouter } from "@/trpc/routes/"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

export const runtime: ServerRuntime = "edge"

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  })

export { handler as GET, handler as POST }
