import React, { useRef } from "react"
import { UploadIcon } from "@radix-ui/react-icons"

import { fetchOpenAI } from "~/lib/ai"
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
      <p
        onClick={async () => {
          const fetchRes = await fetchOpenAI({
            openaiBody: {
              messages: [
                {
                  role: "user",
                  content: "Hello, world",
                },
              ],
            },
            streamResponse: false,
          })
          console.log(fetchRes)
        }}
        className="my-4 text-gray-10"
      >
        or
      </p>
      <Button
        onClick={() => inputRef.current?.click()}
        className="mx-3 h-10 rounded-full px-6"
      >
        <UploadIcon className="mr-2 h-4 w-4" />
        Upload Image
      </Button>
      <input accept="image/*" type="file" className="hidden" ref={inputRef} />
      {/* <div className="grid w-[500px] grid-cols-2 gap-2 py-10">
        <Select defaultValue="React">
          <SelectTrigger className="col-span-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="React">React</SelectItem>
            <SelectItem value="HTML">HTML</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="Tailwind CSS">
          <SelectTrigger className="col-span-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Tailwind CSS">Tailwind CSS</SelectItem>
            <SelectItem value="CSS">CSS</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="mx-3 h-10 rounded-full px-6">
        <SparklesIcon className="mr-2 h-4 w-4" />
        Generate
      </Button> */}
    </section>
  )
}

export default UploadersSection
