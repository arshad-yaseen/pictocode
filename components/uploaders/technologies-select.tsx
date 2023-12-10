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

const TechnologiesSelect: React.FC<ITechnologiesSelectProps> = ({
  setTechnology,
}) => {
  return (
    <div className="grid w-[300px] grid-cols-2 gap-2 py-10">
      <Select onValueChange={setTechnology} defaultValue={TECHNOLOGIES[0].id}>
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
