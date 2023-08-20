"use client"
import { ColumnDef } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { LuArrowUpDown, LuMoreHorizontal } from "react-icons/lu"
import { Button } from "../ui/button"

import { MoreHorizontal } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useAuth } from "../providers/context"
import AddToFavoriteSeries from "../AddToFavoriteSeries"
import { usePathname } from "next/navigation"
import StatusSelector from "../StatusSelector"
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
            return (
                <div className="hidden sm:block">
                    Poster
                </div>
            )
        },
        cell: ({ row }) => {
            return <Image className="hidden sm:block" src={`https://image.tmdb.org/t/p/w500${row.getValue("poster_path")}`} alt={row.getValue("title")} width={80} height={120} />
        },
    },
    {
        accessorKey: "title",
        header: () => {
            const t = useTranslations("pages.profile.tables.series")
            return <div>
                {t("title")}
            </div>
        }

        ,
    },
    {
        accessorKey: "overview",
        header: () => {
            const t = useTranslations("pages.profile.tables.series")
            return (
                <div className="hidden sm:block">
                    {t("overview")}
                </div>
            )
        },
        cell: ({ row }) => {
            return <div className=" hidden sm:line-clamp-5">{row.getValue("overview")}</div>

        }
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            const t = useTranslations("pages.profile.tables.series")
            return (
                <Button
                    className=" md:inline-flex hidden p-0"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("status")}
                    <LuArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }, cell: ({ row }) => {
            const t = useTranslations("status")
            const allStatus = [
                {
                    value: "not-started",
                    label: t("notStarted")

                },
                {
                    value: "watching",
                    label: t("watching")
                },
                {
                    value: "completed",
                    label: t("completed")

                },
                {
                    value: "on-hold",
                    label: t("onHold")
                },
                {
                    value: "dropped",
                    label: t("dropped")
                },
                {
                    value: "plan-to-watch",
                    label: t("planToWatch")
                },

            ]
            const status = row.getValue("status")
            const { user } = useAuth()
            const pathname = usePathname()
            const uid = pathname.split("/")[2]
            if (user?.uid === uid) return <div className="p-0 hidden  md:grid place-items-center">
                <StatusSelector type="series" seriesResult={{
                    id: row.getValue("id") as string,
                    title: row.getValue("title"),
                    poster_path: row.getValue("poster_path"),
                    last_air_date: row.getValue("date"),
                    overview: row.getValue("overview"),

                }} />
            </div>


            return <div className="hidden md:grid place-items-center">
                {allStatus.find((s) => s.value === status)?.label
                }
            </div>
        }

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
        }, cell: ({ row }) => {
            const { user } = useAuth()
            const pathname = usePathname()
            const uid = pathname.split("/")[2]
            if (user?.uid === uid) return <div className="grid place-items-center">
                <AddToFavoriteSeries result={{
                    id: row.getValue("id"),
                    title: row.getValue("title"),
                    poster_path: row.getValue("poster_path"),
                    last_air_date: row.getValue("date"),
                    overview: row.getValue("overview"),
                }} />
            </div>


            return <div className="grid place-items-center">
                {
                    row.getValue("isFavorite") ? <AiFillHeart className="w-5 h-5 text-red-500" /> : <AiOutlineHeart className="w-4 h-4" />
                }
            </div>
        },
    },
    {
        accessorKey: "date",
        header: () => {
            const t = useTranslations("pages.profile.tables.series")
            return <div className="" >
                {t("date")}
            </div>
        }
    },
    {
        accessorKey: "id",
        header: "id"
    },


    {
        id: "actions",
        cell: ({ row }) => {
            const id = row.getValue("id")
            const t = useTranslations("pages.profile.tables.series")
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
                            <Link href={`/tmdb/series/${id}`}>
                                {t("viewDetails")}
                            </Link>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },


]