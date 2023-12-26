import { ERROR } from "~/constants/res-messages"
import { ServerResponse } from "~/server/utils"
import { OpenAIBody } from "~/types"
import { isCorrectApiKey } from "~/utils/ai.utils"
import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"

import { env } from "~/env.mjs"
import { models } from "~/config/ai"
import { get } from "~/lib/session-store"

export const runtime = "edge"

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json()
    const {
      openai_body,
      type = "chat",
      api_key,
      stream_response = true,
    }: {
      openai_body: OpenAIBody
      type: "chat" | "vision"
      api_key: string
      stream_response: boolean
    } = body

    if (!openai_body) {
      return ServerResponse.badRequest(ERROR.MISSING_OPENAI_BODY)
    } else if (!openai_body.messages) {
      return ServerResponse.badRequest(ERROR.MISSING_OPENAI_MESSAGES)
    }

    const OPENAI_API_KEY = api_key || get(env.API_KEY_SESSION_KEY)

    if (!OPENAI_API_KEY) {
      return ServerResponse.unauthorized(ERROR.MISSING_API_KEY)
    }

    if (!isCorrectApiKey(OPENAI_API_KEY)) {
      return ServerResponse.unauthorized(ERROR.INCORRECT_API_KEY)
    }

    const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

    const payload: OpenAI.ChatCompletionCreateParams = {
      ...openai_body,
      model: type === "chat" ? models.chat : models.vision,
      stream: stream_response,
    }

    const response = await openai.chat.completions.create(payload)

    if (stream_response) {
      // @ts-ignore
      const stream = OpenAIStream(response)
      return new StreamingTextResponse(stream)
    } else {
      return ServerResponse.success({ body: response })
    }
  } catch (error) {
    return ServerResponse.error(
      (error as any).message || String(error),
      (error as any).status ?? 500
    )
  }
}
