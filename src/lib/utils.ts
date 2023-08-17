import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatLanguage(lang: string) {
  return lang.split("-")[0]
}
export const formatMinutes = (minutes: number, lang: string) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (lang === "en-US") {
    if (hours === 0) return `${mins}m`
    return `${hours}h ${mins}m`
  }
  if (lang === "de-DE") {
    if (hours === 0) return `${mins}m`
    return `${hours}h ${mins}m`
  }
  if (lang === "tr-TR") {
    if (hours === 0) return `${mins}d`
    return `${hours}sa ${mins}d`
  }
  if (hours === 0) return `${mins}m`
  return `${hours}h ${mins}m`
}

export const autoUsername = (mail: string) => {
  return mail.split("@")[0]
}
export const randomUsername = () => {
  const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty"]

  const nouns = ["waterfall", "river", "breeze", "moon"]

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  return `${adjective}-${noun}`
}
