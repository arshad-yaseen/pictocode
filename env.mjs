import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    CRYPTO_SECRET_KEY: z.string().min(1),
    API_KEY_SESSION_KEY: z.string().min(1),
    CLOUDINARY_CLOUD_NAME: z.string().min(1),
    CLOUDINARY_UPLOAD_PRESET: z.string().min(1),
    CLOUDINARY_API_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY,
    API_KEY_SESSION_KEY: process.env.API_KEY_SESSION_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  },
})
