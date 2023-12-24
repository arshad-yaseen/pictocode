import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { DEFAULT_TECHNOLOGY } from "~/constants/prompts"
import { TECHNOLOGY } from "~/types"
import { getImageUrl } from "~/utils/uploaders.utils"

import FileDropzone from "~/components/uploaders/file-dropzone"
import TechnologiesSelect from "~/components/uploaders/technologies-select"
import UrlForm from "~/components/uploaders/url-form"

export const UploadersSection: React.FC = () => {
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [url, setUrl] = useState("")
  const [technology, setTechnology] = useState<TECHNOLOGY | null>(
    DEFAULT_TECHNOLOGY
  )
  const { push } = useRouter()

  const handleUrlSubmit = async () => {
    setSubmitting(true)
    const imageUrl = await getImageUrl(url)
    setSubmitting(false)
    if (imageUrl) {
      push(`/run?imageUrl=${imageUrl}&technology_id=${technology}`)
    }
  }

  return (
    <section className="flex w-full flex-col items-center">
      <UrlForm
        url={url}
        setUrl={setUrl}
        onUrlSubmit={handleUrlSubmit}
        submitting={submitting}
      />
      <p className="my-4 text-gray-11">or</p>
      <FileDropzone
        setUploading={setUploading}
        uploading={uploading}
        technology={technology}
        push={push}
      />
      <TechnologiesSelect
        setTechnology={setTechnology}
        className="w-full py-10 md:w-[300px]"
      />
    </section>
  )
}
