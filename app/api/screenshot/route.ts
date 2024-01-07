import { NextRequest, NextResponse } from "next/server"
import { ERROR } from "~/constants/res-messages"
import { ServerResponse } from "~/server/utils"
import { GET as HTTPGet } from "~/utils/http.utils"

import { upload } from "~/lib/cloudinary"

export const runtime = "edge"

type IShotApiResponse = string

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get("url")

  if (!url) {
    return ServerResponse.badRequest(ERROR.MISSING_URL)
  }

  try {
    // https://github.com/arshad-yaseen/shotapi
    const data = await HTTPGet<IShotApiResponse>(
      `https://shotapi.arshadyaseen.com/take?url=${encodeURIComponent(url)}`
    )

    const { secure_url } = await upload(`data:image/png;base64,${data}`)

    return ServerResponse.success({
      body: {
        screenshotUrl: secure_url,
      },
    })
  } catch (error) {
    return ServerResponse.error(
      (error as any).message || String(error),
      (error as any).status ?? 500
    )
  }
}
