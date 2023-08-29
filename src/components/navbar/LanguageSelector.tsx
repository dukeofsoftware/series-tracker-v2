"use client"
"use client"

import { IoLanguage } from "react-icons/io5"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Locale } from "@/config/i18n.config"
import { trpc } from "@/lib/trpc/client"

const LanguageSelector = ({ }) => {
  const { mutateAsync } = trpc.useChangeLocaleMutation.useMutation({

  })



  const changeLanguage = async (lang: Locale) => {
    await mutateAsync({
      language: lang,
    })
    window.location.reload()
  }

  const languages = [
    { name: "English", code: "en-US" },
    { name: "Türkçe", code: "tr-TR" },
    { name: "Deutsch", code: "de-DE" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        role="button"
        aria-label="Language Selector"
        className={cn(buttonVariants({ variant: "outline", size: "icon" }), "")}
      >
        <IoLanguage />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        {languages.map((lang, i) => (
          <DropdownMenuItem
            onClick={() => {
              changeLanguage(lang.code as Locale)
            }}
            key={i}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageSelector
