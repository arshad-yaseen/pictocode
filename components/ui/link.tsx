import React, { HTMLAttributeAnchorTarget } from "react"
import NextLink from "next/link"
import { cn } from "~/utils/misc"

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  href: string
  target?: HTMLAttributeAnchorTarget
  className?: string
}

const Link = ({ children, href, target, ...props }: LinkProps) => {
  return (
    <NextLink
      href={href}
      target={target}
      className={cn(
        "font-paragraph  underline decoration-gray-8 decoration-[1px] underline-offset-[5px] transition-colors duration-200 hover:decoration-gray-11"
      )}
      {...props}
    >
      {children}
    </NextLink>
  )
}

export default Link
