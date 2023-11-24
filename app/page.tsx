"use client"

import { useEffect, useRef } from "react"

import useThrottle from "~/hooks/useThrottle"
import SiteHeader from "~/components/site-header"
import SiteHero from "~/components/site-hero"

const tailwindCssLink = '<script src="https://cdn.tailwindcss.com"></script>'

const code = `<div class="container mx-auto p-4">
<div class="max-w-sm rounded overflow-hidden shadow-lg">
    <img class="w-full" src="https://via.placeholder.com/400" alt="Sunset in the mountains">
    <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
        <p class="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
        </p>
    </div>
    <div class="px-6 pt-4 pb-2">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Button
        </button>
    </div>
</div>
</div>`

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
