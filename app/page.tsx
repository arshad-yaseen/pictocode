"use client"

import { useEffect, useRef } from "react"

import useThrottle from "~/hooks/useThrottle"
import SiteHeader from "~/components/site-header"
import SiteHero from "~/components/site-hero"

const tailwindCssLink = '<script src="https://cdn.tailwindcss.com"></script>'

const code = `<body class="bg-gray-100">

<div class="flex flex-col items-center justify-center min-h-screen p-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Turn your designs into code.</h1>
    <p class="text-gray-600 mb-6">Upload a design or enter an image/website URL. PictoCode generates the code fast and accurately.</p>

    <input type="text" placeholder="Enter image URL or Website URL" class="w-full max-w-md mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400">

    <div class="flex items-center space-x-4">
        <button class="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3.293 4.293a1 1 0 011.414 0L10 9.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            Upload Image
        </button>

        <div class="relative inline-block text-left">
            <button class="inline-flex justify-center w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                React
                <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
</div>

</body>`

export default function Home() {
  const throttledCode = useThrottle(code, 200)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (iframe && iframe.contentDocument) {
      const doc = iframe.contentDocument
      doc.open()
      doc.write(tailwindCssLink)
      doc.write(throttledCode)
      doc.close()
    }
  }, [throttledCode])

  return (
    <main>
      {/* <iframe
        ref={iframeRef}
        title="Preview"
        className='w-screen h-screen'
      ></iframe> */}
      <SiteHeader />
      <SiteHero />
    </main>
  )
}
