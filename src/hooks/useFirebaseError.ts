import { useTranslations } from "next-intl"

import { toast } from "@/components/ui/use-toast"

export function useFirebaseError(error: any) {
  const t = useTranslations("global.toast")
  console.error(error)
  toast({
    title: t("error", {
      code: error.code,
    }),
    description: error.message,
    variant: "destructive",
  })
  return
}
