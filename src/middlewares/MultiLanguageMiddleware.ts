import { cookies } from "next/headers"
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server"
import { MiddlewareFactory } from "@/types"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

let locales = ["en", "tr"]
export let defaultLocale = "en"

function getLocale(request: Request): string {
  const headers = new Headers(request.headers)
  const acceptLanguage = headers.get("accept-language")
  if (acceptLanguage) {
    headers.set("accept-language", acceptLanguage.replaceAll("_", "-"))
  }

  const headersObject = Object.fromEntries(headers.entries())
  const languages = new Negotiator({ headers: headersObject }).languages()
  return match(languages, locales, defaultLocale)
}

/* export const withMultiLanguage: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
      const languageCookie = request.cookies.get("localeCookie")?.value
      const pathname = request.nextUrl.pathname

      if (!languageCookie) {
        let locale = getLocale(request) ?? defaultLocale

        const newUrl = new URL(`/${locale}${pathname}`, request.nextUrl)

        return NextResponse.rewrite(newUrl)
      }
      const newUrl = new URL(`/${languageCookie}${pathname}`, request.nextUrl)

      return NextResponse.rewrite(newUrl)
    
  }
} */
export function withMultiLanguage(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const languageCookie = request.cookies.get("localeCookie")?.value
    console.log(request.nextUrl.pathname)

    const pathname = request.nextUrl.pathname.replace(/\/$/, "")
    if (!languageCookie) {
      let locale = getLocale(request) ?? defaultLocale
      const newUrl = new URL(`/${locale}${pathname}`, request.nextUrl)

      return NextResponse.rewrite(newUrl)
    }
    const newUrl = new URL(`/${languageCookie}${pathname}`, request.nextUrl)

    if (languageCookie) {
      return NextResponse.rewrite(newUrl)
    }
    return middleware(request, event)
  }
}
