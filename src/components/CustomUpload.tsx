"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import type { FileWithPath } from "react-dropzone"
import { BsPlus } from "react-icons/bs"

import { Input } from "./ui/input"

interface CustomUploadProps {
  startUpload: any
  setFiles: (files: FileWithPath[]) => void
}
export const CustomUpload = ({ startUpload, setFiles }: CustomUploadProps) => {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles)
    startUpload(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  })

  return (
    <section className="container">
      <div
        {...getRootProps({
          className:
            "dropzone w-full rounded-md border-2 border-white h-20 flex items-center justify-center",
        })}
      >
        <Input type="file" {...getInputProps()} />
        <BsPlus className="h-6 w-6 text-white" />
      </div>
    </section>
  )
}