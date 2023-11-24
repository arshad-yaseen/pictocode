import React, { useRef } from "react"
import { UploadIcon } from "@radix-ui/react-icons"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

const UploadersSection = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <section className="flex w-full flex-col items-center">
      <Input
        type="text"
        placeholder="Enter image URL or Website URL"
        className="w-[500px] border-2 transition-[border] duration-300 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-transparent"
      />
      <p className="my-4 text-gray-10">or</p>
      <Button
        onClick={() => inputRef.current?.click()}
        className="mx-3 h-10 rounded-full px-6"
      >
        <UploadIcon className="mr-2 h-4 w-4" />
        Upload Image
      </Button>
      <input accept="image/*" type="file" className="hidden" ref={inputRef} />
    </section>
  )
}

export default UploadersSection
