import React, { Fragment, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"
import {
  HOW_TO_ACCESS_GPT_4_POST,
  OPENAI_USAGE_POLICIES,
} from "~/constants/links"
import { ERROR } from "~/constants/res-messages"
import { IApiKeyFormProps, IBringApiKeyProps } from "~/interfaces"
import { isCorrectApiKey, validateApiKey } from "~/utils/ai.utils"
import { DELETE, GET, POST } from "~/utils/http.utils"
import { Loader2Icon } from "lucide-react"
import { toast } from "sonner"

import { useMediaQuery } from "~/hooks/use-media-query"
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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

const BringApiKey = ({ noTrigger, isOpen, setIsOpen }: IBringApiKeyProps) => {
  const [apiKey, setApiKey] = useState<string>("")
  const [accepted, setAccepted] = useState<boolean>(false)
  const [isSecureOpen, setIsSecureOpen] = useState<boolean>(false)
  const [apiKeyNotSupported, setApiKeyNotSupported] = useState<string | null>(
    null
  )
  const [saving, setSaving] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)
  const [isApiKeyFromSession, setIsApiKeyFromSession] = useState<boolean>(false)

  const isDesktop = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    if (isOpen) setIsDialogOpen(true)
  }, [isOpen])

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
    await POST(
      "/api/api-key",
      { apiKey },
      {
        error: ERROR.API_KEY_NOT_SAVED,
        showErrorToast: true,
      }
    )

    setSaving(false)

    toast.success("API key saved successfully")
    setIsDialogOpen(false)
    setIsApiKeyFromSession(true)
  }

  const handleDelete = async () => {
    if (deleting) return
    setDeleting(true)
    await DELETE("/api/api-key", {
      error: ERROR.API_KEY_NOT_DELETED,
      showErrorToast: true,
    })
    setDeleting(false)

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
    getApiKeyFromSession()
  }, [])

  const getApiKeyFromSession = async () => {
    const key_res = await GET<{ apiKey: string }>("/api/api-key", {
      error: ERROR.API_KET_NOT_FETCHED,
    })
    if (key_res.apiKey) {
      setAccepted(true)
      setApiKey(key_res.apiKey)
      setIsApiKeyFromSession(true)
    }
  }

  // If it's mobile, use a drawer, otherwise use a dialog
  if (isDesktop) {
    return (
      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsOpen ? setIsOpen : setIsDialogOpen}
      >
        {!noTrigger && (
          <DialogTrigger asChild>
            <Button
              // accessibility
              aria-label="Bring OpenAI API Key"
              className="w-full rounded-lg md:mx-3 md:w-auto"
            >
              {isApiKeyFromSession ? "Change" : "Bring"} OpenAI API Key
            </Button>
          </DialogTrigger>
        )}
        <DialogContent className=" md:!rounded-xl md:p-8">
          <DialogHeader>
            <DialogTitle className="text-center font-inter text-2xl font-semibold tracking-tight sm:font-sans sm:tracking-tighter">
              OpenAI API key
            </DialogTitle>
            <DialogDescription>
              <p className="text-center tracking-tight text-gray-9">
                You need to bring your OpenAI API key to generate code.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="py-0.5"></div>
          <ApiKeyForm
            apiKey={apiKey}
            setApiKey={setApiKey}
            accepted={accepted}
            setAccepted={setAccepted}
            isSecureOpen={isSecureOpen}
            setIsSecureOpen={setIsSecureOpen}
            apiKeyNotSupported={apiKeyNotSupported}
            setApiKeyNotSupported={setApiKeyNotSupported}
            saving={saving}
            deleting={deleting}
            isApiKeyFromSession={isApiKeyFromSession}
            handleDelete={handleDelete}
            saveApiKey={saveApiKey}
          />
        </DialogContent>
      </Dialog>
    )
  } else {
    return (
      <Drawer
        open={isDialogOpen}
        onOpenChange={setIsOpen ? setIsOpen : setIsDialogOpen}
      >
        {!noTrigger && (
          <DrawerTrigger asChild>
            <Button className="w-full rounded-lg md:mx-3 md:w-auto">
              {isApiKeyFromSession ? "Change" : "Bring"} OpenAI API Key
            </Button>
          </DrawerTrigger>
        )}
        <DrawerContent className="h-[500px] p-8 pt-0">
          <DrawerHeader className="mt-6">
            <DrawerTitle className="text-center text-2xl font-semibold">
              OpenAI API key
            </DrawerTitle>
            <DrawerDescription>
              <p className="text-center tracking-tight text-gray-9">
                You need to bring your OpenAI API key to generate code.
              </p>
            </DrawerDescription>
          </DrawerHeader>
          <div className="py-0.5"></div>
          <ApiKeyForm
            apiKey={apiKey}
            setApiKey={setApiKey}
            accepted={accepted}
            setAccepted={setAccepted}
            isSecureOpen={isSecureOpen}
            setIsSecureOpen={setIsSecureOpen}
            apiKeyNotSupported={apiKeyNotSupported}
            setApiKeyNotSupported={setApiKeyNotSupported}
            saving={saving}
            deleting={deleting}
            isApiKeyFromSession={isApiKeyFromSession}
            handleDelete={handleDelete}
            saveApiKey={saveApiKey}
          />
        </DrawerContent>
      </Drawer>
    )
  }
}

const ApiKeyForm = ({
  apiKey,
  setApiKey,
  accepted,
  setAccepted,
  isSecureOpen,
  setIsSecureOpen,
  apiKeyNotSupported,
  setApiKeyNotSupported,
  saving,
  deleting,
  isApiKeyFromSession,
  handleDelete,
  saveApiKey,
}: IApiKeyFormProps) => (
  <Fragment>
    <div className="flex flex-col space-y-5">
      <div className="flex justify-center">
        <Input
          type="text"
          placeholder="Enter your OpenAI API key"
          className="h-11 w-full"
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
              setAccepted(checked as boolean)
            }}
            aria-label="Accept OpenAI usage policies"
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
          aria-label="Is your API key secure? Your API key is exclusively stored within your own session, not on our servers, guaranteeing maximum security and privacy."
          aria-expanded={isSecureOpen}
          className="text-sm font-medium transition-colors hover:text-gray-12/80"
        >
          Secure?
        </button>
      </div>
      {isSecureOpen && (
        <div className="flex flex-col space-y-5">
          <p className="text-sm text-gray-9">
            Your API key is exclusively stored within your own session, not on
            our servers, guaranteeing maximum security and privacy.
          </p>
          <p className="text-sm text-gray-9">
            Our website is open source. Check out the code to see how we protect
            your API key!
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
            className="rounded-lg border-error px-6 transition-colors hover:bg-error-lighter"
            variant={"outline-error"}
            onClick={() => handleDelete()}
            disabled={saving || deleting}
          >
            <Loader2Icon
              className={
                deleting ? "mr-2 inline-block h-4 w-4 animate-spin" : "hidden"
              }
            />
            Delete
          </Button>
        )}
        <Button
          disabled={saving || deleting || !isCorrectApiKey(apiKey) || !accepted}
          className="rounded-lg px-6 transition-colors"
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
  </Fragment>
)

export default BringApiKey
