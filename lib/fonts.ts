import { JetBrains_Mono } from "next/font/google"
import { GeistSans } from "geist/font/sans"

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontSans = GeistSans
