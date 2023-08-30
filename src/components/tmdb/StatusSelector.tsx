"use client"

import { FC, memo, useEffect, useState } from "react"

import { deleteDoc, doc, onSnapshot } from "firebase/firestore"
import { useTranslations } from "next-intl"

import { addData, db, getDocument } from "@/lib/firebase/firestore"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth } from "@/components/providers/context"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { trpcCaller } from "@/trpc/trpc-caller"

interface StatusSelectorProps {
  movieResult?: Awaited<ReturnType<(typeof trpcCaller)["useGetTmdbMovie"]>>;
  seriesResult?: Awaited<ReturnType<(typeof trpcCaller)["useGetTmdbTv"]>>;

  type: "movie" | "series"
}

const StatusSelector: FC<StatusSelectorProps> = ({
  movieResult,
  seriesResult,
  type,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState("Status")
  const global = useTranslations("global")
  const t = useTranslations("status")
  const { user } = useAuth()

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(
        db,
        `/users/${user?.uid}/${type === "series" ? "series" : "movies"}/${type === "series" ? seriesResult?.id : movieResult?.id
        }`
      ),
      (doc) => {
        const status = doc.data()?.status
        if (status) {
          setStatus(status)
        }
      }
    )

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const getStatus = async () => {
      try {
        setIsLoading(true)

        if (type === "series") {
          if (!seriesResult) return

          const firebaseStatus = await getDocument(
            `users/${user?.uid}/series`,
            seriesResult?.id.toString()
          ).then((res) => res?.status)
          if (firebaseStatus) {
            setStatus(firebaseStatus)
            return
          }
          setStatus("Status")
          return
        }
        if (type === "movie") {
          if (!movieResult) return
          const firebaseStatus = await getDocument(
            `users/${user?.uid}/movies`,
            movieResult?.id.toString()
          ).then((res) => res?.status)
          if (firebaseStatus) {
            setStatus(firebaseStatus)
            return
          }
          setStatus("Status")
          return
        }
      } catch (error: any) {
        console.error(error)
        toast({
          title: global("toast.error", {
            code: error.code,
          }),
          description: error.message,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    getStatus()
  }, [])

  const deleteHandle = async () => {
    try {
      if (type === "series") {
        if (!seriesResult) return

        const docRef = doc(
          db,
          `users/${user?.uid}/series`,
          seriesResult?.id.toString()
        )
        await deleteDoc(docRef)
        setStatus("Status")
        window.location.reload()

        return
      }
      if (type === "movie") {
        if (!movieResult) return

        const docRef = doc(
          db,
          `users/${user?.uid}/movies`,
          movieResult?.id.toString()
        )
        await deleteDoc(docRef)
        setStatus("Status")
        window.location.reload()
        return
      }
    } catch (error: any) {
      console.error(error)
      toast({
        title: global("toast.error", {
          code: error.code,
        }),
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleStatusChange = async (e: string) => {
    try {
      setStatus(e)
      if (type === "series") {
        if (!seriesResult) {
          toast({
            title: global("toast.error", {
              code: "400",
            }),
            description: global("toast.errorDescription"),
            variant: "destructive",
          })
          return
        }

        await addData(`users/${user?.uid}/series`, seriesResult.id.toString(), {
          status: e,
          id: seriesResult.id,
          title: seriesResult.title,
          poster_path: seriesResult.poster_path,
          date: seriesResult.first_air_date || seriesResult.last_air_date,
          overview: seriesResult.overview,
        })
        return
      }
      if (type === "movie") {
        if (!movieResult) {
          toast({
            title: global("toast.error", {
              code: "400",
            }),
            description: global("toast.errorDescription"),
            variant: "destructive",
          })
          return
        }
        await addData(`users/${user?.uid}/movies`, movieResult.id.toString(), {
          status: e,
          id: movieResult.id,
          title: movieResult.title || movieResult.original_title,
          poster_path: movieResult.poster_path,
          release_date: movieResult.release_date,
          original_title: movieResult.original_title || movieResult.title,
          overview: movieResult.overview,
        })
        return
      }
    } catch (error: any) {
      console.error(error)
      toast({
        title: global("toast.error", {
          code: error.code,
        }),
        description: error.message,
        variant: "destructive",
      })
    }
  }

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

  return (
    <Select
      onValueChange={handleStatusChange}
      value={status !== "Status" ? status : "Status"}
      disabled={isLoading}
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue
          placeholder={isLoading ? global("loading") : t("statusTitle")}
        />
      </SelectTrigger>
      <SelectContent>
        {status !== "Status" && (
          <Button
            variant={"ghost"}
            className="w-full text-red-500 hover:bg-red-800/30 hover:text-red-500 active:bg-red-800/30"
            onClick={deleteHandle}
          >
            {t("deleteStatus")}
          </Button>
        )}
        {status === "Status" && (
          <SelectItem value="Status" disabled>
            {t("statusTitle")}
          </SelectItem>
        )}
        <Separator />

        {allStatus.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default memo(StatusSelector)
