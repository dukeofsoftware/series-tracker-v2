'use client'

import { FC, useEffect, useState } from 'react'
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/toaster"

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'


interface ProvidersProps {
    children: React.ReactNode
}
const queryClient = new QueryClient()

const Providers: FC<ProvidersProps> = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) return null
    return <>

        <QueryClientProvider client={queryClient}>
                <ThemeProvider attribute='class' enableSystem>
                    {children}
                    <ReactQueryDevtools initialIsOpen={false} />
                    <Toaster />
                </ThemeProvider>
        </QueryClientProvider>

    </>
}

export default Providers