import Link from "next/link"

import MiddleSection from "./MiddleSection"
import RightSection from "./RightSection"

const Navbar = () => {
  return (
    <header className="container flex justify-between px-3 py-3">
      <Link href="/" className="text-2xl font-bold text-sky-500">
        Tracker
      </Link>
      <MiddleSection />
      <RightSection />
    </header>
  )
}

export default Navbar
