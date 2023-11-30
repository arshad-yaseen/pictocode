import { Loader2Icon } from "lucide-react"
import { cn } from "~/utils/misc"

type LoadingIconProps = {
  loading: boolean
  className?: string
}

const LoadingIcon = ({
  loading,
  className
}: LoadingIconProps) => {
  return <Loader2Icon className={cn(loading ? "animate-spin inline-block" : "hidden", className)} />
}

export { LoadingIcon }