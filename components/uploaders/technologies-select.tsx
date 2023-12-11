import React from "react"
import { TECHNOLOGIES } from "~/constants/prompts"
import { ITechnologiesSelectProps } from "~/interfaces"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { cn } from "~/utils/misc"

const TechnologiesSelect: React.FC<ITechnologiesSelectProps> = ({
  setTechnology,
  defaultValue,
  className,
}) => {
  return (
    <div className={cn("grid w-full grid-cols-2 gap-2", className)}>
      <Select onValueChange={setTechnology} defaultValue={defaultValue || TECHNOLOGIES[0].id}>
        <SelectTrigger className="col-span-2 h-10">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {TECHNOLOGIES.map((technology, index) => (
            <SelectItem key={index} value={technology.id}>
              {technology.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default TechnologiesSelect
