import { ServerResponse } from "~/server/utils"
import { OpenAIBody } from "~/types"
import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"

import { env } from "~/env.mjs"
import { models } from "~/config/ai"
import { openai } from "~/lib/openai"

export const runtime = "edge"

if (!env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI")
}

export async function POST(req: Request): Promise<Response> {
  const body = await req.json()
  const {
    openai_body,
    type = "chat",
  }: {
    openai_body: OpenAIBody
    type: "chat" | "vision"
  } = body

  if (!openai_body) {
    return ServerResponse.badRequest("Missing openai_body")
  } else if (!openai_body.messages) {
    return ServerResponse.badRequest("Missing openai_body.messages")
  }

  const payload: OpenAI.ChatCompletionCreateParams = {
    model: type === "chat" ? models.chat : models.vision,
    ...openai_body,
    stream: true,
  }

  const response = await openai.chat.completions.create(payload)

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
