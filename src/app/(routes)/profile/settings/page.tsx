"use client"
import AccountTab from "@/components/settings/AccountTab"
import MailTab from "@/components/settings/MailTab"
import PasswordTab from "@/components/settings/PasswordTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { FC } from 'react'

interface pageProps { }

const Page: FC<pageProps> = ({ }) => {


  return <main className='container'>
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger className="grow" value="account">Account</TabsTrigger>
        <TabsTrigger className="grow" value="email"> Email</TabsTrigger>
        <TabsTrigger className="grow" value="password">Password</TabsTrigger>

      </TabsList>
      <TabsContent value="account">
        <AccountTab />
      </TabsContent>
      <TabsContent value="password">
        <PasswordTab />
      </TabsContent>
      <TabsContent value="email">
        <MailTab />
      </TabsContent>

    </Tabs>

  </main>
}

export default Page