import React, { useCallback, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { UploadIcon } from "@radix-ui/react-icons"
import { TECHNOLOGIES } from "~/constants/prompts"
import { cn, isValidUrl } from "~/utils/misc"
import { useDropzone } from "react-dropzone"

import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { LoadingIcon } from "~/components/loading-icon"

import { getImageUrl, uploadImage } from "./utils"

interface IUrlFormProps {
  url: string
  setUrl: React.Dispatch<React.SetStateAction<string>>
  onUrlSubmit: () => void
  submitting: boolean
}

interface ITechnologiesSelectProps {
  setTechnology: React.Dispatch<React.SetStateAction<string>>
}

export const UploadersSection = () => {
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [url, setUrl] = useState("")
  const [technology, setTechnology] = useState(TECHNOLOGIES[0].id)
  const { push } = useRouter()

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return
      setUploading(true)
      const imageUrl = await uploadImage(file)
      setUploading(false)
      push(`/run?imageUrl=${imageUrl}&technology_id=${technology}`)
    },
    [technology, push]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
  })

  const handleUrlSubmit = async () => {
    setSubmitting(true)
    const imageUrl = await getImageUrl(url)
    setSubmitting(false)
    if (!imageUrl) return
    push(`/run?imageUrl=${imageUrl}&technology_id=${technology}`)
  }

  return (
    <section className="flex w-full flex-col items-center">
      <UrlForm
        url={url}
        setUrl={setUrl}
        onUrlSubmit={handleUrlSubmit}
        submitting={submitting}
      />
      <p className="my-4 text-gray-10" onClick={() => {}}>
        or
      </p>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <Card
          className={cn(
            "flex h-[200px] w-[600px] cursor-pointer flex-col hover:shadow-tooltip items-center transition-shadow duration-200 justify-center gap-y-4 text-gray-11",
            isDragActive ? "shadow-tooltip" : "shadow-border-small"
          )}
        >
          {uploading ? (
            <LoadingIcon className="mr-2 h-6 w-6" loading={uploading} />
          ) : (
            <UploadIcon className="mr-2 h-6 w-6" />
          )}
          {isDragActive ? (
            <p>✨ Release to amaze!</p>
          ) : (
            <p>
              {uploading ? "Uploading..." : "Drag and drop or click to upload"}
            </p>
          )}
        </Card>
      </div>
      <TechnologiesSelect setTechnology={setTechnology} />
    </section>
  )
}

const UrlForm = ({ url, setUrl, onUrlSubmit, submitting }: IUrlFormProps) => {
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onUrlSubmit?.()
      }}
      className="flex space-x-2"
    >
      <Input
        type="text"
        name="url"
        placeholder="Enter image URL or Website URL"
        className="flex-1 border-2  transition-[border] duration-300 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-transparent md:w-[500px]"
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        autoComplete="off"
      />
      <Button
        type="submit"
        disabled={!isValidUrl(url) || submitting}
        className="h-full  border-2 border-primary px-6 transition-all duration-300"
      >
        <LoadingIcon className="mr-2 h-4 w-4" loading={submitting} />
        Submit
      </Button>
    </form>
  )
}

const TechnologiesSelect = ({ setTechnology }: ITechnologiesSelectProps) => {
  return (
    <div className="grid w-[300px] grid-cols-2 gap-2 py-10">
      <Select onValueChange={setTechnology} defaultValue={TECHNOLOGIES[0].id}>
        <SelectTrigger className="col-span-2 h-10">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {TECHNOLOGIES.map((technology, index) => (
            <SelectItem key={index} value={technology.id}>
              {technology.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
