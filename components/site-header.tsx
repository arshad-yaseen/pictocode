import React from "react"
import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "~/config/site"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import BringApiKey from "~/components/bring-api-key"

const SiteHeader = () => {
  return (
    <header className="grid h-[7vh] w-full grid-cols-2 px-10 py-4 md:grid-cols-3">
      <Link
        href="/"
        className="col-span-1 flex h-12 items-center justify-start md:col-span-1"
      >
        <div className="relative h-[54px] w-[54px]">
          <Image src="/icon.png" fill alt="Header Logo" />
          <span className="sr-only">Header Logo</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-12">
          {siteConfig.short_name}
        </h2>
      </Link>
      <div className="col-span-1  h-12 items-center justify-end md:col-span-2">
        <nav className="flex items-center justify-end">
          <Badge
            className="mx-3 h-8 rounded-full bg-gray-4 px-4 font-medium text-gray-12 hover:bg-gray-5"
            variant={"secondary"}
          >
            1 Credit
          </Badge>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            className="px-3 py-2 font-medium text-gray-12 transition-colors hover:text-gray-12/80"
          >
            Github
          </Link>
          <BringApiKey />
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader
