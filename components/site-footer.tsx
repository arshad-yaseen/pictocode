"use client"

import React from "react"

import { siteConfig } from "~/config/site"
import Link from "~/components/ui/link"

function SiteFooter() {
  return (
    <div className="container bottom-0 flex flex-col items-center justify-center gap-4 py-6 md:fixed md:h-24 md:flex-row md:py-0">
      <div className="flex flex-col items-center gap-4 px-6 md:flex-row md:gap-2 md:px-0">
        <p className="text-center text-sm leading-loose md:text-left">
          Built by{" "}
          <Link
            href={siteConfig.creator.twitter}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 ring-offset-2 transition-all duration-200  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary "
          >
            {siteConfig.creator.name}
          </Link>
          . Hosted on{" "}
          <Link
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 ring-offset-2 transition-all duration-200  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary "
          >
            Vercel
          </Link>
          . The source code is available on{" "}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 ring-offset-2 transition-all duration-200  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary "
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SiteFooter
