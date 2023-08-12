'use client'
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs"
import { cn, formatLanguage } from "@/lib/utils"
import { useTheme } from "next-themes"
import { buttonVariants } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguageStore } from "@/hooks/useLanguageStore"
import { dictionary } from "@/content"
const ThemeToggler = ({ }) => {
    const { theme, setTheme } = useTheme()
    const language = useLanguageStore((state) => formatLanguage(state.language))
    return <DropdownMenu>
        <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "icon" }))}>
            {
                theme === "dark" ? <BsFillMoonFill className="w-4 h-4" /> : <BsFillSunFill className="w-4 h-4
                            text-yellow-500" />
            }
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setTheme("light")}>
                <BsFillSunFill className="w-4 h-4 mr-2 text-yellow-500" />  {dictionary[language]?.themes?.lightMode}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}><BsFillMoonFill className="w-4 h-4 mr-2 text-slate-900 dark:text-slate-100" />{dictionary[language]?.themes?.darkMode}</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

}

export default ThemeToggler