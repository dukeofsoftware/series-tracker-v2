export const i18n = {
  defaultLocale: "tr-TR",
  locales: ["en-US", "de-DE", "tr-TR"],
} as const

export type Locale = (typeof i18n)["locales"][number]
