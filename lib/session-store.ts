import "server-only"

import { cookies } from "next/headers"

import { env } from "~/env.mjs"
import { decrypt, encrypt } from "~/lib/crypto"

export function get(key: string) {
  const cookieStore = cookies()
  return cookieStore.get(key)?.value
}

export function set(key: string, value: string) {
  const cookieStore = cookies()
  return cookieStore.set(key, value, {
    // 1 month
    maxAge: 60 * 60 * 24 * 30,
    // preventing cookie theft via man-in-the-middle attacks.
    secure: true,
    // mitigate the risk of client-side script accessing the protected cookie, thus reducing the risk of XSS attacks.
    httpOnly: true,
    // providing some protection against cross-site request forgery (CSRF) attacks.
    sameSite: "strict",
  })
}

export const setWithEncryption = (key: string, value: string) => {
  const encryptedValue = encrypt(value, env.CRYPTO_SECRET_KEY)
  set(key, encryptedValue)
}

export const getWithDecryption = (key: string) => {
  const encryptedValue = get(key)
  if (!encryptedValue) return
  return decrypt(encryptedValue, env.CRYPTO_SECRET_KEY)
}

export function del(key: string) {
  const cookieStore = cookies()
  return cookieStore.delete(key)
}
