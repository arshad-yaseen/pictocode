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

  const rerun = () => {
    codeRef.current = ""
    updateIFrame("")
    handleStart()
  }

  return (
    <main className="flex h-screen w-full">
      <div className="flex h-full w-[300px] flex-col items-center gap-4 border-r p-4">
        <ImagePreview imageUrl={imageUrl} isRunning={isRunning} />
        {isRunning && (
          <div className="flex h-10 w-full items-center justify-center rounded-lg font-medium shadow-tooltip">
            <LoadingIcon className="mr-2 h-4 w-4" loading={true} />
            {loadingText}
          </div>
        )}
        <ControlButtons
          isRunning={isRunning}
          onStart={handleStart}
          onStop={handleStop}
          code={codeRef.current}
          rerun={rerun}
          technology_id={technology_id}
        />
      </div>
      <div className="flex h-full flex-1 flex-col">
        <CodePreview
          iframeVisibleRef={iframeVisibleRef}
          iframeBufferRef={iframeBufferRef}
        />
      </div>
    </main>
  )
}

export default RunPage
