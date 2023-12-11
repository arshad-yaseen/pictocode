import * as crypto from "crypto"
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { env } from "../env.mjs"

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export function generateUniqueString(length: number) {
  let uniqueString = Date.now().toString(36)

  uniqueString += Math.random().toString(36).substring(2)

  uniqueString = crypto.createHash("sha256").update(uniqueString).digest("hex")

  uniqueString = uniqueString.substring(0, length)

  return uniqueString
}

export const isImageUrl = async (url: string): Promise<boolean> => {
  // 1. Check URL extension
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".svg",
  ]
  const pathname = new URL(url).pathname
  if (imageExtensions.some((ext) => pathname.endsWith(ext))) {
    return true
  }

  try {
    // 2. Perform a HEAD request to get headers
    const response = await fetch(url, { method: "HEAD" })
    const contentType = response.headers.get("Content-Type")
    if (contentType && contentType.startsWith("image/")) {
      return true
    }
  } catch (error) {
    console.error("Error during HEAD request:", error)
  }

  // 3. Fallback check (optional, might involve CORS issues)
  // This part can be implemented if necessary, involves more complex logic
  // like fetching a small part of the content and checking its nature.
  return false // If all checks fail, return false
}

export const isValidUrl = (url: string) => {
  try {
    let parsedUrl = new URL(url)
    if (!parsedUrl.protocol || !parsedUrl.hostname) {
      return false
    }
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return false
    }
    if (!parsedUrl.hostname.includes(".")) {
      return false
    }
    return true
  } catch (e) {
    return false
  }
}

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

export const openInCodepen = async (code: string) => {
  const form = document.createElement("form")
  form.method = "POST"
  form.action = "https://codepen.io/pen/define"
  form.target = "_blank"
  const input = document.createElement("input")
  input.type = "hidden"
  input.name = "data"
  input.value = JSON.stringify({
    title: "CodePen",
    html: code,
    js: "",
    css: "",
  })
  form.appendChild(input)
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}
