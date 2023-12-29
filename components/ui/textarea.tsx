import * as React from "react"
import { cn } from "~/utils/misc"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md shadow-border-small bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none transition-all duration-200 focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
