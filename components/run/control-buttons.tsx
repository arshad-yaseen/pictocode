import React, { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { TECHNOLOGY } from "~/types"
import { cn, openInCodepen } from "~/utils/misc"
import { CodepenIcon, PlayIcon, SquareIcon, UploadIcon } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import CodeMirror from "~/components/run/code-mirror"
import CopyCodeSection from "~/components/run/copy-code-section"
import PreviewSizeAdjust from "~/components/run/preview-size-adjust"
import TechnologiesSelect from "~/components/uploaders/technologies-select"

interface ControlButtonsProps {
  onStart: () => void
  onStop: () => void
  rerun: () => void
  isRunning: boolean
  code: string
  technology_id: string
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  isRunning,
  onStart,
  onStop,
  code,
  rerun,
  technology_id,
}) => {
  const [technology, setTechnology] = useState<TECHNOLOGY | null>(null)

  const isRenderFinished = code && !isRunning
  const isRendering = !!code && isRunning

  const pathname = usePathname()
  const searchParams = useSearchParams()!
  const { push } = useRouter()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  // update search params('technology_id') when technology changes
  useEffect(() => {
    if (technology) {
      const queryString = createQueryString("technology_id", technology)
      push(`${pathname}?${queryString}`)
    }
  }, [technology])

  return (
    <>
      <TechnologiesSelect
        setTechnology={setTechnology}
        defaultValue={technology_id}
      />
      <Button
        onClick={() => (isRunning ? onStop() : code ? rerun() : onStart())}
        variant={isRenderFinished ? "outline" : "default"}
        className={cn("h-10 w-full")}
      >
        {isRunning ? (
          <SquareIcon className="mr-2 h-4 w-4" />
        ) : (
          <PlayIcon className="mr-2 h-4 w-4" />
        )}
        {isRunning ? "Stop" : code ? "Re-Run" : "Run"}
      </Button>
      {isRendering && <CodeMirror code={code} />}
      <div
        className={cn(
          "invisible flex w-full translate-y-4 flex-col gap-4 opacity-0 transition-all duration-500",
          {
            "visible translate-y-0 opacity-100": isRenderFinished,
          }
        )}
      >
        <Button
          onClick={() => push("/")}
          variant="outline"
          className={cn("h-10 w-full ")}
        >
          <UploadIcon className="mr-2 h-4 w-4" />
          Re Upload
        </Button>
        <Separator className="my-1 w-full" />
        <CopyCodeSection code={code} />
        <Button
          onClick={() => openInCodepen(code)}
          variant="secondary"
          className={cn("h-10 w-full text-black")}
        >
          <CodepenIcon className="mr-2 h-4 w-4" />
          Open in CodePen
        </Button>
        <PreviewSizeAdjust />
      </div>
    </>
  )
}

export default ControlButtons
