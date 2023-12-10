import React from "react"

interface CodePreviewProps {
  iframeVisibleRef: React.RefObject<HTMLIFrameElement>
  iframeBufferRef: React.RefObject<HTMLIFrameElement>
}

const CodePreview = ({
  iframeVisibleRef,
  iframeBufferRef,
}: CodePreviewProps) => {
  return (
    <div className="relative h-full w-full">
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
    </div>
  )
}

export default CodePreview
