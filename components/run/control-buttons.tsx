import React, { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn, openInCodepen } from "~/utils/misc"
import { CodepenIcon, PlayIcon, SquareIcon, UploadIcon } from "lucide-react"

import { Button } from "~/components/ui/button"
import CopyCodeSection from "~/components/run/copy-code-section"
import TechnologiesSelect from "~/components/uploaders/technologies-select"

interface ControlButtonsProps {
  isRunning: boolean
  onStart: () => void
  onStop: () => void
  code: string
  rerun: () => void
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
  const [technology, setTechnology] = useState<string>("")

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
        variant={code ? "outline" : "default"}
        className={cn("h-10 w-full")}
      >
        {isRunning ? (
          <SquareIcon className="mr-2 h-4 w-4" />
        ) : (
          <PlayIcon className="mr-2 h-4 w-4" />
        )}
        {isRunning ? "Stop" : code ? "Re-Run" : "Run"}
      </Button>
      <div
        className={cn(
          "flex w-full flex-col gap-4 transition-all duration-500",
          {
            "invisible translate-y-4 opacity-0": !code,
          }
        )}
      >
        <CopyCodeSection code={code} />
        <Button
          onClick={() => push("/")}
          variant="secondary"
          className={cn("h-10 w-full ")}
        >
          <UploadIcon className="mr-2 h-4 w-4" />
          Re Upload
        </Button>
        <Button
          onClick={() => openInCodepen(code)}
          variant="secondary"
          className={cn("h-10 w-full text-black")}
        >
          <CodepenIcon className="mr-2 h-4 w-4" />
          Open in CodePen
        </Button>
      </div>
    </>
  )
}

export default ControlButtons
