"use client"
import { useAuthContext } from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user } = useAuthContext()
    const router = useRouter();

    useEffect(() => {
        // Redirect to the home page if the user is not logged in
        if (user == null) {
            router.push("/");
        }
        // }, [ user ] );
    }, [user, router]);

    return (
        <>
            {children}
        </>

    )
}
