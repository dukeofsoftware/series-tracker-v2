'use client'

import { useUsernameStore } from '@/hooks/useUsername'
import { useTranslations } from 'next-intl'


const Warning = ({ }) => {
    const t = useTranslations("global.toast.firebase")
    const username = useUsernameStore(state => state.username)
    if (username) return null
    return <p className='font-semibold text-lx text-yellow-500'>
        {t("usernameProvide")}
    </p>
}

export default Warning