'use client'

import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { emailVerification } from '@/lib/firebase/auth'

import { useAuth } from '@/components/providers/context'
import { dictionary } from '@/content'
import { toast } from '@/components/ui/use-toast'

interface VerifyMailProps {
    language: string
}

const VerifyMail: FC<VerifyMailProps> = ({ language }) => {
    const { user } = useAuth()
    const sendVerificationEmail = async () => {
        try {
            await emailVerification()
            toast({
                title: dictionary[language]?.settings?.emailTab?.verifyEmail?.toastTitle,
                description: dictionary[language]?.settings?.emailTab?.verifyEmail?.toastDescription,
            })
        } catch (error: any) {
            toast({
                title: dictionary[language]?.toast.error,
                description: error.message,
                variant: "destructive",
            })
            throw new Error(error)
        }
    }

    if (user?.emailVerified) {
        return <p className='text-emerald-500 font-semibold text-xl'>{
            dictionary[language]?.settings?.emailTab?.verifyEmail?.verifiedMail}</p>
    }
    return <>
        <Button onClick={sendVerificationEmail}>
            {
                dictionary[language]?.settings?.emailTab?.verifyEmail?.verifyButton
            }
        </Button>
    </>
}

export default VerifyMail