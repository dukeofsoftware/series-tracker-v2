"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useNavbarStore } from "@/hooks/use-navbar"
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth"
import { signOut } from "firebase/auth"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import {
  AiFillHeart,
  AiFillMessage,
  AiFillSetting,
  AiOutlineCloseCircle,
  AiOutlineLogout,
  AiOutlineSearch,
} from "react-icons/ai"
import { BiUser } from "react-icons/bi"
import { BsFillMoonFill, BsFillSunFill, BsListUl } from "react-icons/bs"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "../providers/context"
import { Button, buttonVariants } from "../ui/button"
import { toast } from "../ui/use-toast"
import LanguageSelector from "./LanguageSelector"

const MobileNavbar = () => {
  const { getFirebaseAuth } = useFirebaseAuth()
  const path = usePathname()
  const t = useTranslations("navbar.accountDropdown")
  const global = useTranslations()
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const navbar = useNavbarStore()
  const navbarConfig = [
    {
      icon: <AiOutlineSearch className=" h-6 w-6" />,
      text: global("searchUser"),
      link: "/search/profile",
    },
    {
      icon: <BsListUl className=" h-6 w-6" />,
      text: "Tmdb",
      link: "/tmdb",
    },
    {
      icon: <BiUser className="h-6 w-6 text-sky-500" />,
      text: t("profile"),
      link: `/profile/${user?.uid}`,
    },

    {
      icon: <AiFillHeart className="h-6 w-6 text-red-500" />,
      text: t("favorites"),
      link: `/profile/${user?.uid}/favorites`,
    },
    {
      icon: <AiFillMessage className="h-6 w-6 text-green-500" />,
      text: t("chat"),
      link: `/profile/chat`,
    },

    {
      icon: <AiFillSetting className="text-grey-700 h-6 w-6" />,
      text: t("settings"),
      link: "/profile/settings",
    },
  ]
  const accessNavbar = [{

    icon: <AiOutlineSearch className=" h-6 w-6" />,
    text: global("searchUser"),
    link: "/search/profile",
  },
  {
    icon: <BsListUl className=" h-6 w-6" />,
    text: "Tmdb",
    link: "/tmdb",
  },
  ]
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
      },
    },
  }

  const animationItem = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }
  const themeAnimation = {
    hidden: {
      x: -20,
      y: 20,
    },
    show: {
      x: 0,
      y: 0,
    },
    exit: {
      x: -20,
      y: -20,
    },
  }
  const handleLogOut = async () => {
    try {
      const auth = getFirebaseAuth()

      await signOut(auth)
      await fetch("/api/logout", {
        method: "GET",
      })
      window.location.reload()
    } catch (error: any) {
      console.error(error)
      toast({
        title: global("global.toast.error", {
          code: error.code,
        }),
        description: error.message,
        variant: "destructive",
      })
    }
  }
  useEffect(() => {
    if (navbar.isNavbarOpen) document.body.classList.add("overflow-hidden")
    else document.body.classList.remove("overflow-hidden")
  }, [navbar.isNavbarOpen])
  useEffect(() => {
    if (navbar.isNavbarOpen) {
      navbar.closeNavbar()
    }
  }, [path])
  if (!navbar.isNavbarOpen) return null

  return (
    <AnimatePresence>
      <motion.nav
        className="container fixed inset-0 z-50 bg-white/90 dark:bg-black/90 "
        initial={"hidden"}
        animate={"show"}
        exit={"hidden"}
        variants={container}
      >
        <div className="mb-2 flex items-center justify-between py-5">
          <Link href="/" className="text-2xl font-bold text-sky-500">
            Tracker
          </Link>
          <div className="flex items-center justify-end gap-2">
            <Button
              variant={"outline"}
              size={"icon"}
              className=""
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark")
              }}
            >
              {theme === "dark" ? (
                <AnimatePresence>
                  <motion.span
                    key={"theme"}
                    className="overflow-hidden "
                    variants={themeAnimation}
                    exit={{
                      x: 20,
                      y: -20,
                    }}
                    initial={"hidden"}
                    animate={"show"}
                  >
                    <BsFillMoonFill className="h-4 w-4" />
                  </motion.span>
                </AnimatePresence>
              ) : (
                <AnimatePresence>
                  <motion.span
                    key={"theme"}
                    className="overflow-hidden "
                    variants={themeAnimation}
                    exit={"exit"}
                    initial={"hidden"}
                    animate={"show"}
                  >
                    <BsFillSunFill className="h-4 w-4                    text-yellow-500" />
                  </motion.span>
                </AnimatePresence>
              )}
              <p className="sr-only">Change theme</p>
            </Button>
            <LanguageSelector />
            <Button
              variant={"ghost"}
              size={"icon"}
              className="h-11 w-11"
              onClick={() => navbar.closeNavbar()}
            >
              <AiOutlineCloseCircle className="h-7 w-7 " />
              <p className="sr-only">Close</p>
            </Button>
          </div>
        </div>
        <ul className="flex flex-col ">
          {user?.uid ? (
            <>
              {navbarConfig.map((item, index) => {
                return (
                  <motion.div key={index} variants={animationItem}>
                    <li className="w-full py-5">
                      <Link
                        href={item.link}
                        key={index}
                        className={cn(
                          buttonVariants({ variant: "link" }),
                          "flex items-center justify-center gap-1 py-3  text-lg font-semibold "
                        )}
                      >
                        {item.icon}
                        {item.text}
                      </Link>
                    </li>
                    <Separator />
                  </motion.div>)
              })}

              <motion.div variants={animationItem}>
                <li className="flex w-full items-center justify-center py-5">
                  <Button
                    variant={"link"}
                    onClick={async () => {
                      await handleLogOut()
                    }}
                    className={" gap-1 py-3  text-lg font-semibold "}
                  >
                    <AiOutlineLogout className=" h-6 w-6 text-red-500" />
                    <p className="text-red-500">{t("logout")}</p>
                  </Button>
                </li>
                <Separator />
              </motion.div>
            </>
          ) : (
            <div className="flex flex-col gap-1">
              {accessNavbar.map((item, index) => {
                return (
                  <motion.div key={index} variants={animationItem}>
                    <li className="w-full py-5">
                      <Link
                        href={item.link}
                        key={index}
                        className={cn(
                          buttonVariants({ variant: "link" }),
                          "flex items-center justify-center gap-1 py-3  text-lg font-semibold "
                        )}
                      >
                        {item.icon}
                        {item.text}
                      </Link>
                    </li>
                    <Separator />
                  </motion.div>)
              })}
              <div className="flex items-center w-full gap-2 m-2">
                <Link
                  href={"/auth/login"}
                  className={cn(buttonVariants({ variant: "default" }),"grow")}
                >
                  Login
                </Link>
                <Link
                  href={"/auth/register"}
                  className={cn(buttonVariants({ variant: "outline" }),"grow")}
                >
                  Sign Up
                </Link>
              </div>
            </div>

          )}
        </ul>
      </motion.nav>
    </AnimatePresence>
  )
}

export default MobileNavbar
