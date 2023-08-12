

import RightSection from "./RightSection"
import MiddleSection from "./MiddleSection"
import Link from 'next/link'

const Navbar = () => {


    return <header className="py-3 container flex justify-between px-3">
        <Link href="/" className="text-2xl font-bold text-sky-500">Tracker</Link>
        <MiddleSection />
        <RightSection />
    </header>
}

export default Navbar
