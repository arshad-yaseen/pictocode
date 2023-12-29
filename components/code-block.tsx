import React, { useRef, useState } from "react"
import hljs from "highlight.js"
import { ChevronDown, ChevronUp } from "lucide-react"

import "~/styles/code-theme.css"

import { cn } from "~/utils/misc"

import { Button, buttonVariants } from "~/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { Icons } from "~/components/icons"

import CopyButton from "./copy-button"

const fileIcons = {
  ts: Icons.typescript,
  js: Icons.javascript,
  jsx: Icons.jsx,
  tsx: Icons.typescript,
  css: Icons.css,
  typescript: Icons.typescript,
  javascript: Icons.javascript,
  html: Icons.html,
  md: Icons.markdown,
  markdown: Icons.markdown,
  py: Icons.python,
  python: Icons.python,
  plaintext: Icons.plaintext,
}

function CodeBlock({
  language,
  snippet,
  preElementClass,
  codeElementClass,
  copyable = true,
  codeWrap = false,
  disableCodeFont = false,
  overflowBlur = false,
  switchCode = null,
  filename,
  hideLineNumbers = false,
  gray = false,
  className,
  highlightLines,
  collapse,
}: {
  language?: string
  snippet?: string
  preElementClass?: string
  codeElementClass?: string
  copyable?: boolean
  codeWrap?: boolean
  disableCodeFont?: boolean
  overflowBlur?: boolean
  filename?: string
  switchCode?:
    | {
        value: string
        language: string
        filename: string
        snippet: string
      }[]
    | null
  hideLineNumbers?: boolean
  gray?: boolean
  className?: string
  highlightLines?: number[]
  collapse?: boolean
}) {
  const [switchState, setSwitch] = useState<{
    value: string
    language: string
    filename: string
    snippet: string
  } | null>(switchCode ? switchCode[0] : null)
  const [languageState, setLanguage] = useState<string>(
    switchCode ? switchCode[0].language : language!
  )
  const [filenameState, setFilename] = useState<string | undefined>(
    switchCode ? switchCode[0].filename : filename
  )
  const [snippetState, setSnippet] = useState(
    switchCode ? switchCode[0].snippet : snippet
  )

  const [codeExpanded, setCodeExpanded] = useState(false)

  const getLines = (highlightedCode: string) => {
    return highlightedCode.split("\n")
  }

  // Function to wrap each line with the .line div
  const wrapLinesWithClass = (highlightedCode: string) => {
    const lines = getLines(highlightedCode)
    return lines
      .map(
        (line: string, index) =>
          `<div class="line ${hideLineNumbers ? "hide-line" : ""} ${
            highlightLines?.includes(index + 1) ? "highlight-line" : ""
          }">${line}</div>`
      )
      .join("\n")
      .split("\n")
      .slice(0, -1)
      .join("\n")
  }

  snippet = snippetState || ""
  hljs.getLanguage(languageState)
    ? (language = languageState)
    : (language = "plaintext")

  const highlightedCode = hljs.highlight(snippetState!, { language }).value

  // Wrap each line in a div with the class .line
  const wrappedHighlightedCode = wrapLinesWithClass(highlightedCode)

  const codeRef = useRef<HTMLElement>(null)
  const isLanguageInIcons = Object.keys(fileIcons).includes(languageState)
  const fileIcon = isLanguageInIcons
    ? (fileIcons as any)[languageState]
    : fileIcons.plaintext

  return (
    <div className={cn("relative w-full", gray && "grayscale", className)}>
      {filenameState && (
        <div className="flex h-12 w-full items-center justify-between rounded-t-sm border-x border-t bg-accent pl-6 pr-4 text-[13px] text-gray-11">
          <div>
            <p className="flex items-center">
              {fileIcon && (
                <span className="mr-3">
                  {React.createElement(fileIcon, {
                    className: "h-4 w-4",
                  })}
                </span>
              )}{" "}
              {filenameState}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {switchCode && (
              <Select
                onValueChange={(value) => {
                  const switchValue = switchCode.find(
                    (item) => item.value === value
                  )
                  setSwitch(switchValue!)
                  setLanguage(switchValue?.language!)
                  setFilename(switchValue?.filename)
                  setSnippet(switchValue?.snippet)
                }}
              >
                <SelectTrigger
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "shadow-medium-none h-0 w-fit rounded-sm border-none px-2 py-4 font-normal outline-none focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent"
                  )}
                >
                  <SelectValue>{switchState?.value}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {switchCode?.map((item, index) => (
                    <SelectItem key={index} value={item.value}>
                      {item.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <CopyButton value={snippetState} className="bg-transparent" />
          </div>
        </div>
      )}
      <div className="sticky left-0 top-0 z-50 h-0 w-[700px]">
        {copyable && !filenameState && (
          <CopyButton
            value={snippetState}
            className="absolute right-3 top-2.5 z-50 border transition-opacity group-hover:opacity-100"
          />
        )}
      </div>
      <pre
        className={cn(
          `hide-scrollbar group relative  flex w-full overflow-hidden rounded-sm ${
            snippetState ? "border" : null
          } ${codeWrap ? "whitespace-pre-wrap" : null} `,
          { "rounded-t-none": filenameState },
          {
            "max-h-[300px]":
              getLines(highlightedCode).length >= (collapse ? 20 : 200) &&
              !codeExpanded,
          },
          preElementClass
        )}
      >
        {overflowBlur && (
          <div className="absolute -right-4 top-0 z-10 h-full w-12 bg-background blur"></div>
        )}
        <code
          ref={codeRef as any}
          dangerouslySetInnerHTML={{ __html: wrappedHighlightedCode }}
          className={cn(
            `hide-scrollbar min-w-full overflow-x-scroll py-6 font-mono text-xl !leading-[0.2] ${
              !disableCodeFont ? "" : ""
            }`,
            { "py-4": getLines(highlightedCode).length <= 3 },
            {
              "overflow-y-hidden":
                getLines(highlightedCode).length >= (collapse ? 20 : 200) &&
                !codeExpanded,
            },
            codeElementClass
          )}
        ></code>
      </pre>
      {getLines(highlightedCode).length >= (collapse ? 20 : 200) && (
        <div className="absolute bottom-0 h-16 w-full">
          <div className="absolute bottom-0  z-50 flex h-full w-full items-center justify-center">
            <Button
              variant="outline"
              onClick={() => setCodeExpanded((codeExpanded) => !codeExpanded)}
              className="font-sans"
            >
              {codeExpanded ? "Collapse" : "Expand"}{" "}
              {!codeExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>
          </div>

          {!codeExpanded && (
            <div className=" absolute z-10 h-full w-full rounded-b-sm border-x border-b  bg-background"></div>
          )}
        </div>
      )}
    </div>
  )
}

const InlineCode = (props: any) => (
  <code
    className="relative rounded bg-secondary px-[0.3rem] py-[0.2rem]  text-sm"
    {...props}
  />
)

export { CodeBlock, InlineCode }
