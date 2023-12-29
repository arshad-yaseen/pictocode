"use client"

import React, { useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ERROR } from "~/constants/res-messages"
import { TECHNOLOGY } from "~/types"
import { generateCode } from "~/utils/run.utils"
import { toast } from "sonner"

import { useIframeThrottle } from "~/hooks/use-iframe-trottle"
import { Textarea } from "~/components/ui/textarea"
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
  const [extraInstructions, setExtraInstructions] = useState<string>("")

  // This is used to stop the rendering process.
  let stopRendering = useRef<boolean>(false)

  const handleStart = async () => {
    setIsRunning(true)
    setLoadingText("Starting Rendering...")
    try {
      await generateCode({
        imageUrl: imageUrl,
        setIsBringApiKeyDialogOpen,
        updateIFrame,
        extraInstructions,
        technology_id: technology_id as TECHNOLOGY,
        setCode,
        setIsRunning,
        setLoadingText,
        stop: stopRendering,
      })
    } catch (error) {
      toast.error(ERROR.ERROR_RENDER_CODE)
    } finally {
      stopRendering.current = false
      setLoadingText("")
      setIsRunning(false)
    }
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
    <main className="flex h-[200vh] w-full   flex-col md:h-screen md:flex-row">
      <div className="flex w-full flex-col items-center gap-4 border-r p-4 md:h-full md:w-[300px]">
        {/* 
          The preview of the uploaded image.
        */}
        <ImagePreview imageUrl={imageUrl} isRunning={isRunning} />

        <Textarea
          value={extraInstructions}
          onChange={(e) => setExtraInstructions(e.target.value)}
          className="max-h-[150px] w-full flex-1 resize-none"
          placeholder="Enter extra instructions here"
        />
        {/* 
          Control buttons iclude:
          - Select technology
          - Run/Stop button
          - CodeMirror
        */}
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
        {/* 
          The preview of the code, rendered in an iframe.
        */}
        <Preview
          iframeVisibleRef={iframeVisibleRef}
          iframeBufferRef={iframeBufferRef}
          code={code}
          isRunning={isRunning}
          loadingText={loadingText}
          technology_id={technology_id as TECHNOLOGY}
        />
      </div>
      {/* 
        This dialog is used to bring the API key from the user.
      */}
      <BringApiKey
        noTrigger
        isOpen={isBringApiKeyDialogOpen}
        setIsOpen={setIsBringApiKeyDialogOpen}
      />
    </main>
  )
}

export default RunPage
