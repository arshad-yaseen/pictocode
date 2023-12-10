"use client"

import * as React from "react"
import copy from "copy-to-clipboard"

export interface useCopyToClipboardProps {
  timeout?: number
}

export function useCopyToClipboard({
  timeout = 2000,
}: useCopyToClipboardProps) {
  const [isCopied, setIsCopied] = React.useState<Boolean>(false)

  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
      return
    }

    if (!value) {
      return
    }

    copy(value)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, timeout)
  }

  return { isCopied, copyToClipboard }
}
