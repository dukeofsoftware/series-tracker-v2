'use client'

import { FC, SyntheticEvent, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '../ui/input'
import { useAuthContext } from '../AuthContext'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Button } from '../ui/button'
import { changeProfileName, ChangeProfileNameType } from '@/lib/validators/changeProfile'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { uploadProfilePhoto } from '@/lib/firebase/strotage'
import { useRouter } from 'next/navigation'
import { toast } from '../ui/use-toast'
import { updateProfile } from 'firebase/auth'
interface AccountTabProps { }

const AccountTab: FC<AccountTabProps> = ({ }) => {
    const { user } = useAuthContext()
    const [loading, setLoading] = useState<boolean>(false)
    const [photo, setPhoto] = useState<File | null>(null)
    const router = useRouter()
    const form = useForm<ChangeProfileNameType>({
        resolver: valibotResolver(changeProfileName),

    })
    const handleProfileNameSubmit = async (data: ChangeProfileNameType) => {
        if (!user) return
        await updateProfile(user, {
            displayName: data.profileName
        })
        toast({
            title: "Success",
            description: "Profile name updated",
        })
        router.refresh()

    }

    async function onSubmit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault
        try {

            if (!user) return null
            setLoading(true)
            if (!photo) return null
            await uploadProfilePhoto(photo, user)
            setPhoto(null)
            setLoading(false)
            router.refresh()
        } catch (error: any) {
            console.log(error)
            toast({
                title: "Error",
                description: error.message,
            })
        }

    }

    return <div className='flex flex-col md:flex-row gap-2'>
        <Card className='grow'>
            <CardHeader>
                <div className='flex items-center gap-3'>
                    <Avatar>
                        <AvatarImage
                            height={90}
                            width={90}
                            src={user?.photoURL || ""}
                        />
                        <AvatarFallback>
                            {user?.displayName && user?.displayName[0]}
                        </AvatarFallback>
                    </Avatar>

                    <CardTitle>

                        Change Your Profile Photo
                    </CardTitle>
                </div>
                <CardDescription>
                    You can change your display photo here
                </CardDescription>
            </CardHeader>
            <CardContent>

                <form onSubmit={onSubmit} className="space-y-8">

                    <Input
                        type="file"

                        onChange={(e) => {
                            if (!e.target.files) return null
                            setPhoto(e.target.files[0])
                        }}
                    />




                    <Button type="submit" disabled={loading}>Change Profile Photo</Button>
                </form>


            </CardContent>
        </Card>
        <Card className='grow'>
            <CardHeader>
                <div className='flex items-center gap-3'>


                    <CardTitle>

                        Change Your Profile Name
                    </CardTitle>
                </div>
                <CardDescription>
                    You can change your display name here. {user?.displayName && <p>
                        Currently your name is {user?.displayName} </p>}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleProfileNameSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="profileName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profile Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="string"
                                            {...field}

                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your profile name is how other users will see you.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" >Change Profile Name</Button>
                    </form>
                </Form>


            </CardContent>
        </Card>
    </div>
}

export default AccountTab