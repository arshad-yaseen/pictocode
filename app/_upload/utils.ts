import { GET } from "~/utils/http.utils"
import { isImageUrl } from "~/utils/misc"

interface ImageUrlResponse {
  screenshotUrl: string
}

export const getImageUrl =  async (url: string): Promise<string> => {
  let imageUrl = ''
  if(await isImageUrl(url)) {
    imageUrl = url
  } else {
    const { screenshotUrl } = await GET<ImageUrlResponse>(`/api/screenshot?url=${url}`)
    imageUrl = screenshotUrl
  }
  return imageUrl
}
