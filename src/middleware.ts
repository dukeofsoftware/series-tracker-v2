import { NextResponse, type NextRequest } from "next/server"
import { authentication } from "next-firebase-auth-edge/lib/next/middleware"

import { authConfig } from "./config/server-config"
import { MultiLanguageMiddleware } from "./middlewares/MultiLanguageMiddleware"

const PUBLIC_PATHS = ["/login", "/register"]
function redirectToHome(request: NextRequest) {
  if (!PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
  }

  const url = request.nextUrl.clone()
  url.pathname = "/"
  url.search = ``
  return NextResponse.redirect(url)
}

function redirectToLogin(request: NextRequest) {
  if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
    return MultiLanguageMiddleware(request)
  }

  const url = request.nextUrl.clone()
  url.pathname = "/login"
  url.search = `redirect=${request.nextUrl.pathname}${url.search}`
  return NextResponse.redirect(url)
}

export async function middleware(request: NextRequest) {
  const shouldRedirectToLoginOrHome =
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/tmdb") ||
    (request.nextUrl.pathname.startsWith("/profile") &&
      !request.nextUrl.pathname.startsWith("/profile/chat") &&
      !request.nextUrl.pathname.startsWith("/profile/settings")) ||
    request.nextUrl.pathname === "/search/profile" ||
    request.nextUrl.pathname === "/faqs"

  if (shouldRedirectToLoginOrHome) {
    return MultiLanguageMiddleware(request)
  }

  return authentication(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: authConfig.apiKey,
    cookieName: authConfig.cookieName,
    cookieSerializeOptions: authConfig.cookieSerializeOptions,
    cookieSignatureKeys: authConfig.cookieSignatureKeys,
    serviceAccount: authConfig.serviceAccount,
    handleValidToken: async ({ token, decodedToken }) => {
      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToHome(request)
      }

      return MultiLanguageMiddleware(request)
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
