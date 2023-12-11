import React from "react"
import { cn } from "~/utils/misc"
import { CodepenIcon, PlayIcon, SquareIcon, UploadIcon } from "lucide-react"

import { Button } from "~/components/ui/button"
import CopyCodeSection from "~/components/run/copy-code-section"

interface ControlButtonsProps {
  isRunning: boolean
  onStart: () => void
  onStop: () => void
  code: string
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  isRunning,
  onStart,
  onStop,
  code,
}) => {
  return (
    <>
      <Button
        onClick={isRunning ? onStop : onStart}
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
        className={cn("flex w-full flex-col gap-4 transition-all duration-500", {
          "invisible translate-y-4 opacity-0": !code,
        })}
      >
        <CopyCodeSection code={code} />
        <Button variant="secondary" className={cn("h-10 w-full ")}>
          <UploadIcon className="mr-2 h-4 w-4" />
          Re Upload
        </Button>
        <Button variant="secondary" className={cn("h-10 w-full text-black")}>
          <CodepenIcon className="mr-2 h-4 w-4" />
          Open in CodePen
        </Button>
      </div>
    </>
  )
}

export default ControlButtons
