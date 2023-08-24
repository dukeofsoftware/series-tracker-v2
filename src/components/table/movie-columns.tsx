"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { useTranslations } from "next-intl"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { LuArrowUpDown } from "react-icons/lu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AddToFavorites from "../AddToFavorites"
import { useAuth } from "../providers/context"
import StatusSelector from "../StatusSelector"
import { Button } from "../ui/button"

export type TMDB = {
  id: string
  title: string
  status: string
  date: string
  poster_path: string
  overview: string
  isFavorite: boolean
}

export const columns: ColumnDef<TMDB>[] = [
  {
    accessorKey: "poster_path",
    header: ({ column }) => {
      return <div className="">Poster</div>
    },
    cell: ({ row }) => {
      return (
        <Image
          className=""
          src={`https://image.tmdb.org/t/p/w500${row.getValue("poster_path")}`}
          alt={row.getValue("title")}
          width={80}
          height={120}
        />
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      const t = useTranslations("pages.profile.tables.movie")
      return <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {t("title")}
        <LuArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    },
  },
  {
    accessorKey: "overview",
    header: ({ column }) => {
      const t = useTranslations("pages.profile.tables.movie")

      return <div className="">{t("overview")}</div>
    },
    cell: ({ row }) => {
      return (
        <p
          className="
            line-clamp-3
                
            hidden sm:line-clamp-3"
        >
          {row.getValue("overview")}
        </p>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      const t = useTranslations("pages.profile.tables.movie")

      return (
        <Button
          className=""
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("status")}
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const t = useTranslations("status")
      const allStatus = [
        {
          value: "not-started",
          label: t("notStarted"),
        },
        {
          value: "watching",
          label: t("watching"),
        },
        {
          value: "completed",
          label: t("completed"),
        },
        {
          value: "on-hold",
          label: t("onHold"),
        },
        {
          value: "dropped",
          label: t("dropped"),
        },
        {
          value: "plan-to-watch",
          label: t("planToWatch"),
        },
      ]
      const status = row.getValue("status")
      const { user } = useAuth()
      const pathname = usePathname()
      const uid = pathname.split("/")[2]
      if (user?.uid === uid)
        return (
          <div className="">
            <StatusSelector type="series" />
          </div>
        )

      return <div>{allStatus.find((s) => s.value === status)?.label}</div>
    },
  },
  {
    accessorKey: "isFavorite",
    header: ({ column }) => {
      const t = useTranslations("pages.profile.tables.movie")
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("favorite")}
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { user } = useAuth()
      const pathname = usePathname()
      const uid = pathname.split("/")[2]
      if (user?.uid === uid)
        return (
          <div className="grid place-items-center">
            <AddToFavorites
              type="movie"
              movieResult={{
                id: row.getValue("id"),
                title: row.getValue("title"),
                poster_path: row.getValue("poster_path"),
                release_date: row.getValue("date"),
                overview: row.getValue("overview"),
                original_title: row.getValue("title"),
              }}
            />
          </div>
        )

      return (
        <div className="grid place-items-center">
          {row.getValue("isFavorite") ? (
            <AiFillHeart className="h-5 w-5 text-red-500" />
          ) : (
            <AiOutlineHeart className="h-4 w-4" />
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "release_date",
    header: ({ column }) => {
      const t = useTranslations("pages.profile.tables.movie")
      return <div>{t("date")}</div>
    },
  },
  {
    accessorKey: "id",
    header: "id",
  },

  {
    id: "actions",

    cell: ({ row }) => {
      const id = row.getValue("id")
      const t = useTranslations("pages.profile.tables.movie")
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">{t("openMenu")}</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/tmdb/movies/${id}`}>{t("viewDetails")}</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
