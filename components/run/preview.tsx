import { useRef, useState } from "react"
import { EVENT_PUB_PREVIEW_SIZE } from "~/constants/run"
import { TECHNOLOGY } from "~/types"
import { cn } from "~/utils/misc"
import { Resizable } from "re-resizable"

import { useSub } from "~/hooks/use-pub-sub"
import { withPreviewLoading } from "~/components/HOCs/with-preview-loading"

export interface PreviewProps {
  iframeVisibleRef: React.RefObject<HTMLIFrameElement>
  iframeBufferRef: React.RefObject<HTMLIFrameElement>
  code: string | null
  isRunning: boolean
  loadingText?: string
  technology_id: TECHNOLOGY
}

const Preview = ({
  iframeVisibleRef,
  iframeBufferRef,
  code,
  isRunning,
}: PreviewProps) => {
  const isResizableActive = !!code && !isRunning
  const previewRef = useRef<Resizable>(null)
  const [isPreviewSizeChanged, setIsPreviewSizeChanged] = useState(false)

  const handlePreviewSizeChange = (size: number) => {
    if (previewRef.current) {
      previewRef.current.updateSize({
        width: size,
        height: "100%",
      })
      setIsPreviewSizeChanged(true)
    }
  }

  // Subscribe to the preview size change event
  useSub(EVENT_PUB_PREVIEW_SIZE, handlePreviewSizeChange)

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
          // If the preview size is changed, add a border to the preview
          border: isResizableActive && isPreviewSizeChanged,
        })}
        ref={previewRef}
      >
        <iframe
          ref={iframeVisibleRef}
          title="Visible Preview"
          className="absolute left-0 top-0 h-full w-full transition-all duration-500"
          style={{ opacity: "1", visibility: "visible" }}
        ></iframe>
        <iframe
          ref={iframeBufferRef}
          title="Buffer Preview"
          className="absolute left-0  top-0 h-full w-full transition-all duration-500"
          style={{ opacity: "0", visibility: "hidden" }}
        ></iframe>
      </Resizable>
    </div>
  )
}

export default withPreviewLoading(Preview)
