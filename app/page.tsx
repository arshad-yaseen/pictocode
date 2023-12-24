"use client"

import SiteFooter from "~/components/site-footer"
import SiteHeader from "~/components/site-header"
import SiteHero from "~/components/site-hero"

export default function Home() {
  return (
    <main className="h-full w-full px-6 sm:px-10">
      <SiteHeader />
      <SiteHero />
      <SiteFooter />
    </main>
  )
}
