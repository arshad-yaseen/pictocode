import React from "react"
import { PlayIcon, SquareIcon } from "lucide-react"

import { Button } from "~/components/ui/button"

interface ControlButtonsProps {
  isRunning: boolean
  onStart: () => void
  onStop: () => void
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  isRunning,
  onStart,
  onStop,
}) => {
  return (
    <>
      <Button
        onClick={isRunning ? onStop : onStart}
        className="mt-4 h-10 w-full"
      >
        {isRunning ? (
          <SquareIcon className="mr-2 h-4 w-4" />
        ) : (
          <PlayIcon className="mr-2 h-4 w-4" />
        )}
        {isRunning ? "Stop" : "Start"}
      </Button>
    </>
  )
}

export default ControlButtons
