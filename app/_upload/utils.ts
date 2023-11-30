import { GET } from "~/utils/http.utils"
import { fileToBase64, isImageUrl } from "~/utils/misc"
import { toast } from "sonner"

import { cloudinary } from "~/lib/cloudinary"

interface ImageUrlResponse {
  screenshotUrl: string
}

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
