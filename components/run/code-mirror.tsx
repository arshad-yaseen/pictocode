import React, { useMemo, useRef } from "react"

interface ICodeMirrorProps {
  code: string
}

// This component is used to display the code when rendering

const CodeMirror = ({ code }: ICodeMirrorProps) => {
  const codeMirrorRef = useRef<HTMLDivElement>(null)

  useMemo(() => {
    const codeMirrorElement = codeMirrorRef.current
    if (codeMirrorElement) {
      const isFullyScrolledRight =
        codeMirrorElement.scrollLeft >=
        codeMirrorElement.scrollWidth - codeMirrorElement.clientWidth

      if (!isFullyScrolledRight) {
        codeMirrorElement.scrollLeft = codeMirrorElement.scrollWidth
      }
    }
  }, [code])

  return (
    <div
      ref={codeMirrorRef}
      className="hide-scrollbar flex h-12 max-w-full items-center overflow-x-scroll whitespace-nowrap rounded-md bg-foreground px-4 text-gray-4 "
    >
      {code}
    </div>
  )
}

export default CodeMirror
