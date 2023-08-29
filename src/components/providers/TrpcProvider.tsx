"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";

import dynamic from "next/dynamic";
import { trpc } from "@/lib/trpc/client";
const ReactQueryDevtools = dynamic(
    () =>
        import("@tanstack/react-query-devtools").then(
            (mod) => mod.ReactQueryDevtools
        ),
    { ssr: false }
)
export default function TrpcProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({}));
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: "https://tracker-v2-1.vercel.app/api/trpc",
                }),
            ],
        })
    );
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </trpc.Provider>
    );
}