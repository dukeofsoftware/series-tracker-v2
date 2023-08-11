'use client'

import { FC } from 'react'
import { useForm } from 'react-hook-form'
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
import { User,  updatePassword } from 'firebase/auth'
import { useAuthContext } from '../AuthContext'
import { toast } from '../ui/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ResetPasswordType, resetPasswordValidator } from '@/lib/validators/resetPassword'
interface PasswordTabProps { }
const PasswordTab: FC<PasswordTabProps> = ({ }) => {
    const { user } = useAuthContext()
    const form = useForm<ResetPasswordType>({
        resolver: valibotResolver(resetPasswordValidator),

    })
    async function onSubmit(values: ResetPasswordType) {
        await updatePassword(user as User, values.password).then(() => {
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

    return <>
        <Card className=''>
            <CardHeader>
                <CardTitle>
                    Change Your Password
                </CardTitle>
                <CardDescription>
                    You can change your password here
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="*********" {...field} />
                                    </FormControl>
                                    <FormDescription>

                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}

                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Your Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"

                                            placeholder="********" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Type your password again.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                       
                        <Button type="submit">Change Password</Button>
                    </form>
                </Form>


            </CardContent>
        </Card>
    </>
}

export default PasswordTab