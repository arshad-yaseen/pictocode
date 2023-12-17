import React, { useEffect, useRef } from "react"

interface ICodeMirrorProps {
  code: string
}

const CodeMirror = ({ code }: ICodeMirrorProps) => {
  const codeMirrorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (codeMirrorRef.current) {
      // keep fully scrolled to the right
      const codeMirror = codeMirrorRef.current
      codeMirror.scrollLeft = codeMirror.scrollWidth
    }
  }, [code])

  return (
    <div
      ref={codeMirrorRef}
      className="hide-scrollbar flex  h-12 max-w-full items-center overflow-x-scroll whitespace-nowrap rounded-md bg-foreground px-4 text-background"
    >
      {code}
    </div>
  )
}

export default CodeMirror
