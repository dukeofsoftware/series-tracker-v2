'use client'
import { buttonVariants } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguageStore } from "@/hooks/useLanguageStore"
import { cn } from "@/lib/utils"
import axios from "axios"

import { IoLanguage } from 'react-icons/io5'
const LanguageSelector = ({ }) => {
    const setLanguage = useLanguageStore(state => state.setLanguage)
    const changeLanguage = async (lang: string) => {


        await axios.post('/api/locale', {
            language: lang
        })
        setLanguage(lang)
        window.location.reload()
    }

    const languages = [
        { name: "English", code: "en-US" },
        { name: "Türkçe", code: "tr-TR" },
        { name: "Deutsch", code: "de-DE" },
    ]

    return <>
        <DropdownMenu>
            <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "icon" }))}>
                <IoLanguage />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    languages.map((lang, i) => <DropdownMenuItem
                        onClick={() => {
                            changeLanguage(lang.code)
                        }}
                        key={i}>
                        {lang.name}
                    </DropdownMenuItem>)

                }


            </DropdownMenuContent>
        </DropdownMenu>
    </>
}

export default LanguageSelector