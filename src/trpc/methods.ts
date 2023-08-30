import { t } from './init';
import { isAuthenticated } from './isAuthenticated';

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const authenticatedProcedure = t.procedure.use(isAuthenticated);


