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
    <header className="grid h-[7vh] w-full  grid-cols-3 py-4 ">
      <div className="col-span-2 md:col-span-1">
        <HeaderLogo />
      </div>
      <div className="col-span-1 h-12 items-center justify-end md:col-span-2 ">
        <nav className=" hidden items-center justify-end md:flex ">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            className="flex items-center px-3 py-2 font-medium text-gray-12  ring-offset-2 transition-all duration-200 hover:text-gray-12/80  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary "
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
    aria-label="Home"
    className="flex h-12 w-fit items-center justify-start pr-4 ring-offset-2 transition-all duration-200  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
  >
    <div className="relative h-[54px] w-[54px]">
      <Image src="/icon.png" fill alt="Header Logo" />
      <span className="sr-only">Header Logo</span>
    </div>
    <h2 className="font-inter text-xl font-semibold tracking-tight text-gray-12 sm:font-sans sm:tracking-tighter">
      {siteConfig.short_name}
    </h2>
  </Link>
)

export default SiteHeader
