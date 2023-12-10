import { useCallback, useState } from "react"
import { cn } from "~/utils/misc"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"

import { useCopyToClipboard } from "~/hooks/use-copy-to-clipboard"
import { Button } from "~/components/ui/button"

export default function CopyButton({
  value,
  className,
  props,
  onCopyAction,
  variant,
  iconProps,
  disabled = false,
  dontCopy = false,
}: {
  value?: string
  className?: string
  props?: React.HTMLAttributes<HTMLButtonElement>
  onCopyAction?: () => void
  dontCopy?: boolean
  variant?: "outline" | "default" | "secondary" | "error" | "ghost" | "link"
  iconProps?: React.SVGProps<SVGSVGElement>
  disabled?: boolean
}) {
  const [copying, setCopying] = useState<number>(0)
  const { copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const onCopy = useCallback(() => {
    if (onCopyAction) {
      onCopyAction()
      if (dontCopy) return
    }
    copyToClipboard(value || "")
    setCopying((c) => c + 1)
    setTimeout(() => {
      setCopying((c) => c - 1)
    }, 1000)
  }, [value, onCopyAction, dontCopy, copyToClipboard])

  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.5 },
  }
  return (
    <Button
      onClick={onCopy}
      variant={variant || "ghost"}
      aria-label="Copy code"
      className={cn(
        "copy-button h-8 w-8 rounded-sm bg-background text-gray-11 hover:bg-gray-4",
        className
      )}
      size={"icon"}
      type="button"
      disabled={disabled}
      {...props}
    >
      <MotionConfig transition={{ duration: 0.15 }}>
        <AnimatePresence initial={false} mode="wait">
          {copying ? (
            <motion.div
              animate="visible"
              exit="hidden"
              initial="hidden"
              key="check"
              variants={variants}
            >
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                shapeRendering="geometricPrecision"
                {...iconProps}
              >
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </motion.div>
          ) : (
            <motion.div
              animate="visible"
              exit="hidden"
              initial="hidden"
              key="copy"
              variants={variants}
            >
              <svg
                width="17"
                height="17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                shapeRendering="geometricPrecision"
                viewBox="0 0 24 24"
                {...iconProps}
              >
                <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"></path>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </Button>
  )
}
