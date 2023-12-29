import React from "react"
import { IUrlFormProps } from "~/interfaces"
import { isValidUrl } from "~/utils/misc"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { LoadingIcon } from "~/components/loading-icon"

const UrlForm: React.FC<IUrlFormProps> = ({
  url,
  setUrl,
  onUrlSubmit,
  submitting,
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await onUrlSubmit()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-2 md:w-auto md:flex-row"
    >
      <Input
        type="text"
        name="url"
        placeholder="Enter image URL or Website URL"
        className="w-full flex-1  md:w-[500px]"
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        autoComplete="off"
      />
      <Button
        type="submit"
        disabled={!isValidUrl(url) || submitting}
        className="h-full border-2 border-primary px-6 transition-all duration-300"
      >
        <LoadingIcon className="mr-2 h-4 w-4" loading={submitting} />
        Submit
      </Button>
    </form>
  )
}

export default UrlForm
