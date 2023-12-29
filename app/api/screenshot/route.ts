import { NextRequest, NextResponse } from "next/server"
import { ERROR } from "~/constants/res-messages"
import { ServerResponse } from "~/server/utils"
import { POST } from "~/utils/http.utils"

import { env } from "~/env.mjs"

export const runtime = "edge"

interface IShotApiResponse {
  secure_url: string
}

interface IShotApiRequest {
  url: string
  format: "cloudinary_url"
  cloudinary_cloud_name: string
  cloudinary_api_key: string
  cloudinary_api_secret: string
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get("url")

  if (!url) {
    return ServerResponse.badRequest(ERROR.MISSING_URL)
  }

  try {
    // https://github.com/arshad-yaseen/shotapi
    const data = await POST<IShotApiResponse, IShotApiRequest>(
      "https://shotapi.arshadyaseen.com",
      {
        url,
        format: "cloudinary_url",
        cloudinary_cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        cloudinary_api_key: env.CLOUDINARY_API_KEY,
        cloudinary_api_secret: env.CLOUDINARY_API_SECRET,
      }
    )

    return ServerResponse.success({
      body: {
        screenshotUrl: data.secure_url,
      },
    })
  } catch (error) {
    return ServerResponse.error(
      (error as any).message || String(error),
      (error as any).status ?? 500
    )
  }
}
