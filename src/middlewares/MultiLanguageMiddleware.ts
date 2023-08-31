import { NextRequest } from "next/server"
import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import createIntlMiddleware from "next-intl/middleware"
import { i18n } from "@/config/i18n.config"

function getLocale(request: NextRequest): string | undefined {
  const languageCookie = request.cookies.get("NEXT_LOCALE")?.value
  if (languageCookie) {
    return languageCookie
  }
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

export const MultiLanguageMiddleware = (request: NextRequest) => {
  const defaultLocale =
    getLocale(request) || request.headers.get("x-default-locale") || "en"

  const intlMiddleware = createIntlMiddleware({
    /* @ts-ignore */
    locales: i18n.locales,
    localePrefix: "never",
    defaultLocale: defaultLocale || "en-US",
    localeDetection: false,
  })

  return intlMiddleware(request)
}
