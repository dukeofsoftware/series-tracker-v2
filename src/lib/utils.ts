import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { toast } from "@/components/ui/use-toast"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatLanguage(lang: string) {
  return lang.split("-")[0]
}
export const formatMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

function getContrastColor(hexColor: string) {
  // Renk rengi ayırma
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)

  // Luminance hesaplama
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Luminance değerine göre kontrast renk seçimi
  return luminance > 0.5 ? "#000000" : "#FFFFFF"
}

export function getRandomColorFromClassNames() {
  const colorClassNames = "bg-green-600 bg-cyan-500 bg-blue-600 bg-Fuchsia-600"

  const classNamesArray = colorClassNames.split(" ")
  const randomIndex = Math.floor(Math.random() * classNamesArray.length)
  return classNamesArray[randomIndex]
}


