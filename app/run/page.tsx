"use client"

import React, { useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { TAILWIND_HTML_PROMPT } from "~/constants/prompts"
import { SquareIcon } from "lucide-react"

import { createChat } from "~/lib/ai"
import useThrottle from "~/hooks/useThrottle"
import { Button } from "~/components/ui/button"
import { LoadingIcon } from "~/components/loading-icon"

const tailwindCssLink = '<script src="https://cdn.tailwindcss.com"></script>'

const RunPage = () => {
  const searchParams = useSearchParams()
  const { imageUrl } = Object.fromEntries(searchParams)
  const [loadingText] = React.useState("Analyzing")
  const [code, setCode] = React.useState("")

  const throttledCode = useThrottle(code, 200)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  const doChat = async () => {
    const response = await createChat({
      body: {
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: TAILWIND_HTML_PROMPT,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                  detail: "high",
                },
              },
            ],
          },
        ],
        max_tokens: 4096,
        temperature: 0
      },
      type: "vision",
    })

    const data = response.message?.content as ReadableStream<Uint8Array>
    const reader = data?.getReader()
    const decoder = new TextDecoder()
    let done = false
    let aiResponse = ""

    while (!done) {
      const { value, done: doneReading } = (await reader?.read()) as any
      done = doneReading
      const chunkValue = decoder.decode(value)
      aiResponse += chunkValue
      setCode(aiResponse)
    }
  }

  useEffect(() => {
    const iframe = iframeRef.current
    if (iframe && iframe.contentDocument) {
      const doc = iframe.contentDocument
      doc.open()
      doc.write(tailwindCssLink)
      doc.write(throttledCode)
      doc.close()
    }
  }, [throttledCode])

  return (
    <main className="flex h-screen w-full">
      <div className="flex h-full w-[450px] flex-col items-center border-r px-4">
        <div className="gradient-box relative mt-4 w-fit overflow-hidden rounded-[10px] p-1.5 shadow-dialog">
          <img
            src={imageUrl}
            alt="run_image"
            className="relative z-30 w-full animate-pulse rounded-[10px]"
          />
        </div>
        <Button
        onClick={() => doChat()}
        className="mt-4 w-full">
          <SquareIcon className="mr-2 h-3.5 w-3.5" />
          Stop
        </Button>
        <div className="mt-4 flex h-10 w-full items-center justify-center rounded-lg font-medium shadow-tooltip">
          <LoadingIcon className="mr-2 h-4 w-4" loading={true} />
          {loadingText}
        </div>
      </div>
      <div className="flex-1">
        <iframe
          ref={iframeRef}
          title="Preview"
          className="h-full w-full"
        ></iframe>
      </div>
    </main>
  )
}

export default RunPage
