import React, { useState } from "react"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"

import { openai_usage_policy_url } from "~/config/misc"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

const BringApiKey = () => {
  const [apiKey, setApiKey] = useState<string>("")
  const [accepted, setAccepted] = useState<boolean | "indeterminate">(false)
  const [isSecureOpen, setIsSecureOpen] = useState<boolean>(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mx-3 rounded-full">Bring OpenAI API Key</Button>
      </DialogTrigger>
      <DialogContent className=" !rounded-xl p-12">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-medium">
            OpenAI API key
          </DialogTitle>
          <DialogDescription>
            <p className="text-center">
              You need to bring your OpenAI API key to generate code.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="py-0.5"></div>
        <div className="flex flex-col space-y-5">
          <div className="flex justify-center">
            <Input
              type="text"
              placeholder="Enter your OpenAI API key"
              className="h-11 w-full border-2 transition-[border] duration-300 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-transparent"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
       <div className="flex w-full justify-between">
       <div className="flex items-center space-x-2">
            <Checkbox
              onCheckedChange={(checked) => {
                setAccepted(checked)
              }}
              id="terms"
            />
            <Label
              onClick={() => {
                window.open(openai_usage_policy_url, "_blank")
              }}
              className="cursor-pointer text-sm font-medium leading-none transition-colors hover:text-gray-12/80 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept OpenAI usage policies{" "}
              <ArrowTopRightIcon className="inline-block h-3.5 w-3.5" />
            </Label>
          </div>
          <button
          onClick={() => setIsSecureOpen(!isSecureOpen)}
          className="text-sm font-medium transition-colors hover:text-gray-12/80">
          Secure?
          </button>
       </div>
          {
            isSecureOpen && (
              <>
          <div className="flex flex-col space-y-5">
            <p className="text-sm text-gray-9">
              We securely store your API key in session storage on server side.
              This means it's kept safe during your active session and is not
              exposed to the internet, ensuring its protection.
            </p>
            <p className="text-sm text-gray-9">
              Our website is open source. Check out the code to see how we
              protect your API key!
            </p>
          </div>
              </>
            )
          }
          <div className="py-0.5 "></div>
          <div className="flex w-full justify-end">
            <Button
              disabled={!accepted || apiKey.length < 20}
              className="rounded-full px-6 transition-colors"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BringApiKey
