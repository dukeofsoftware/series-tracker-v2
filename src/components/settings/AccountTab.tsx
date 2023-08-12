"use client"

import { FC, SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { dictionary, DictionaryEntry } from "@/content"
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { updateProfile } from "firebase/auth"
import { useForm } from "react-hook-form"

import { uploadProfilePhoto } from "@/lib/firebase/strotage"
import {
  changeProfileName,
  ChangeProfileNameType,
} from "@/lib/validators/changeProfile"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { toast } from "../ui/use-toast"

interface AccountTabProps {
  language: string
}

const AccountTab: FC<AccountTabProps> = ({ language }) => {
  const { getFirebaseAuth } = useFirebaseAuth()
  const user = getFirebaseAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [photo, setPhoto] = useState<File | null>(null)
  const router = useRouter()
  const form = useForm<ChangeProfileNameType>({
    resolver: valibotResolver(changeProfileName),
  })
  const handleProfileNameSubmit = async (data: ChangeProfileNameType) => {
    if (!user) return null
    await updateProfile(user.currentUser!, {
      displayName: data.profileName,
    })
    toast({
      title: dictionary[language]?.toast?.success,
      description:
        dictionary[language]?.settings?.accountTab?.profileName
          ?.toastDescription,
    })
    router.refresh()
  }

  async function onSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault
    try {
      if (!user) return null
      setLoading(true)
      if (!photo) return null
      await uploadProfilePhoto(photo, user.currentUser!)
      setPhoto(null)
      setLoading(false)
      router.refresh()
    } catch (error: any) {
      console.error(error)
      toast({
        title: dictionary[language]?.toast?.error,
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <Card className="w-full md:grow">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                height={90}
                width={90}
                src={user.currentUser?.photoURL || ""}
              />
              <AvatarFallback>
                {user.currentUser?.displayName &&
                  user?.currentUser.displayName[0]}
              </AvatarFallback>
            </Avatar>

            <CardTitle>
              {dictionary[language]?.settings?.accountTab.profilePhoto.title}
            </CardTitle>
          </div>
          <CardDescription>
            {
              dictionary[language]?.settings?.accountTab.profilePhoto
                .description
            }
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

            <Button type="submit" disabled={loading}>
              {
                dictionary[language]?.settings?.accountTab.profilePhoto
                  .buttonLabel
              }
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="w-full  md:grow">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle>
              {dictionary[language]?.settings?.accountTab?.profileName?.title}
            </CardTitle>
          </div>
          <CardDescription>
            {dictionary[language].settings.accountTab.profileName.description}
            {user.currentUser?.displayName && (
              <p>
                {
                  dictionary[language]?.settings?.accountTab?.profileName
                    ?.currentName
                }{" "}
                {user?.currentUser.displayName}{" "}
              </p>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleProfileNameSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="profileName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {" "}
                      {
                        dictionary[language].settings.accountTab.profileName
                          .inputLabel
                      }
                    </FormLabel>
                    <FormControl>
                      <Input type="string" {...field} />
                    </FormControl>
                    <FormDescription>
                      {
                        dictionary[language]?.settings?.accountTab?.profileName
                          ?.inputDescription
                      }
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">
                {
                  dictionary[language]?.settings?.accountTab?.profileName
                    ?.buttonLabel
                }
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AccountTab
