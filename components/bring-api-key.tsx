import React, { useState } from "react"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import {  isCorrectApiKey, validateApiKey } from "~/lib/ai"
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
import Link from "next/link"
import { Loader2Icon } from "lucide-react"
import { ERROR } from "~/constants/res-messages"
import { HOW_TO_ACCESS_GPT_4_POST, OPENAI_USAGE_POLICIES } from "~/constants/links"

const BringApiKey = () => {
  const [apiKey, setApiKey] = useState<string>("")
  const [accepted, setAccepted] = useState<boolean | "indeterminate">(false)
  const [isSecureOpen, setIsSecureOpen] = useState<boolean>(false)
  const [apiKeyNotSupported, setApiKeyNotSupported] = useState<string | null>(
    null
  )
  const [saving, setSaving] = useState<boolean>(false)

  const saveApiKey = async (apiKey: string) => {
    if (saving) return
    if (!isCorrectApiKey(apiKey)) {
      toast.error(ERROR.INCORRECT_API_KEY)
      return
    }

    setSaving(true)

    const isValid = await validateApiKey(apiKey)

    setSaving(false)

    if (isValid.error) {
      if (isValid.code === "unsupported_api_key") {
        setApiKeyNotSupported(isValid.message as string)
        setIsSecureOpen(false)
      } else {
        toast.error(isValid.message)
      }
    } else {
      setApiKeyNotSupported(null)
      await save()
    }
  }

  const save = async () => {
    // TODO: Save API key

    toast.success("API key saved successfully")
  }

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
            <p className="text-center text-gray-9">
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
              spellCheck={false}
              onChange={(e) => {
                setApiKey(e.target.value)
                setApiKeyNotSupported(null)
              }}
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
                  window.open(OPENAI_USAGE_POLICIES, "_blank")
                }}
                className="cursor-pointer text-sm font-medium leading-none transition-colors hover:text-gray-12/80 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept OpenAI usage policies{" "}
                <ArrowTopRightIcon className="inline-block h-3.5 w-3.5" />
              </Label>
            </div>
            <button
              onClick={() => {
                setIsSecureOpen(!isSecureOpen)
                setApiKeyNotSupported(null)
              }}
              className="text-sm font-medium transition-colors hover:text-gray-12/80"
            >
              Secure?
            </button>
          </div>
          {isSecureOpen && (
            <div className="flex flex-col space-y-5">
              <p className="text-sm text-gray-9">
                We securely store your API key in session storage on server
                side. This means it's kept safe during your active session and
                is not exposed to the internet, ensuring its protection.
              </p>
              <p className="text-sm text-gray-9">
                Our website is open source. Check out the code to see how we
                protect your API key!
              </p>
            </div>
          )}
          {apiKeyNotSupported && (
            <div className="flex flex-col space-y-5">
              <p className="text-sm text-gray-9">{apiKeyNotSupported}</p>
              <Link href={HOW_TO_ACCESS_GPT_4_POST} target="_blank" className="text-sm underline underline-offset-4">
                Learn more about this
              </Link>
            </div>
          )}
          <div className="py-0.5 "></div>
          <div className="flex w-full justify-end">
            <Button
              disabled={!accepted || apiKey.length < 20 || saving}
              className="rounded-full px-6 transition-colors"
              onClick={() => saveApiKey(apiKey)}
            >
              <Loader2Icon className={saving ? "animate-spin h-4 w-4 inline-block mr-2" : "hidden"} />
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BringApiKey
