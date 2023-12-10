"use client"

import React, { useCallback, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { buildPrompt, createChat } from "~/utils/ai"
import { Code2Icon, CodepenIcon, PlayIcon, SquareIcon } from "lucide-react"

import { Button } from "~/components/ui/button"
import { LoadingIcon } from "~/components/loading-icon"
import _ from "lodash"

const tailwindCssLink = '<script src="https://cdn.tailwindcss.com"></script>'

const RunPage = () => {
  const searchParams = useSearchParams()
  const { imageUrl, technology_id } = Object.fromEntries(searchParams)
  const [loadingText, setLoadingText] = React.useState("")
  const [isRunning, setIsRunning] = React.useState(false)
  const iframeVisibleRef = useRef<HTMLIFrameElement | null>(null);
  const iframeBufferRef = useRef<HTMLIFrameElement | null>(null);
  
  const aiResponseRef = useRef("")
  
  // Function to swap the iframes
  const swapIFrames = () => {
    if (iframeVisibleRef.current && iframeBufferRef.current) {
      // Swap the iframe references
      [iframeVisibleRef.current, iframeBufferRef.current] = [iframeBufferRef.current, iframeVisibleRef.current];

      // Apply CSS to transition the visibility
      iframeVisibleRef.current.style.opacity = '1';
      iframeBufferRef.current.style.opacity = '0';
    }
  };

  const debounceIframeUpdate = useCallback(_.debounce((code: string) => {
    const iframe = iframeBufferRef.current;
    if (iframe && iframe.contentWindow && iframe.contentDocument) {
      iframe.contentDocument.open();
      iframe.contentDocument.write(tailwindCssLink + code);
      iframe.contentDocument.close();
      swapIFrames();
    }
  }, 100), []);

  const updateIFrame = (code: string) => {
    debounceIframeUpdate(code);
  };

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
      aiResponseRef.current += chunkValue;
      updateIFrame(aiResponseRef.current);
    }
    
   // Clear loading state
   setLoadingText('');
   setIsRunning(false);
   clearTimeout(timeout);
  }


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
        <div className="gradient-box relative mt-4 w-fit overflow-hidden rounded-[10px] p-1.5 shadow-tooltip">
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
          className="mt-4 w-full h-10"
          variant={isRunning ? "default" : "outline"}
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
        <Button
          className="mt-4 w-full h-10"
        >
            <Code2Icon className="mr-2 h-4 w-4" />
            Code
        </Button>
        <Button
          className="mt-4 w-full h-10"
        >
            <CodepenIcon className="mr-2 h-4 w-4" />
            Open in CodePen
        </Button>
      </div>
      <div className="flex-1 relative">
        <iframe
          ref={iframeVisibleRef}
          title="Visible Preview"
          className="absolute top-0 left-0 h-full w-full transition-opacity duration-500"
          style={{ opacity: '1' }} // Visible iframe
        ></iframe>
        <iframe
          ref={iframeBufferRef}
          title="Buffer Preview"
          className="absolute top-0 left-0 h-full w-full transition-opacity duration-500"
          style={{ opacity: '0' }} // Hidden iframe, used for buffering
        ></iframe>
      </div>
    </main>
  )
}

export default RunPage
