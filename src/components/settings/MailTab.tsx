'use client'

import { FC } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import VerifyMail from './VerifyMail'
import { useForm } from 'react-hook-form'
import { ResetEmailType, resetEmailValidator } from '@/lib/validators/resetEmail'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { updateEmail } from 'firebase/auth'
import { toast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { dictionary } from '@/content'
interface MailTabProps {
    language: string
}

const MailTab: FC<MailTabProps> = ({ language }) => {
    const { getFirebaseAuth } = useFirebaseAuth()
    const user = getFirebaseAuth().currentUser!
    const router = useRouter()
    const form = useForm<ResetEmailType>({
        resolver: valibotResolver(resetEmailValidator),

    })
    async function onSubmit(values: ResetEmailType) {
        await updateEmail(user, values.email).then(() => {
            toast({
                title: dictionary[language].toast.success,
                description: "Your email is changed successfully",

            })
            router.refresh()
        }).catch((error) => {
            console.error("EMAİL UPDATE ERROR:", error)
            toast({
                title: dictionary[language].toast.error,
                description: error.message,
                variant: "destructive"
            })

        });
    }
    return <div className='flex flex-col md:flex-row gap-2'>
        <Card className='md:grow w-full'>
            <CardHeader>
                <CardTitle>
                    {dictionary[language]?.settings?.emailTab?.changeEmail?.title}
                </CardTitle>
                <CardDescription>
                    {
                        dictionary[language]?.settings?.emailTab?.changeEmail?.description
                    }
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="emre@gmail.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {
                                            dictionary[language]?.settings?.emailTab?.changeEmail?.inputDescription
                                        }
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{dictionary[language]?.settings?.emailTab?.changeEmail?.confirmInputLabel}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="emre@gmail.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {dictionary[language]?.settings?.emailTab?.changeEmail?.confirmInputDescription}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">{dictionary[language]?.settings?.emailTab?.changeEmail?.buttonLabel}</Button>
                    </form>
                </Form>


            </CardContent>
        </Card>
        <Card className='md:grow w-full'>
            <CardHeader>
                <CardTitle>
                    {dictionary[language]?.settings?.emailTab?.verifyEmail?.title}
                </CardTitle>
                <CardDescription>
                    {dictionary[language]?.settings?.emailTab?.verifyEmail?.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <VerifyMail language={language} />

            </CardContent>
        </Card>
    </div>
}

export default MailTab