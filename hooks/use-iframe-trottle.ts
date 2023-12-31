import { useCallback, useRef } from "react"
import _ from "lodash"

const _tailwind_script = `<script src="https://cdn.tailwindcss.com"></script>`

export const useIframeThrottle = () => {
  const iframeVisibleRef = useRef<HTMLIFrameElement | null>(null)
  const iframeBufferRef = useRef<HTMLIFrameElement | null>(null)

  const swapIFrames = () => {
    if (iframeVisibleRef.current && iframeBufferRef.current) {
      // Swap the iframe references
      ;[iframeVisibleRef.current, iframeBufferRef.current] = [
        iframeBufferRef.current,
        iframeVisibleRef.current,
      ]

      // For smooth transition, we set the opacity and visibility of the iframe.
      iframeVisibleRef.current.style.opacity = "1"
      iframeVisibleRef.current.style.visibility = "visible"
      iframeBufferRef.current.style.opacity = "0"
      iframeBufferRef.current.style.visibility = "hidden"
    }
  }

  const debounceIframeUpdate = useCallback(
    _.debounce((code: string) => {
      const iframe = iframeBufferRef.current
      if (iframe && iframe.contentWindow && iframe.contentDocument) {
        iframe.contentDocument.open()
        iframe.contentDocument.write(_tailwind_script + code)
        iframe.contentDocument.close()
        swapIFrames()
      }
    }, 50),
    []
  )

  return {
    iframeVisibleRef,
    iframeBufferRef,
    updateIFrame: debounceIframeUpdate,
  }
}
