import { GET } from "~/utils/http.utils"
import { fileToBase64, isImageUrl } from "~/utils/misc"
import { toast } from "sonner"

import { cloudinary } from "~/lib/cloudinary"

interface ImageUrlResponse {
  screenshotUrl: string
}

type DocumentImagePasteCallback = (file: File) => void

export const getImageUrl = async (url: string): Promise<string> => {
  let imageUrl = ""
  if (await isImageUrl(url)) {
    imageUrl = url
  } else {
    try {
      const { screenshotUrl } = await GET<ImageUrlResponse>(
        `/api/screenshot?url=${url}`
      )
      imageUrl = screenshotUrl
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  return imageUrl
}

export const uploadImage = async (file: File): Promise<string> => {
  const base64 = await fileToBase64(file)
  const { secure_url } = await cloudinary.upload(base64)
  return secure_url
}

// handling the paste event
const pasteHandler = (
  event: ClipboardEvent,
  callback: DocumentImagePasteCallback
) => {
  if (!event.clipboardData) return
  const items = event.clipboardData.items

  for (const item of Object.values(items)) {
    if (item.type.indexOf("image") !== -1) {
      const file = item.getAsFile()
      if (!file) return
      callback(file)
      break
    }
  }
}

export const documentImagePasteListener = (
  callback: DocumentImagePasteCallback
): (() => void) => {
  const boundPasteHandler = (event: ClipboardEvent) =>
    pasteHandler(event, callback)
  document.addEventListener("paste", boundPasteHandler)

  // Return a function to remove the event listener
  return () => {
    document.removeEventListener("paste", boundPasteHandler)
  }
}
