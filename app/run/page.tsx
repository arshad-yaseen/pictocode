"use client"

import React, { useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { TECHNOLOGY } from "~/types"
import { generateCode } from "~/utils/run.utils"

import { useIframeThrottle } from "~/hooks/use-iframe-trottle"
import BringApiKey from "~/components/bring-api-key"
import ControlButtons from "~/components/run/control-buttons"
import ImagePreview from "~/components/run/image-preview"
import Preview from "~/components/run/preview"

const RunPage = () => {
  const searchParams = useSearchParams()
  const { imageUrl, technology_id } = Object.fromEntries(searchParams)
  const [loadingText, setLoadingText] = useState<string>("")
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [isBringApiKeyDialogOpen, setIsBringApiKeyDialogOpen] =
    useState<boolean>(false)
  const [code, setCode] = useState<string>("")
  const { iframeVisibleRef, iframeBufferRef, updateIFrame } =
    useIframeThrottle()

  // This is used to stop the rendering process.
  let stopRendering = useRef<boolean>(false)

  const handleStart = () => {
    setIsRunning(true)
    setLoadingText("Starting Rendering...")
    generateCode({
      imageUrl: imageUrl,
      setIsBringApiKeyDialogOpen,
      updateIFrame,
      technology_id: technology_id as TECHNOLOGY,
      setCode,
      setIsRunning,
      setLoadingText,
      stop: stopRendering,
    }).finally(() => {
      setLoadingText("")
      setIsRunning(false)
    })
  }

  const handleStop = () => {
    stopRendering.current = true
    setIsRunning(false)
    reset()
  }

  const rerun = () => {
    reset()
    handleStart()
  }

  const reset = () => {
    setCode("")
    updateIFrame("")
    setLoadingText("")
  }

  return (
    <main className="flex h-screen w-full">
      <div className="flex h-full w-[300px] flex-col items-center gap-4 border-r p-4">
        <ImagePreview imageUrl={imageUrl} isRunning={isRunning} />
        <ControlButtons
          isRunning={isRunning}
          onStart={handleStart}
          onStop={handleStop}
          code={code}
          rerun={rerun}
          technology_id={technology_id}
        />
      </div>
      <div className="flex h-full flex-1 flex-col">
        <Preview
          iframeVisibleRef={iframeVisibleRef}
          iframeBufferRef={iframeBufferRef}
          code={code}
          isRunning={isRunning}
          loadingText={loadingText}
          technology_id={technology_id as TECHNOLOGY}
        />
      </div>
      <BringApiKey
        noTrigger
        isOpen={isBringApiKeyDialogOpen}
        setIsOpen={setIsBringApiKeyDialogOpen}
      />
    </main>
  )
}

export default RunPage
