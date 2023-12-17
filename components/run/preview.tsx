import { useRef } from "react"
import { EVENT_PUB_PREVIEW_SIZE } from "~/constants/run"
import { cn } from "~/utils/misc"
import { Resizable } from "re-resizable"

import { useSub } from "~/hooks/use-pub-sub"
import { LoadingIcon } from "~/components/loading-icon"

interface PreviewProps {
  iframeVisibleRef: React.RefObject<HTMLIFrameElement>
  iframeBufferRef: React.RefObject<HTMLIFrameElement>
  code: string | null
  isRunning: boolean
  loadingText?: string
}

const Preview = ({
  iframeVisibleRef,
  iframeBufferRef,
  code,
  isRunning,
  loadingText,
}: PreviewProps) => {
  const isResizableActive = !!code && !isRunning
  const previewRef = useRef<Resizable>(null)

  const handlePreviewSizeChange = (size: number) => {
    if (previewRef.current) {
      previewRef.current.updateSize({
        width: size,
        height: "100%",
      })
    }
  }

  // Subscribe to the preview size change event
  useSub(EVENT_PUB_PREVIEW_SIZE, handlePreviewSizeChange)

  if (isRunning && !code)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingIcon className="mr-2 h-4 w-4" loading={true} />
        {loadingText}
      </div>
    )

  return (
    <div className="relative h-full w-full">
      <Resizable
        defaultSize={{
          width: "100%",
          height: "100%",
        }}
        maxWidth={"100%"}
        minWidth={"375px"}
        enable={{
          right: isResizableActive,
          left: isResizableActive,
        }}
        className={cn("relative mx-auto  transition-colors duration-300", {
          border: isResizableActive,
        })}
        ref={previewRef}
      >
        <iframe
          ref={iframeVisibleRef}
          title="Visible Preview"
          className="absolute left-0 top-0 h-full w-full transition-opacity duration-500"
          style={{ opacity: "1" }}
        ></iframe>
        <iframe
          ref={iframeBufferRef}
          title="Buffer Preview"
          className="absolute left-0 top-0 h-full w-full transition-opacity duration-500"
          style={{ opacity: "0" }}
        ></iframe>
      </Resizable>
    </div>
  )
}

export default Preview
