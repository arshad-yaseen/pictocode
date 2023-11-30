import { cn } from "~/utils/misc"
import { Loader2Icon } from "lucide-react"

type LoadingIconProps = {
  loading: boolean
  className?: string
}

const LoadingIcon = ({ loading, className }: LoadingIconProps) => {
  return (
    <Loader2Icon
      className={cn(
        loading ? "inline-block animate-spin" : "hidden",
        className
      )}
    />
  )
}

export { LoadingIcon }
