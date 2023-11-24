import React from "react"
import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "~/config/site"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"

const SiteHeader = () => {
  return (
    <header className="grid h-12 w-full grid-cols-2 px-10 py-4 md:grid-cols-3">
      <Link
        href="/"
        className="col-span-1 flex h-12 items-center justify-start md:col-span-1"
      >
        <div className="relative h-[54px] w-[54px]">
          <Image src="/icon.png" fill alt="Header Logo" />
          <span className="sr-only">Header Logo</span>
        </div>
        <h2 className="text-gray-12 text-xl font-semibold">
          {siteConfig.short_name}
        </h2>
      </Link>
      <div className="col-span-1  h-12 items-center justify-end md:col-span-2">
        <nav className="flex justify-end items-center">
        <Badge className="mx-3 rounded-full h-8 px-4 bg-gray-4 hover:bg-gray-5" variant={"secondary"}>
            3 Credits
          </Badge>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            className="text-gray-12 hover:text-gray-11 px-3 py-2 font-medium transition-colors"
          >
            Github
          </Link>
          <Button className="mx-3 rounded-full">Buy Credits</Button>
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader
