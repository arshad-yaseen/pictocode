"use client"

import React, { useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { generateCode } from "~/utils/run.utils"

import { useIframeThrottle } from "~/hooks/use-iframe-trottle"
import { LoadingIcon } from "~/components/loading-icon"
import CodePreview from "~/components/run/code-preview"
import ControlButtons from "~/components/run/control-buttons"
import ImagePreview from "~/components/run/image-preview"

const RunPage = () => {
  const searchParams = useSearchParams()
  const { imageUrl, technology_id } = Object.fromEntries(searchParams)
  const [loadingText, setLoadingText] = useState<string>("")
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const codeRef = useRef<string>("")
  const { iframeVisibleRef, iframeBufferRef, updateIFrame } =
    useIframeThrottle()

  const handleStart = () => {
    setIsRunning(true)
    setLoadingText("Starting Rendering...")
    generateCode({
      imageUrl: imageUrl,
      setIsRunning,
      setLoadingText,
      updateIFrame,
      technology_id: technology_id,
      codeRef,
    }).finally(() => {
      setLoadingText("")
      setIsRunning(false)
    })
  }

  const handleStop = () => {
    setIsRunning(false)
    setLoadingText("")
  }

  return (
    <main className="flex h-screen w-full">
      <div className="flex h-full w-[300px] flex-col items-center border-r px-4">
        <ImagePreview imageUrl={imageUrl} isRunning={isRunning} />
        <ControlButtons
          isRunning={isRunning}
          onStart={handleStart}
          onStop={handleStop}
        />
        {isRunning && (
          <div className="mt-4 flex h-10 w-full items-center justify-center rounded-lg font-medium shadow-tooltip">
            <LoadingIcon className="mr-2 h-4 w-4" loading={true} />
            {loadingText}
          </div>
        )}
      </div>
      <div className="flex h-full flex-1 flex-col">
        <div className="h-12 min-w-full border-b bg-white"></div>
        <CodePreview
          iframeVisibleRef={iframeVisibleRef}
          iframeBufferRef={iframeBufferRef}
        />
      </div>
    </main>
  )
}

export default RunPage
