import "server-only"

import { createContext } from "./init"
import { appRouter } from "./routes"

export const trpcCaller = appRouter.createCaller(await createContext())
