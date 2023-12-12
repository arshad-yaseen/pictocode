import React from "react"
import { DETAULT_TECHNOLOGY, TECHNOLOGIES } from "~/constants/prompts"
import { ITechnologiesSelectProps } from "~/interfaces"
import { cn } from "~/utils/misc"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"

const TechnologiesSelect: React.FC<ITechnologiesSelectProps> = ({
  setTechnology,
  defaultValue,
  className,
}) => {
  return (
    <div className={cn("grid w-full grid-cols-2 gap-2", className)}>
      <Select
        onValueChange={setTechnology}
        defaultValue={defaultValue || TECHNOLOGIES[DETAULT_TECHNOLOGY]}
      >
        <SelectTrigger className="col-span-2 h-10">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(TECHNOLOGIES).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default TechnologiesSelect
