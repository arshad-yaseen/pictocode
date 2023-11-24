import { OpenAI } from "openai"

export type OpenAIBody = Omit<OpenAI.ChatCompletionCreateParams, "model"> & {
  model?: OpenAI.ChatCompletionCreateParams["model"]
}
