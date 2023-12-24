import React, { useEffect } from "react"
import { IFileDropzoneProps } from "~/interfaces"
import { cn } from "~/utils/misc"
import {
  addDocumentImagePasteListener,
  uploadImage,
} from "~/utils/uploaders.utils"
import { UploadIcon } from "lucide-react"
import { useDropzone } from "react-dropzone"

import { Card } from "~/components/ui/card"
import { LoadingIcon } from "~/components/loading-icon"

const FileDropzone: React.FC<IFileDropzoneProps> = ({
  setUploading,
  uploading,
  technology,
  push,
}) => {
  // Upload image to cloudinary and redirect to run page
  const processFile = async (file: File) => {
    if (!file) return
    setUploading(true)
    const imageUrl = await uploadImage(file)
    setUploading(false)
    if (imageUrl) {
      push(`/run?imageUrl=${imageUrl}&technology_id=${technology}`)
    }
  }

  // Handle file drop
  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    await processFile(file)
  }

  // Handle image paste from clipboard
  useEffect(() => {
    const removePasteListener = addDocumentImagePasteListener(
      async (file: File) => {
        await processFile(file)
      }
    )

    return () => {
      removePasteListener()
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className="w-full flex justify-center">
      <input {...getInputProps()} />
      <Card
        className={cn(
          "flex h-[200px] md:w-[600px] w-full cursor-pointer  flex-col items-center justify-center gap-y-4 text-gray-11 transition-shadow duration-200 hover:shadow-tooltip",
          isDragActive ? "shadow-tooltip" : "shadow-border-small"
        )}
      >
        <LoadingIcon className="mr-2 h-6 w-6" loading={uploading} />
        {!uploading && <UploadIcon className="mr-2 h-6 w-6" />}
        <p>
          {isDragActive
            ? "✨ Release to amaze!"
            : uploading
              ? "Uploading..."
              : "Drag and drop or click to upload"}
        </p>
      </Card>
    </div>
  )
}

export default FileDropzone
