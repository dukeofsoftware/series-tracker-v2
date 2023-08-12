import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { withAuth } from "./middlewares/AuthenticationMiddleware"
import { withMultiLanguage } from "./middlewares/MultiLanguageMiddleware"

export async function defaultMiddleware() {
  const languageCookie = cookies().get("localeCookie")

  return NextResponse.next()
}
export default withMultiLanguage(withAuth(defaultMiddleware))
export const config = {
  matcher: [
    "/",
    "/((?!_next|favicon.ico|api|.*\\.).*)",
    "/api/login",
    "/api/logout",
  ],
}
