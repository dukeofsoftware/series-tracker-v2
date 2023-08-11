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
import { User, updateEmail } from 'firebase/auth'
import { useAuthContext } from '../AuthContext'
import { toast } from '../ui/use-toast'
interface MailTabProps { }

const MailTab: FC<MailTabProps> = ({ }) => {
    const { user } = useAuthContext()
    const form = useForm<ResetEmailType>({
        resolver: valibotResolver(resetEmailValidator),

    })
    async function onSubmit(values: ResetEmailType) {
        await updateEmail(user as User, values.email).then(() => {
            toast({
                title: "Success",
                description: "Your email is changed successfully",

            })
        }).catch((error) => {
            console.error("EMAİL UPDATE ERROR:", error)
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            })

        });
    }
    return <div className='flex flex-col md:flex-row gap-3'>
        <Card className='md:grow'>
            <CardHeader>
                <CardTitle>
                    Change Your Email
                </CardTitle>
                <CardDescription>
                    You can change your email here
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
                                        Type your email.
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
                                    <FormLabel>Confirm Your Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="emre@gmail.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Type your email again.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Change Email</Button>
                    </form>
                </Form>


            </CardContent>
        </Card>
        <Card className='grow'>
            <CardHeader>
                <CardTitle>
                    Verify your email
                </CardTitle>
                <CardDescription>
                    Verify your email
                </CardDescription>
            </CardHeader>
            <CardContent>
                <VerifyMail />

            </CardContent>
        </Card>
    </div>
}

export default MailTab