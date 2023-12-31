"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { LuArrowUpDown } from "react-icons/lu"

import { useAuth } from "@/components/providers/context"
import AddToFavoriteSeries from "@/components/tmdb/AddToFavorites"
import Rating from "@/components/tmdb/Rating"
import StatusSelector from "@/components/tmdb/StatusSelector"
import { Button } from "@/components/ui/button"

export type TMDB = {
  id: string
  title: string
  status: string
  date: string
  poster_path: string
  overview: string
}

export const columns: ColumnDef<TMDB>[] = [
  {
    accessorKey: "poster_path",
    header: () => {
      return <div className=" sm:block">Poster</div>
    },
    cell: ({ row }) => {
      const id = row.getValue("id")
      return (
        <Link href={`/tmdb/series/${id}`}>
          <Image
            className=" sm:block"
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
      const t = useTranslations("pages.profile.tables.series")
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
      const t = useTranslations("pages.profile.tables.series")
      return <div className=" sm:block">{t("overview")}</div>
    },
    cell: ({ row }) => {
      return <div className="  sm:line-clamp-5">{row.getValue("overview")}</div>
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      const t = useTranslations("pages.profile.tables.series")
      return (
        <Button
          className="  p-0 "
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
          <div className="  ">
            <StatusSelector
              type="series"
              seriesResult={{
                id: row.getValue("id") as string,
                title: row.getValue("title"),
                poster_path: row.getValue("poster_path"),
                last_air_date: row.getValue("date"),
                overview: row.getValue("overview"),
              }}
            />
          </div>
        )

      return (
        <div className="  ">
          {allStatus.find((s) => s.value === status)?.label}
        </div>
      )
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
              type="series"
              seriesResult={{
                id: row.getValue("id"),
                title: row.getValue("title"),
                poster_path: row.getValue("poster_path"),
                last_air_date: row.getValue("date"),
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
      const t = useTranslations("pages.profile.tables.series")
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
            <AddToFavoriteSeries
              type="series"
              seriesResult={{
                id: row.getValue("id"),
                title: row.getValue("title"),
                poster_path: row.getValue("poster_path"),
                last_air_date: row.getValue("date"),
                overview: row.getValue("overview"),
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
    accessorKey: "date",
    header: () => {
      const t = useTranslations("pages.profile.tables.series")
      return <div className="">{t("date")}</div>
    },
  },
  {
    accessorKey: "id",
    header: "id",
  },
]
