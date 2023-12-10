"use client"

import React from "react"

import { siteConfig } from "~/config/site"
import { UploadersSection } from "~/components/uploaders/uploaders-section"

const SiteHero = () => {
  return (
    <div className="flex h-[93vh] w-full flex-col items-center space-y-6 pt-20">
      <h1 className="text-center text-4xl font-semibold tracking-tight">
        Turn your designs into code. <br /> to any Framework.
      </h1>
      <p className="mt-4  text-center text-gray-9">
        Upload a design or enter an image/website URL. <br />{" "}
        {siteConfig.short_name} generates the code fast and accurately.
      </p>
      <div className="py-1" />
      <UploadersSection />
    </div>
  )
}

export default SiteHero
