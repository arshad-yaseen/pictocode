import { ERROR } from "~/constants/res-messages";
import { ServerResponse } from "~/server/utils";
import puppeteer from 'puppeteer';
import { NextRequest, NextResponse } from "next/server";
import { upload } from "~/lib/cloudinary";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url');

  if (!url) {
    return ServerResponse.badRequest(ERROR.MISSING_URL);
  }

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: "new"
    });
    const page = await browser.newPage();
    await page.goto(url!,{
      waitUntil: 'networkidle2',
  });
    const screenshotBase64 = await page.screenshot({ type: 'jpeg', encoding: 'base64', quality: 100 });
    const base64Url = `data:image/jpeg;base64,${screenshotBase64}`;
    const cloudinary = await upload(base64Url);
    const uploadedUrl = cloudinary?.secure_url;
    return ServerResponse.success({
      body: { screenshotUrl: uploadedUrl },
    });
  } catch (error) {
    return ServerResponse.error((error as any).message || String(error), (error as any).status ?? 500);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

