import { OpenAIBody } from "~/types"
import { ChatCompletionMessageParam } from "openai/resources"
import { toast } from "sonner"

import { example_vision_api_messages, models } from "~/config/ai"

type OpenAIResponse = {
  isSuccess: boolean
  message: {
    content: string
    role: string
  } | null
  error: {
    message: string
    statusCode?: number
  } | null
}

type OpenAIOptions = {
  apiKey: string
  openaiBody: OpenAIBody
  type?: "chat" | "vision"
  streamResponse?: boolean
}

export async function fetchOpenAI({
  apiKey,
  openaiBody,
  type = "chat",
  streamResponse = true,
}: OpenAIOptions): Promise<OpenAIResponse> {
  try {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        openai_body: openaiBody,
        api_key: apiKey,
        type: type,
        stream_response: streamResponse,
      }),
    })

    if (!response.ok) {
      // If the response status is not in the 200-299 range, handle it as an error.
      const errorData = await response.json()
      return {
        isSuccess: false,
        message: null,
        error: {
          message: errorData.error?.message || "An error occurred",
          statusCode: response.status,
        },
      }
    }

    const data = await response.json()

    // Check if the data returned is as expected.
    if (data) {
      return {
        isSuccess: true,
        message: data.choices[0].message,
        error: null,
      }
    } else {
      return {
        isSuccess: false,
        message: null,
        error: {
          message: "Response did not contain expected data",
        },
      }
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: null,
      error: {
        message: (error as any).message,
      },
    }
  }
}

export const isCorrectApiKey = (apiKey: string | undefined): boolean => {
  return !!apiKey && apiKey.startsWith("sk-")
}

export const validateApiKey = async (
  apiKey: string
): Promise<{
  error: boolean
  message: string | undefined
  code: string
}> => {
  const openaiBody = {
    messages: example_vision_api_messages as Array<ChatCompletionMessageParam>,
  }
  const isSupportedKey = await fetchOpenAI({
    apiKey,
    openaiBody,
    streamResponse: false,
    type: "vision",
  })

  if (isSupportedKey.isSuccess) {
    return {
      error: false,
      message: "Valid API key",
      code: "valid_api_key",
    }
  } else if (isSupportedKey.error?.statusCode === 401) {
    return {
      error: true,
      message: "Invalid API key",
      code: "",
    }
  } else if (
    isSupportedKey.error?.statusCode === 404 &&
    isSupportedKey.error?.message.includes(models.vision)
  ) {
    return {
      error: true,
      message:
        "The provided API key doesn't work with OpenAI's GPT 4 Vision API. To enable it, please pay at least $1 to OpenAI.",
      code: "unsupported_api_key",
    }
  } else {
    return {
      error: true,
      message: isSupportedKey.error?.message,
      code: "server_error",
    }
  }
}
