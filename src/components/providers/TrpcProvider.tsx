'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { transformer } from '@/trpc/transformer';
import { trpcReact } from '@/trpc/trpc-react';
import { absoluteUrl } from '@/lib/utils';

export function TrpcProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({}));
    const [trpcClient] = useState(() =>
        trpcReact.createClient({
            links: [
                httpBatchLink({
                    url: absoluteUrl('/api/trpc'),
                }),
            ],
            transformer,
        })
    );

    return (
        <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpcReact.Provider>
    );
}