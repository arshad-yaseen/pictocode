import { ERROR, SUCCESS } from "~/constants/res-messages"
import { OpenAIBody } from "~/types"
import { ChatCompletionMessageParam } from "openai/resources"

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
      message: SUCCESS.VALID_API_KEY,
      code: "valid_api_key",
    }
  } else if (isSupportedKey.error?.statusCode === 401) {
    return {
      error: true,
      message: ERROR.INVALID_API_KEY,
      code: "",
    }
  } else if (
    isSupportedKey.error?.statusCode === 404 &&
    isSupportedKey.error?.message.includes(models.vision)
  ) {
    return {
      error: true,
      message: ERROR.UNSUPPORTED_API_KEY,
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
