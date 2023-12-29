import { TECHNOLOGY } from "~/types"
import { buildPrompt, createChat } from "~/utils/ai.utils"

export const generateCode = async ({
  technology_id,
  extraInstructions,
  imageUrl,
  updateIFrame,
  setIsRunning,
  setLoadingText,
  setIsBringApiKeyDialogOpen,
  setCode,
  // Stop: A ref to a boolean value that can be set to true to stop the generation
  stop,
}: {
  technology_id: TECHNOLOGY
  extraInstructions?: string
  imageUrl: string
  updateIFrame: (code: string) => void
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
  setLoadingText: React.Dispatch<React.SetStateAction<string>>
  setIsBringApiKeyDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  setCode: React.Dispatch<React.SetStateAction<string>>
  stop?: React.MutableRefObject<boolean>
}): Promise<void> => {
  const response = await createChat({
    body: {
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              // If the prompt is provided, use it, otherwise generate code by technology.
              text: buildPrompt(technology_id, extraInstructions),
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
                detail: "high",
              },
            },
          ],
        },
      ],
      max_tokens: 4096,
      temperature: 0,
      seed: 0.5,
    },
    type: "vision",
  })

  if (response.error?.statusCode === 403) {
    setIsRunning(false)
    setLoadingText("")
    setIsBringApiKeyDialogOpen(true)
    return
  }

  const data = response.message?.content as ReadableStream<Uint8Array>
  const reader = data?.getReader()
  const decoder = new TextDecoder()
  let done = false

  const timeout = setTimeout(() => {
    setLoadingText("Rendering...")
  }, 3000)

  let code = ""

  while (!done) {
    // Break the stream if the user has stopped the generation
    if (stop?.current) {
      break
    }
    const { value, done: doneReading } = (await reader?.read()) as any
    done = doneReading
    const chunkValue = decoder.decode(value)
    code += chunkValue
    setCode(code)
    updateIFrame(code)
  }

  // Clear loading state
  if (stop && stop.current) {
    stop.current = false
  }
  setLoadingText("")
  setIsRunning(false)
  clearTimeout(timeout)
}
