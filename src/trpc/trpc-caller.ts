import "server-only"

import { appRouter } from "./routes"

export const trpcCaller = appRouter.createCaller({})
