import { env } from "~/env.mjs"

export const upload = async (base64: string) => {
  if (base64) {
    const imageRes = await fetch(
      `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          upload_preset: env.CLOUDINARY_UPLOAD_PRESET,
          api_key: env.CLOUDINARY_API_KEY,
          file: base64
        }),
      }
    )

    const res = await imageRes.json()
    return res
  }

  return null
}

export const cloudinary = {
  upload,
}