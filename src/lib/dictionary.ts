import 'server-only'
import type { Locale } from '@/config/i18n.config'

const dictionaries = {
  "tr-TR": () => import('@/content/tr.json').then(module => module.default),
  "en-US": () => import('@/content/en.json').then(module => module.default),
  "de-DE": () => import('@/content/de.json').then(module => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()