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

interface IUrlFormProps {
  url: string
  setUrl: React.Dispatch<React.SetStateAction<string>>
  onUrlSubmit: () => void
  submitting: boolean
}

interface IFrameworkSelectProps {
  frameworks: { style: string; library: string }
  setFrameworks: React.Dispatch<
    React.SetStateAction<{ style: string; library: string }>
  >
}

const FRAMWORKS = {
  style: ["Tailwind CSS", "CSS"],
  library: ["React", "HTML"],
}

export const UploadersSection = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  const [url, setUrl] = useState<string>("")
  const [frameworks, setFrameworks] = useState<{
    style: string
    library: string
  }>({ style: "Tailwind CSS", library: "React" })
  const router = useRouter()

  const handleUrlSubmit = async () => {
    setSubmitting(true)
    const imageUrl = await getImageUrl(url)
    setSubmitting(false)
    if (!imageUrl) return
    router.push(
      `/run?imageUrl=${imageUrl}&style=${frameworks.style}&library=${frameworks.library}`
    )
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const imageUrl = await uploadImage(file)
    setUploading(false)
    router.push(
      `/run?imageUrl=${imageUrl}&style=${frameworks.style}&library=${frameworks.library}`
    )
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
        className="mx-3 h-10 rounded-full px-6"
        disabled={uploading}
      >
        {
          uploading ? (
            <LoadingIcon className="mr-2 h-4 w-4" loading={uploading} />
          ) : (
            <UploadIcon className="mr-2 h-4 w-4" />
          )
        }
        Upload Image
      </Button>
      <input
        onChange={handleFileChange}
        accept="image/*"
        type="file"
        className="hidden"
        ref={inputRef}
      />
      <FrameworkSelect frameworks={frameworks} setFrameworks={setFrameworks} />
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
      className="flex"
    >
      <Input
        type="text"
        name="url"
        placeholder="Enter image URL or Website URL"
        className="flex-1 rounded-r-none border-2 border-r-transparent transition-[border] duration-300 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-transparent md:w-[500px]"
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        autoComplete="off"
      />
      <Button
        type="submit"
        disabled={!isValidUrl(url) || submitting}
        className="h-full rounded-l-none border-2 border-primary px-6 transition-all duration-300"
      >
        <LoadingIcon className="mr-2 h-4 w-4" loading={submitting} />
        Submit
      </Button>
    </form>
  )
}

const FrameworkSelect = ({
  frameworks,
  setFrameworks,
}: IFrameworkSelectProps) => {
  const onValueChange = (value: string) => {
    const [framework, type] = value.split(":")
    setFrameworks((prev) => ({
      ...prev,
      [type]: framework,
    }))
  }

  return (
    <div className="grid w-[500px] grid-cols-2 gap-2 py-10">
      <Select onValueChange={onValueChange} defaultValue="React:library">
        <SelectTrigger className="col-span-1">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {FRAMWORKS.library.map((framework, index) => (
            <SelectItem key={index} value={`${framework}:library`}>
              {framework}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={onValueChange} defaultValue="Tailwind CSS:style">
        <SelectTrigger className="col-span-1">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {FRAMWORKS.style.map((framework, index) => (
            <SelectItem key={index} value={`${framework}:style`}>
              {framework}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
