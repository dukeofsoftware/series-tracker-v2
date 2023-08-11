'use client'

import { FC } from 'react'
import { Button } from '../ui/button'
import { emailVerification } from '@/lib/firebase/auth'
import { useAuthContext } from '../AuthContext'
import { useRouter } from 'next/navigation'

interface VerifyMailProps { }

const VerifyMail: FC<VerifyMailProps> = ({ }) => {
    const { user } = useAuthContext()
    const sendVerificationEmail = async () => {
        await emailVerification()
    }

    if (user?.emailVerified) {
        return <p className='text-emerald-500 font-semibold text-xl'>Your email is verified</p>
    }
    return <>
        <Button onClick={sendVerificationEmail}>
            Send Verification Email
        </Button>
    </>
}

export default VerifyMail