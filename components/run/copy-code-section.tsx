import React from "react"
import { cn } from "~/utils/misc"

import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { CodeBlock } from "~/components/code-block"

interface CopyCodeSectionProps {
  code: string
}

const CopyCodeSection = ({ code }: CopyCodeSectionProps) => {
  return (
    <div
      className={cn("flex w-full flex-col gap-4")}
    >
      <CodeDialog code={code} />
    </div>
  )
}

const CodeDialog = ({ code }: CopyCodeSectionProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10">
          Code
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] min-w-[700px] overflow-scroll p-0">
        <CodeBlock
          snippet={`${code}\n`}
          language="html"
          preElementClass="border-none"
        />
      </DialogContent>
    </Dialog>
  )
}

export default CopyCodeSection