import { JetBrains_Mono, Newsreader } from "next/font/google"
import { GeistSans } from "geist/font/sans"

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontSans = GeistSans
export const fontQuote = Newsreader({
  subsets: ["latin"],
  variable: "--font-quote",
})
