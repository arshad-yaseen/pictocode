import React from "react"
import Link from "next/link"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { cn } from "~/utils/misc"

import { siteConfig } from "~/config/site"
import { buttonVariants } from "~/components/ui/button"
import BringApiKey from "~/components/bring-api-key"
import { HeaderLogo } from "~/components/site-header"

const MobileNav = () => {
  return (
    <>
      <div className="-mt-2 flex w-full items-center justify-between">
        <HeaderLogo />
      </div>
      <div className="py-4" />
      <div className="flex h-full w-full flex-col space-y-4">
        <nav className="flex flex-col gap-4">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "w-full rounded-lg text-gray-12"
            )}
          >
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
            Github
          </Link>
          <BringApiKey />
        </nav>
      </div>
    </>
  )
}

export default MobileNav
