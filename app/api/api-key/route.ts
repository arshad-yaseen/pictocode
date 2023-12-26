import { ERROR, SUCCESS } from "~/constants/res-messages"
import { ServerResponse } from "~/server/utils"

import { env } from "~/env.mjs"
import { del, get, set } from "~/lib/session-store"

export const runtime = "edge"

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json()
    const { apiKey } = body

    if (!apiKey) {
      return ServerResponse.badRequest(ERROR.MISSING_API_KEY)
    }

    set(env.API_KEY_SESSION_KEY, apiKey)

    return ServerResponse.success({
      body: { message: ERROR.API_KEY_NOT_STORED },
    })
  } catch (error) {
    return ServerResponse.internalServerError(
      error instanceof Error ? error.message : String(error)
    )
  }
}

export async function GET(): Promise<Response> {
  try {
    const apiKey = get(env.API_KEY_SESSION_KEY) || ""

    if (!apiKey) {
      return ServerResponse.notFound(ERROR.API_KEY_NOT_FOUND)
    }

    return ServerResponse.success({
      body: { apiKey },
    })
  } catch (error) {
    return ServerResponse.internalServerError(
      error instanceof Error ? error.message : String(error)
    )
  }
}

export async function DELETE(): Promise<Response> {
  try {
    del(env.API_KEY_SESSION_KEY)
    return ServerResponse.success({
      body: { message: SUCCESS.API_KEY_DELETED },
    })
  } catch (error) {
    return ServerResponse.error(
      (error as any).message || String(error),
      (error as any).status ?? 500
    )
  }
}
