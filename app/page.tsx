"use client"

import SiteHeader from "~/components/site-header"
import SiteHero from "~/components/site-hero"

export default function Home() {
  return (
    <main className="h-full w-full px-6 sm:px-10">
      {/* <div className="jumbo absolute inset-[-10px] opacity-[8%]"></div> */}
      <SiteHeader />
      <SiteHero />
    </main>
  )
}
