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
import { updatePassword } from 'firebase/auth'
import { toast } from '@/components/ui/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ResetPasswordType, resetPasswordValidator } from '@/lib/validators/resetPassword'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { dictionary } from '@/content'
interface PasswordTabProps {
    language: string

}
const PasswordTab: FC<PasswordTabProps> = ({ language }) => {
    const { getFirebaseAuth } = useFirebaseAuth()
    const user = getFirebaseAuth().currentUser!
    const form = useForm<ResetPasswordType>({
        resolver: valibotResolver(resetPasswordValidator),

    })
    async function onSubmit(values: ResetPasswordType) {
        await updatePassword(user, values.password).then(() => {
            toast({
                title: dictionary[language]?.toast?.success,
                description: dictionary[language]?.settings?.passwordTab?.toastDescription,

            })
        }).catch((error) => {
            console.error("EMAİL UPDATE ERROR:", error)
            toast({
                title: dictionary[language]?.toast?.error,
                description: error.message,
                variant: "destructive"
            })

        });
    }

    return <Card >
        <CardHeader>
            <CardTitle>
                {dictionary[language]?.settings?.passwordTab?.title}
            </CardTitle>
            <CardDescription>
                {
                    dictionary[language]?.settings?.passwordTab?.description
                }
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
                                <FormLabel>{dictionary[language]?.settings?.passwordTab?.inputLabel}</FormLabel>
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
                                <FormLabel>{dictionary[language]?.settings?.passwordTab?.confirmInputLabel}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"

                                        placeholder="********" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {
                                        dictionary[language]?.settings?.passwordTab?.confirmInputDescription
                                    }
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">{dictionary[language]?.settings?.passwordTab?.buttonLabel}</Button>
                </form>
            </Form>


        </CardContent>
    </Card>

}

export default PasswordTab