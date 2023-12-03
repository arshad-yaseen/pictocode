"use client"

import React, { useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { buildPrompt, createChat } from "~/utils/ai"
import { PlayIcon, SquareIcon } from "lucide-react"

import useThrottle from "~/hooks/use-throttle"
import { Button } from "~/components/ui/button"
import { LoadingIcon } from "~/components/loading-icon"

const tailwindCssLink = '<script src="https://cdn.tailwindcss.com"></script>'

const RunPage = () => {
  const searchParams = useSearchParams()
  const { imageUrl, technology_id } = Object.fromEntries(searchParams)
  const [loadingText, setLoadingText] = React.useState("")
  const [isRunning, setIsRunning] = React.useState(false)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [finalCode, setFinalCode] = React.useState("")

  const aiResponseRef = useRef("")

  const updateIFrame = (code: string) => {
    const iframe = iframeRef.current
    if (iframe && iframe.contentDocument) {
      const doc = iframe.contentDocument
      doc.open()
      doc.write(tailwindCssLink)
      doc.write(code)
      doc.close()
    }
  }

  const updateIFrameThrottled = useThrottle(updateIFrame, 200)

  const doChat = async () => {
    const response = await createChat({
      body: {
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: buildPrompt(technology_id),
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
        temperature: 0,
      },
      type: "vision",
    })

    const data = response.message?.content as ReadableStream<Uint8Array>
    const reader = data?.getReader()
    const decoder = new TextDecoder()
    let done = false

    const timeout = setTimeout(() => {
      setLoadingText("Rendering...")
    }, 3000)

    while (!done) {
      const { value, done: doneReading } = (await reader?.read()) as any
      done = doneReading
      const chunkValue = decoder.decode(value)
      aiResponseRef.current += chunkValue
      updateIFrameThrottled(aiResponseRef.current)
    }

    setFinalCode(aiResponseRef.current)
    console.log(aiResponseRef.current);
    
    setLoadingText("")
    setIsRunning(false)
    clearTimeout(timeout)
  }

  useEffect(() => {
    // Initial iframe setup
    updateIFrame("")
  }, [])

  const handleStart = () => {
    setIsRunning(true)
    setLoadingText("Starting Rendering...")
    doChat()
  }

  const handleStop = () => {
    setIsRunning(false)
    setLoadingText("")
  }

  return (
    <main className="flex h-screen w-full">
      <div className="flex h-full w-[300px] flex-col items-center border-r px-4">
        <div className="gradient-box relative mt-4 w-fit overflow-hidden rounded-[10px] p-1.5 shadow-dialog">
          <img
            src={imageUrl}
            alt="run_image"
            className="relative z-30 w-full animate-pulse rounded-[10px]"
          />
        </div>
        <Button
          onClick={() => {
            if (!isRunning) {
              handleStart()
            }
          }}
          className="mt-4 w-full"
        >
          {isRunning ? (
            <SquareIcon className="mr-2 h-4 w-4" />
          ) : (
            <PlayIcon className="mr-2 h-4 w-4" />
          )}
          {isRunning ? "Stop" : "Start"}
        </Button>
        {isRunning && (
          <div className="mt-4 flex h-10 w-full items-center justify-center rounded-lg font-medium shadow-tooltip">
            <LoadingIcon className="mr-2 h-4 w-4" loading={true} />
            {loadingText}
          </div>
        )}
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
