'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { CardContent, Card, CardHeader, CardTitle, CardDescription } from '../ui/card'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { ChangeUsernameValidator, ChangeUsernameType } from '@/lib/validators/usernameEdit'
import { useTranslations } from 'next-intl'
import { addData, deleteData, getDocument } from '@/lib/firebase/firestore'
import { useAuth } from '../providers/context'
import { toast } from '../ui/use-toast'
import { useUsernameStore } from '@/hooks/useUsername'

const UpdateUsername = ({ }) => {
    const { user } = useAuth()
    const setUsername = useUsernameStore(state => state.setUsername)
    const t = useTranslations("pages.settings.accountTab.updateUsername")
    const global = useTranslations("global")
    const toastTranslate = useTranslations("global.toast")
    const form = useForm<ChangeUsernameType>({
        resolver: valibotResolver(ChangeUsernameValidator)
    })
    const username = useUsernameStore(state => state.username)

    const handleUsernameSubmit = async (data: ChangeUsernameType) => {
        if (!user) return null
        try {
            const existingUsername = await getDocument(`usernames`, data.username)



            if (existingUsername) {
                return toast({
                    title: toastTranslate("error", {
                        code: "usernameTaken"
                    }),
                    description: t("usernameTaken"),
                    variant: "destructive",
                });
            }
            if (username) {
                await deleteData(`usernames`, username)
            }


            await addData(`usernames`, data.username, {
                uid: user?.uid
            })
            await addData(`users`, user?.uid, {
                username: data.username
            })
            setUsername(data.username)

            toast({
                title: toastTranslate("success"),
                description: t("toastDescription"),
            })
        } catch (error: any) {
            console.error(error)
            toast({
                title: global("toast.error", {
                    code: error.code,
                }),
                description: error.message,
                variant: "destructive",
            });
        }

    }
    return <Card className='md:grow w-full'>
        <CardHeader>
            <CardTitle>
                {
                    t("title")
                }
            </CardTitle>
            <CardDescription>
                {
                    t("description", {
                        username: username
                    })
                }
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleUsernameSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {t("inputLabel")}
                                </FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormDescription>

                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">
                        {
                            t("buttonLabel")
                        }
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card >
}

export default UpdateUsername