import { NextResponse, type NextRequest } from "next/server"
import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { authentication } from "next-firebase-auth-edge/lib/next/middleware"
import createIntlMiddleware from "next-intl/middleware"

import { i18n } from "@/config/i18n.config"
import { authConfig } from "./config/server-config"

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
const PUBLIC_PATHS = ["/login", "/register"]
function redirectToHome(request: NextRequest) {
  if (!PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
    const defaultLocale =
      getLocale(request) || request.headers.get("x-default-locale") || "en"

    const intlMiddleware = createIntlMiddleware({
      /* @ts-ignore */
      locales: i18n.locales,
      localePrefix: "never",
      defaultLocale: defaultLocale || "en-US",
      localeDetection: false,
    })
    const middlewareIntl = intlMiddleware(request)

    return middlewareIntl
  }

  const url = request.nextUrl.clone()
  url.pathname = "/"
  url.search = ``
  return NextResponse.redirect(url)
}

function redirectToLogin(request: NextRequest) {
  const defaultLocale =
    getLocale(request) || request.headers.get("x-default-locale") || "en"

  const intlMiddleware = createIntlMiddleware({
    /* @ts-ignore */
    locales: i18n.locales,
    localePrefix: "never",
    defaultLocale: defaultLocale || "en-US",
    localeDetection: false,
  })

  if (
    PUBLIC_PATHS.includes(request.nextUrl.pathname) ||
    request.nextUrl.pathname === "/"
  ) {
    const middlewareIntl = intlMiddleware(request)

    return middlewareIntl
  }

  const url = request.nextUrl.clone()
  url.pathname = "/login"
  url.search = `redirect=${request.nextUrl.pathname}${url.search}`
  return NextResponse.redirect(url)
}


export async function middleware(request: NextRequest) {
  return authentication(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: authConfig.apiKey,
    cookieName: authConfig.cookieName,
    cookieSerializeOptions: authConfig.cookieSerializeOptions,
    cookieSignatureKeys: authConfig.cookieSignatureKeys,
    serviceAccount: authConfig.serviceAccount,
    handleValidToken: async ({ token, decodedToken }) => {
      const defaultLocale =
        getLocale(request) || request.headers.get("x-default-locale") || "en"

      const intlMiddleware = createIntlMiddleware({
        /* @ts-ignore */
        locales: i18n.locales,
        localePrefix: "never",
        defaultLocale: defaultLocale || "en-US",
        localeDetection: false,
      })

      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToHome(request)
      }
    
      return intlMiddleware(request)
    },
    handleInvalidToken: async () => {
      return redirectToLogin(request)
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error })
      return redirectToLogin(request)
    },
  })
}

export const config = {
  matcher: [
    "/",
    "/((?!_next|favicon.ico|api|.*\\.).*)",
    "/api/login",
    "/api/logout",
  ],
}
