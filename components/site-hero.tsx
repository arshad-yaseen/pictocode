"use client"

import React from "react"

import { siteConfig } from "~/config/site"
import { UploadersSection } from "~/components/uploaders/uploaders-section"

const SiteHero = () => {
  return (
    <div className="flex  w-full flex-col items-center space-y-6 pt-16">
      <h1 className="text-center font-inter text-4xl font-semibold tracking-tight sm:font-sans sm:tracking-tighter">
        Turn your screenshots into code
      </h1>
      <p className="mt-4  text-center text-gray-11">
        Upload a screenshot or enter an image/website URL. <br />{" "}
        {siteConfig.short_name} generates the code fast and accurately.
      </p>
      <div className="py-1" />
      <UploadersSection />
    </div>
  )
}

export default SiteHero
