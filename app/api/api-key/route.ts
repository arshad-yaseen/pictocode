import { SESSION_KEY } from "~/constants/misc"
import { ServerResponse } from "~/server/utils"

import { del, get, set } from "~/lib/session/session-store"

export async function POST(req: Request): Promise<Response> {
  const body = await req.json()
  const { apiKey } = body

  if (!apiKey) {
    return ServerResponse.badRequest("Missing API key")
  }

  await set(SESSION_KEY, apiKey)

  return ServerResponse.success({
    body: {
      message: "API key stored",
    },
  })
}

export async function GET(): Promise<Response> {
  const apiKey = await get(SESSION_KEY)
  return ServerResponse.success({
    body: {
      apiKey,
    },
  })
}

export async function DELETE(): Promise<Response> {
  await del(SESSION_KEY, "")
  return ServerResponse.success({
    body: {
      message: "API key deleted",
    },
  })
}
