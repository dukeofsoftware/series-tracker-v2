import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

import { appRouter } from "@/lib/trpc"

const handler = (req: Request) =>
  fetchRequestHandler({
    req,
    endpoint: "/api/trpc",
    router: appRouter,
    createContext: () => ({}),
  })

export { handler as GET, handler as POST }
