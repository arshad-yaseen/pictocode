import React from "react"
import Image from "next/image"
import Link from "next/link"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { EqualIcon } from "lucide-react"

import { siteConfig } from "~/config/site"
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet"
import BringApiKey from "~/components/bring-api-key"
import MobileNav from "~/components/mobile-nav"

const SiteHeader = () => {
  return (
    <header className="grid h-[7vh] w-full  grid-cols-3 py-4">
      <HeaderLogo />
      <div className="col-span-1 h-12 items-center justify-end md:col-span-2 ">
        <nav className=" hidden items-center justify-end md:flex">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            className="flex items-center px-3 py-2 font-medium text-gray-12 transition-colors hover:text-gray-12/80"
          >
            <GitHubLogoIcon className="mr-2 inline-block h-4 w-4" />
            Github
          </Link>
          <BringApiKey />
        </nav>
        <Sheet>
          <SheetTrigger className="flex h-full w-full items-center justify-end md:hidden">
            <EqualIcon className="h-7 w-7 text-gray-12" />
          </SheetTrigger>
          <SheetContent className="w-screen border-none  shadow-none sm:max-w-full">
            <MobileNav />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export const HeaderLogo = () => (
  <Link
    href="/"
    className="col-span-2 flex h-12 items-center justify-start md:col-span-1"
  >
    <div className="relative h-[54px] w-[54px]">
      <Image src="/icon.png" fill alt="Header Logo" />
      <span className="sr-only">Header Logo</span>
    </div>
    <h2 className="text-xl font-semibold text-gray-12 sm:tracking-tighter tracking-tight sm:font-sans font-inter">
      {siteConfig.short_name}
    </h2>
  </Link>
)

export default SiteHeader
