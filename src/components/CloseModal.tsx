"use client"

import { FC } from "react"
import { useRouter } from "next/navigation"
import { AiOutlineClose } from "react-icons/ai"

import { Button } from "./ui/button"

interface CloseModalProps {}

const CloseModal: FC<CloseModalProps> = ({}) => {
  const router = useRouter()
  return (
    <>
      <Button
        variant="subtle"
        className="h-6 w-6 rounded-md p-0"
        onClick={() => router.back()}
      >
        <AiOutlineClose className="h-4 w-4" />
      </Button>
    </>
  )
}

export default CloseModal
