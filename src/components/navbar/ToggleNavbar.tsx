"use client"

import { useNavbarStore } from "@/hooks/use-navbar"
import { RxHamburgerMenu } from "react-icons/rx"

import { Button } from "@/components/ui/button"

const ToggleNavbar = ({}) => {
  const toggleNavbar = useNavbarStore((state) => state.toggleNavbar)

  return (
    <div className="ml-2 flex items-center justify-end gap-2 sm:hidden">
      <Button
        variant={"ghost"}
        size={"icon"}
        className="h-11 w-11"
        onClick={() => toggleNavbar()}
      >
        <RxHamburgerMenu className="h-7 w-7 " />
        <p className="sr-only">open navbar</p>
      </Button>
    </div>
  )
}

export default ToggleNavbar
