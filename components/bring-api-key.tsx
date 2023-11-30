import React, { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"
import {
  HOW_TO_ACCESS_GPT_4_POST,
  OPENAI_USAGE_POLICIES,
} from "~/constants/links"
import { ERROR } from "~/constants/res-messages"
import { Loader2Icon } from "lucide-react"
import { toast } from "sonner"

import { isCorrectApiKey, validateApiKey } from "~/lib/ai"
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
  const [apiKeyNotSupported, setApiKeyNotSupported] = useState<string | null>(
    null
  )
  const [saving, setSaving] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)
  const [isApiKeyFromSession, setIsApiKeyFromSession] = useState<boolean>(false)

  const saveApiKey = async (apiKey: string) => {
    if (saving) return
    if (!isCorrectApiKey(apiKey)) {
      toast.error(ERROR.INCORRECT_API_KEY)
      return
    }

    setSaving(true)

    const isValid = await validateApiKey(apiKey)

    if (isValid.error) {
      if (isValid.code === "unsupported_api_key") {
        setApiKeyNotSupported(isValid.message as string)
        setIsSecureOpen(false)
      } else {
        toast.error(isValid.message)
      }
      setSaving(false)
    } else {
      setApiKeyNotSupported(null)
      await save()
    }
  }

  const save = async () => {
    const res = await fetch("/api/api-key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ apiKey }),
    })

    setSaving(false)

    if (!res.ok) {
      toast.error(ERROR.API_KEY_NOT_SAVED)
      return
    }

    toast.success("API key saved successfully")
    setIsDialogOpen(false)
    setIsApiKeyFromSession(true)
  }

  const handleDelete = async () => {
    if (deleting) return
    setDeleting(true)
    const res = await fetch("/api/api-key", {
      method: "DELETE",
    })
    setDeleting(false)
    if (!res.ok) {
      toast.error(ERROR.API_KEY_NOT_DELETED)
      return
    }

    toast.success("API key deleted successfully")
    reset()
  }

  const reset = () => {
    setApiKey("")
    setAccepted(false)
    setIsSecureOpen(false)
    setApiKeyNotSupported(null)
    setSaving(false)
    setDeleting(false)
    setIsApiKeyFromSession(false)
  }

  useEffect(() => {
    fetch("/api/api-key")
      .then((res) => res.json())
      .then((res) => {
        if (res.apiKey) {
          setApiKey(res.apiKey)
          setAccepted(true)
          setIsApiKeyFromSession(true)
        }
      })
  }, [])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full rounded-full md:mx-3 md:w-auto">
          {isApiKeyFromSession ? "Change" : "Bring"} OpenAI API Key
        </Button>
      </DialogTrigger>
      <DialogContent className=" md:!rounded-xl md:p-12">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">
            OpenAI API key
          </DialogTitle>
          <DialogDescription>
            <p className="text-center tracking-tight text-gray-9">
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
                checked={accepted}
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
                Your API key is exclusively stored within your own session, not
                on our servers, guaranteeing maximum security and privacy during
                your usage.
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
              <Link
                href={HOW_TO_ACCESS_GPT_4_POST}
                target="_blank"
                className="text-sm underline underline-offset-4"
              >
                Learn more about this
              </Link>
            </div>
          )}
          <div className="py-0.5 "></div>
          <div className="flex w-full justify-end space-x-2">
            {isApiKeyFromSession && (
              <Button
                className="rounded-full border-error px-6 transition-colors hover:bg-error-lighter"
                variant={"outline-error"}
                onClick={() => handleDelete()}
                disabled={saving || deleting}
              >
                <Loader2Icon
                  className={
                    deleting
                      ? "mr-2 inline-block h-4 w-4 animate-spin"
                      : "hidden"
                  }
                />
                Delete
              </Button>
            )}
            <Button
              disabled={
                saving || deleting || !isCorrectApiKey(apiKey) || !accepted
              }
              className="rounded-full px-6 transition-colors"
              onClick={() => saveApiKey(apiKey)}
            >
              <Loader2Icon
                className={
                  saving ? "mr-2 inline-block h-4 w-4 animate-spin" : "hidden"
                }
              />
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BringApiKey
