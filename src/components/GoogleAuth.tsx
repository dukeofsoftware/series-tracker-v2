'use client'

import { FC, useState } from 'react'
import { Button } from './ui/button'
import { ImSpinner2 } from 'react-icons/im'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { getGoogleProvider, loginWithProvider } from '@/lib/firebase/auth'
import { toast } from './ui/use-toast'
import { addData, getDocument } from '@/lib/firebase/firestore'
import { autoUsername, randomUsername } from '@/lib/utils'
import { useUsernameStore } from '@/hooks/useUsername'
import { FcGoogle } from 'react-icons/fc'
interface GoogleAuthProps {
    className?: string
}

const GoogleAuth: FC<GoogleAuthProps> = ({ className }) => {
    const pathname = usePathname()
    const setUsername = useUsernameStore((state) => state.setUsername)

    const login = useTranslations("pages.auth.login")
    const register = useTranslations("pages.auth.register")
    const params = useSearchParams()
    const global = useTranslations("global")
    const { getFirebaseAuth } = useFirebaseAuth();
    const redirect = params?.get("redirect");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const googleLoginHandler = async () => {
        setIsLoading(true)

        try {
            const auth = getFirebaseAuth();
            const user = await loginWithProvider(auth, getGoogleProvider(auth));
            const idTokenResult = await user.getIdTokenResult();
            await fetch("/api/login", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${idTokenResult.token}`,
                },
            });
            const username = await getDocument("users", user.uid).then(
                (doc) => {
                    return doc?.username
                }
            )

            if (!username) {
                const newUsername = autoUsername(
                    user.email || randomUsername()
                )
                await addData(`usernames`, newUsername, {
                    uid: user.uid,
                })
                await addData(`users`, user.uid, {
                    username: newUsername,
                })
            }
            setUsername(username)
            if (!user.emailVerified) {
                router.push("/verify-mail")
            }
            if (pathname === "/login") {
                toast({
                    title: global("toast.success"),
                    description: login("toastDescription"),
                })
            }
            else {
                toast({
                    title: global("toast.success"),
                    description: register("toastSuccessDescription"),
                })
            }
            router.push(redirect ?? "/");

        } catch (error: any) {
            console.error(error);
            toast({
                title: global("toast.error", {
                    code: error.code,
                }),
                description: error.message
            })
        } finally {
            setIsLoading(true)
        }

    }

    return <Button className={className} onClick={
        googleLoginHandler
    }>
        {isLoading ? <ImSpinner2 className="animate-spin w-4 h-4 mr-2" /> : <FcGoogle className="w-4 h-4 mr-2" />}
        {pathname === "/login" ? login("loginWithGoogle") : register("registerWithGoogle")}
    </Button>
}

export default GoogleAuth