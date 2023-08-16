import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatLanguage(lang: string) {
  return lang.split("-")[0]
}
export const formatMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
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
