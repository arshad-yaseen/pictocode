import React from "react"
import { DEFAULT_TECHNOLOGY, TECHNOLOGIES } from "~/constants/prompts"
import { ITechnologiesSelectProps } from "~/interfaces"
import { TECHNOLOGY } from "~/types"
import { cn } from "~/utils/misc"

import { Badge } from "~/components/ui/badge"
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
        onValueChange={(value) => setTechnology(value as TECHNOLOGY)}
        defaultValue={defaultValue || DEFAULT_TECHNOLOGY}
      >
        <SelectTrigger
          aria-label="Select a technology"
          className="col-span-2 h-10"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(TECHNOLOGIES).map(([key, obj]) => (
            <SelectItem key={key} value={key}>
              <p className="inline-block">{obj.name}</p>
              {obj.beta && <Badge className="ml-2">Beta</Badge>}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default TechnologiesSelect
