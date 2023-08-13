import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server"
import { authentication } from "next-firebase-auth-edge/lib/next/middleware"

import { authConfig } from "@/config/server-config"

const PUBLIC_PATHS = ["/register", "/login", "/reset-password", "/"]

function redirectToHome(request: NextRequest) {
  const languageCookie = request.cookies.get("localeCookie")?.value || "en-US"
  const url = request.nextUrl.clone()
  url.pathname = `/`
  url.search = ""

  return NextResponse.redirect(url)
}

function redirectToLogin(request: NextRequest) {
  console.log("redirect login")
  if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }
  const url = request.nextUrl.clone()
  url.pathname = "/login"
  url.search = `redirect=${request.nextUrl.pathname}${url.search}`

  return NextResponse.redirect(url)
}

/* export const withAuth: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next)
    if (res) {
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
    return res
  }
} */
export function withAuth(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    console.log("çalıştı")
    await authentication(request, {
      loginPath: "/api/login",
      logoutPath: "/api/logout",
      apiKey: authConfig.apiKey,
      cookieName: authConfig.cookieName,
      cookieSerializeOptions: authConfig.cookieSerializeOptions,
      cookieSignatureKeys: authConfig.cookieSignatureKeys,
      serviceAccount: authConfig.serviceAccount,
      handleValidToken: async ({ token, decodedToken }) => {
        console.log("first")
        if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
          return redirectToHome(request)
        }
        console.log("second")
        return redirectToLogin(request)
      },
      handleInvalidToken: async () => {
        return redirectToLogin(request)
      },
      handleError: async (error) => {
        console.error("Unhandled authentication error", { error })
        return redirectToLogin(request)
      },
    })
    return middleware(request, event)
  }
}
