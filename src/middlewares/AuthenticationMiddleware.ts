import { authentication } from "next-firebase-auth-edge/lib/next/middleware"

import { authConfig } from "@/config/server-config"
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server"
import { MiddlewareFactory } from "@/types"

const PUBLIC_PATHS = ["/register", "/login", "/reset-password", "/"]
const PUBLIC_PROTECT = ["/register", "/login", "/reset-password"]
function redirectToHome(request: NextRequest) {
  const url = request.nextUrl.clone()
  url.pathname = "/"
  url.search = ""
  return NextResponse.redirect(url)
}

function redirectToLogin(request: NextRequest) {
  if (PUBLIC_PROTECT.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = "/login"
  url.search = `redirect=${request.nextUrl.pathname}${url.search}`
  return NextResponse.redirect(url)
}

export const withAuth: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    return authentication(request, {
      loginPath: "/api/login",
      logoutPath: "/api/logout",
      apiKey: authConfig.apiKey,
      cookieName: authConfig.cookieName,
      cookieSerializeOptions: authConfig.cookieSerializeOptions,
      cookieSignatureKeys: authConfig.cookieSignatureKeys,
      serviceAccount: authConfig.serviceAccount,
      handleValidToken: async ({ token, decodedToken }) => {
        if (PUBLIC_PROTECT.includes(request.nextUrl.pathname)) {
          return redirectToHome(request)
        }

        return NextResponse.next()
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
}
