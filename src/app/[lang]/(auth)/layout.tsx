import { ServerAuthProvider } from '@/components/providers/server-auth-provider'
import { FC } from 'react'

interface layoutProps {
    children: React.ReactNode
}

const Layout: FC<layoutProps> = ({ children }) => {
    return <>
        <ServerAuthProvider>{children}</ServerAuthProvider>;
    </>
}

export default Layout
