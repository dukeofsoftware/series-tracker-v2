import { FC } from "react"

import { ServerAuthProvider } from "@/components/providers/server-auth-provider"

interface layoutProps {
  children: React.ReactNode
}

const Layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      <ServerAuthProvider>{children}</ServerAuthProvider>;
    </>
  )
}

export default Layout
