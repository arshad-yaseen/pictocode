import React, { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { UploadIcon } from "@radix-ui/react-icons"
import { isValidUrl } from "~/utils/misc"

import { Button } from "~/components/ui/button"
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
import { TECHNOLOGIES } from "~/constants/prompts"

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
  const inputRef = useRef<HTMLInputElement>(null)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  const [url, setUrl] = useState<string>("")
  const [technology, setTechnology] = useState<string>(TECHNOLOGIES[0].id)
  const { push } = useRouter()

  const handleUrlSubmit = async () => {
    setSubmitting(true)
    const imageUrl = await getImageUrl(url)
    setSubmitting(false)
    if (!imageUrl) return
    push(`/run?imageUrl=${imageUrl}&technology_id=${technology}`)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const imageUrl = await uploadImage(file)
    setUploading(false)
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
      <Button
        onClick={() => inputRef.current?.click()}
        className="mx-3 h-10 rounded-lg px-6"
        disabled={uploading}
      >
        {uploading ? (
          <LoadingIcon className="mr-2 h-4 w-4" loading={uploading} />
        ) : (
          <UploadIcon className="mr-2 h-4 w-4" />
        )}
        Upload Image
      </Button>
      <input
        onChange={handleFileChange}
        accept="image/*"
        type="file"
        className="hidden"
        ref={inputRef}
      />
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
