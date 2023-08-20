"use client"

import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ThemeToggler = ({}) => {
  const { theme, setTheme } = useTheme()
  const t = useTranslations("navbar.themes")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        role="button"
        aria-label="change theme"
        className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
      >
        {theme === "dark" ? (
          <BsFillMoonFill className="h-4 w-4" />
        ) : (
          <BsFillSunFill
            className="h-4 w-4
                            text-yellow-500"
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <BsFillSunFill className="mr-2 h-4 w-4 text-yellow-500" />
          {t("lightMode")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <BsFillMoonFill className="mr-2 h-4 w-4 text-slate-900 dark:text-slate-100" />
          {t("darkMode")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToggler
