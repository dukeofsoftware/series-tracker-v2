"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { useTranslations } from "next-intl"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { LuArrowUpDown } from "react-icons/lu"

import { useAuth } from "@/components/providers/context"
import AddToFavorites from "@/components/tmdb/AddToFavorites"
import Rating from "@/components/tmdb/Rating"
import StatusSelector from "@/components/tmdb/StatusSelector"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
    header: () => {
      return <div className="">Poster</div>
    },
    cell: ({ row }) => {
      const id = row.getValue("id")
      return (
        <Link href={`/tmdb/movies/${id}`}>
          <Image
            className=""
            src={`https://image.tmdb.org/t/p/w92${row.getValue("poster_path")}`}
            alt={row.getValue("title")}
            width={80}
            height={120}
          />
        </Link>
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      const t = useTranslations("pages.profile.tables.movie")
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("title")}
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "overview",
    header: () => {
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
            <StatusSelector
              type="movie"
              movieResult={{
                id: row.getValue("id"),
                title: row.getValue("title") || row.getValue("original_title"),
                poster_path: row.getValue("poster_path"),
                release_date: row.getValue("release_date"),
                overview: row.getValue("overview"),
                original_title:
                  row.getValue("original_title") || row.getValue("title"),
              }}
            />
          </div>
        )

      return <div>{allStatus.find((s) => s.value === status)?.label}</div>
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      const t = useTranslations("pages.profile.tables.series")
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("rating")}
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { user } = useAuth()
      const pathname = usePathname()
      const uid = pathname.split("/")[2]
      if (user?.uid === uid) {
        return (
          <div className="grid place-items-center">
            <Rating
              type="movie"
              movieResult={{
                id: row.getValue("id"),
                title: row.getValue("title") || row.getValue("original_title"),
                original_title:
                  row.getValue("original_title") || row.getValue("title"),
                poster_path: row.getValue("poster_path"),
                release_date: row.getValue("release_date"),
                overview: row.getValue("overview"),
              }}
            />
          </div>
        )
      }

      return (
        <div className="grid place-items-center">
          {row.getValue("rating") ? row.getValue("rating") : 0}
        </div>
      )
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
                title: row.getValue("title") || row.getValue("original_title"),
                poster_path: row.getValue("poster_path"),
                release_date: row.getValue("release_date"),
                overview: row.getValue("overview"),
                original_title:
                  row.getValue("original_title") || row.getValue("title"),
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
    accessorKey: "original_title",
    header: () => {
      const t = useTranslations("pages.profile.tables.movie")
      return <div>{t("originalTitle")}</div>
    },
  },
  {
    accessorKey: "release_date",
    header: () => {
      const t = useTranslations("pages.profile.tables.movie")
      return <div>{t("date")}</div>
    },
  },
  {
    accessorKey: "id",
    header: "id",
  },

]
