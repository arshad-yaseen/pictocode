import { useCallback, useRef } from "react"
import _ from "lodash"

const tailwindCssLink = '<script src="https://cdn.tailwindcss.com"></script>'

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

      // For smooth transition, we set the opacity of the iframeBuffer to 0
      iframeVisibleRef.current.style.opacity = "1"
      iframeBufferRef.current.style.opacity = "0"
    }
  }

  const debounceIframeUpdate = useCallback(
    _.debounce((code: string) => {
      const iframe = iframeBufferRef.current
      if (iframe && iframe.contentWindow && iframe.contentDocument) {
        iframe.contentDocument.open()
        iframe.contentDocument.write(tailwindCssLink + code)
        iframe.contentDocument.close()
        swapIFrames()
      }
    }, 100),
    []
  )

  return {
    iframeVisibleRef,
    iframeBufferRef,
    updateIFrame: debounceIframeUpdate,
  }
}
