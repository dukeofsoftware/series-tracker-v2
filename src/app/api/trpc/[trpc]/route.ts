import { appRouter } from "@/server"
import { createContext } from "@/server/context"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

const handler = (req: Request) =>
  fetchRequestHandler({
    req,
    endpoint: "/api/trpc",
    router: appRouter,
    createContext,
  })

export { handler as GET, handler as POST }
