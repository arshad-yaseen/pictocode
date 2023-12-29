import { Inter } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

export const fontMono = GeistMono

export const fontSans = GeistSans

export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})
