import { env } from "~/env.mjs"

export const upload = async (base64: string) => {
  if (base64) {
    const imageRes = await fetch(
      `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          upload_preset: env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
          file: base64,
        }),
      }
    )

    if (!imageRes.ok) {
      throw new Error(`HTTP error: ${imageRes.status} ${imageRes.statusText}`)
    }

    const res = await imageRes.json()
    return res
  }

  return null
}

export const cloudinary = {
  upload,
}
