
import { withAuth } from "./middlewares/AuthenticationMiddleware"
import { withMultiLanguage } from "./middlewares/MultiLanguageMiddleware"
import { chain } from "./middlewares/chain"



export default chain([withAuth, withMultiLanguage])

export const config = {
  matcher: [
    "/",
    "/((?!_next|favicon.ico|api|.*\\.).*)",
    "/api/login",
    "/api/logout",
  ],
}
