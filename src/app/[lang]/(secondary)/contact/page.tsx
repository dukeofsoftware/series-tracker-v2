"use client"

import { FC, useState } from "react"
import { redirect } from "next/navigation"
import { valibotResolver } from "@hookform/resolvers/valibot"
import axios, { AxiosError } from "axios"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

import { ContactType, ContactValidator } from "@/lib/validators/contactSchema"
import { useAuth } from "@/components/providers/context"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  if (!user) redirect("/login")
  const t = useTranslations("pages.contact")
  const global = useTranslations("global")
  const form = useForm<ContactType>({
    resolver: valibotResolver(ContactValidator),
    defaultValues: {
      email: user?.email!,
    },
  })
  async function onSubmit(values: ContactType) {
    try {
      setLoading(true)

      await axios.post("/api/contact", values)
      toast({
        title: global("toast.success"),
        description: t("toastDescription"),
      })
    } catch (error: any) {
      if (error.response?.status === 429) {
        toast({
          title: global("toast.error", {
            code: error.response?.status || "500",
          }),
          description: global("rateLimitError"),
          variant: "destructive",
        })
        return
      }

      toast({
        title: global("toast.error", {
          code: "500",
        }),
        description: t("toastErrorDescription"),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mt-5">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.name")}</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.message")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your message here"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {t("form.button")}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}

export default Page