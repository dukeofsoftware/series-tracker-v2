import 'client-only';

import { createTRPCReact } from '@trpc/react-query';
import { type AppRouter } from './routes';

export const trpcReact = createTRPCReact<AppRouter>({});