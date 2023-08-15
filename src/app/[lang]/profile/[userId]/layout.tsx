"use client"
import { getDocument } from "@/lib/firebase/firestore"
import { useEffect, useState } from "react"



export default function Layout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { userId: string }
}) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    useEffect(() => {
        const getUser = async () => {
            const user = await getDocument("users", params.userId)
            setUser(user)
            setLoading(false)
        }
        getUser()

    }, [])



    return (
        <>
            <pre>
                {JSON.stringify(user, null, 2)}

            </pre>
            {children}

        </>

    )
}
