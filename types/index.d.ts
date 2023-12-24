import { OpenAI } from "openai"

export type OpenAIBody = Omit<OpenAI.ChatCompletionCreateParams, "model"> & {
  model?: OpenAI.ChatCompletionCreateParams["model"]
}

export type TECHNOLOGY =
  | "html-tailwind"
  | "react-tailwind"
  | "html-css"
  | "html-bootstrap"
  | "react-bootstrap"
  | "svg"
