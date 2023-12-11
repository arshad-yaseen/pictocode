import React from "react"
import { cn } from "~/utils/misc"

interface ImagePreviewProps {
  imageUrl: string
  isRunning?: boolean
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, isRunning }) => {
  return (
    <div
      className={cn(
        "relative w-fit overflow-hidden rounded-[10px] p-1.5 shadow-tooltip",
        isRunning && "gradient-box"
      )}
    >
      <img
        src={imageUrl}
        alt="run_image"
        className={cn(
          "relative z-30 w-full rounded-[10px]",
          isRunning && "animate-pulse"
        )}
      />
    </div>
  )
}

export default ImagePreview
