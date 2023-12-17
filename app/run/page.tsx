"use client"

import React, { useState } from "react"
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
    setCode("")
    updateIFrame("")
    handleStart()
  }

  // useEffect(() => {
  //   updateIFrame(`
  //     <html>
  //       <body>
  //         <div class="flex h-screen w-full items-center justify-center">
  //           <h1 class="text-2xl font-medium text-gray-500">Loading...</h1>
  //         </div>
  //       </body>
  //     </html>
  //   `)
  //   codeRef.current = `
  //     <html>
  //       <body>
  //         <div class="flex h-screen w-full items-center justify-center">
  //           <h1 class="text-2xl font-medium text-gray-500">Loading...</h1>
  //         </div>
  //       </body>
  //     </html>
  //   `
  // },[codeRef.current, updateIFrame])

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
