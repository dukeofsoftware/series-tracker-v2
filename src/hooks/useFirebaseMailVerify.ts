import { useTranslations } from "next-intl"

import { toast } from "@/components/ui/use-toast"

export const useFirebaseMailVerifyError = () => {
  const t = useTranslations("global.toast")
  toast({
    title: t("error"),
    description: t("firebase.emailVerify"),
    variant: "destructive",
  })
  return
}
