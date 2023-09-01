import type { Metadata } from "next"
import Link from "next/link"
import { LuChevronLeft } from "react-icons/lu"

import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're searching for does not exist.",
}

const PageNotFound = async () => {
  return (
    <section className="container mx-auto flex max-w-7xl flex-col items-center gap-6 pt-32 text-center">
      <h1 className="text-7xl font-extrabold">404</h1>
      <p>The page you're searching for does not exist.</p>
      <Link
        className={buttonVariants({
          variant: "ghost",
          className: "w-fit",
        })}
        href="/"
      >
        <LuChevronLeft className="mr-2 h-4 w-4" />
        Go Home
      </Link>
    </section>
  )
}

export default PageNotFound
