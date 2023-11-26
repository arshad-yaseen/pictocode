import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    CRYPTO_SECRET_KEY: z.string().min(1),
    API_KEY_SESSION_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY,
    API_KEY_SESSION_KEY: process.env.API_KEY_SESSION_KEY,
  },
})
