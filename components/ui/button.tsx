import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "~/utils/misc"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-2 transition-all duration-200  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 dark:ring-white/30 dark:focus-visible:border-white/70",
  {
    variants: {
      variant: {
        default:
          "bg-gray-12 text-background shadow-border-small hover:bg-gray-12/90",
        error:
          "bg-error text-white shadow-small transition-colors hover:bg-error-hover",
        "outline-error":
          "border border-input bg-background text-error-foreground shadow-small transition-colors hover:bg-gray-1",
        outline:
          "bg-transparent shadow-border-small hover:bg-gray-2 hover:text-accent-foreground",
        secondary:
          "bg-secondary text-primary shadow-border-small hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
