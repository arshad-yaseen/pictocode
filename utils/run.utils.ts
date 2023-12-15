import { TECHNOLOGY } from "~/types"
import { buildPrompt, createChat } from "~/utils/ai.utils"

export const generateCode = async ({
  technology_id,
  imageUrl,
  updateIFrame,
  setIsRunning,
  setLoadingText,
  setIsBringApiKeyDialogOpen,
  codeRef,
}: {
  technology_id: TECHNOLOGY
  imageUrl: string
  updateIFrame: (code: string) => void
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
  setLoadingText: React.Dispatch<React.SetStateAction<string>>
  setIsBringApiKeyDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  codeRef: React.MutableRefObject<string>
}): Promise<void> => {
  const response = await createChat({
    body: {
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: buildPrompt(technology_id),
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
    const { value, done: doneReading } = (await reader?.read()) as any
    done = doneReading
    const chunkValue = decoder.decode(value)
    code += chunkValue
    updateIFrame(code)
  }

  codeRef.current += code
  // Clear loading state
  setLoadingText("")
  setIsRunning(false)
  clearTimeout(timeout)
}
