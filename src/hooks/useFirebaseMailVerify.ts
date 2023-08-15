import { useTranslations } from "next-intl"

import { toast } from "@/components/ui/use-toast"

export function useFirebaseMailVerifyError() {

  const t = useTranslations("global.toast")
  toast({
    title: t("error"),
    description: t("firebase.emailVerify"),
    variant: "destructive",
  })
  return
}
