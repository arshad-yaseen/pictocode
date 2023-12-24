import { EVENT_PUB_PREVIEW_SIZE } from "~/constants/run"

import { usePub } from "~/hooks/use-pub-sub"
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"

type PreviewSize = "mobile" | "tablet" | "laptop" | "desktop"

const PX_SIZES: Record<PreviewSize, number> = {
  desktop: 1440,
  laptop: 1024,
  tablet: 768,
  mobile: 375,
}

const DEFAULT_PREVIEW_SIZE = PX_SIZES.desktop

const PreviewSizeAdjust = () => {
  const pub = usePub()

  const handleValueChange = (value: string) => {
    const size = Number(value)
    // Publish the new preview size
    pub(EVENT_PUB_PREVIEW_SIZE, size)
  }

  return (
    <Tabs
      onValueChange={handleValueChange}
      defaultValue={String(DEFAULT_PREVIEW_SIZE)}
      className="hidden w-full md:block"
    >
      <TabsList className="w-full">
        {Object.entries(PX_SIZES).map(([key, value]) => (
          <TabsTrigger
            key={key}
            value={String(value)}
            className="w-1/3 capitalize"
          >
            {key}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default PreviewSizeAdjust
