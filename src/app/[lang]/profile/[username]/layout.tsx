"use client"
import { getDocument } from "@/lib/firebase/firestore"
import { useEffect, useState } from "react"

import Image from "next/image"
import { useAuth } from "@/components/providers/context"

export default function Layout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { userId: string }
}) {
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    useEffect



    return (
        <div>
            <div className="items-center justify-center">
                <Image
                    src={user?.photoURL || "/male.png"}
                    alt={user?.displayName || "placeholder"}
                    width={80} height={80}
                    className="rounded-full border-2 border-white"

                />
                <h1>{user?.displayName}</h1>
            </div>
            <pre>
                {JSON.stringify(user, null, 2)}

            </pre>
            {children}

        </div>

    )
}
