import { ServerResponse } from "~/server/utils"
import { OpenAIBody } from "~/types"
import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"

import { models } from "~/config/ai"
import { isCorrectApiKey } from "~/lib/ai"

export const runtime = "edge"

export async function POST(req: Request): Promise<Response> {
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
    return ServerResponse.badRequest("Missing openai_body")
  } else if (!openai_body.messages) {
    return ServerResponse.badRequest("Missing openai_body.messages")
  }

  let OPENAI_API_KEY

  if (api_key) {
    OPENAI_API_KEY = api_key
  } else {
    // do other stuff
  }

  if (!isCorrectApiKey(OPENAI_API_KEY)) {
    return ServerResponse.unauthorized("Incorrect API key")
  }

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  })

  const payload: OpenAI.ChatCompletionCreateParams = {
    ...openai_body,
    model: type === "chat" ? models.chat : models.vision,
    stream: stream_response,
  }

  let response

  try {
    response = await openai.chat.completions.create(payload)
  } catch (error) {
    return ServerResponse.internalServerError(
      (error as any).message,
      (error as any).status
    )
  }

  if (stream_response) {
    // @ts-ignore
    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } else {
    return ServerResponse.success({
      body: response,
    })
  }
}
