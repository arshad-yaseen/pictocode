import { TECHNOLOGY } from "~/types"

export interface IUrlFormProps {
  url: string
  setUrl: React.Dispatch<React.SetStateAction<string>>
  onUrlSubmit: () => Promise<void>
  submitting: boolean
}

export interface IFileDropzoneProps {
  setUploading: React.Dispatch<React.SetStateAction<boolean>>
  uploading: boolean
  technology: TECHNOLOGY | null
  push: (url: string) => void
}

export interface ITechnologiesSelectProps {
  setTechnology: React.Dispatch<React.SetStateAction<TECHNOLOGY | null>>
  className?: string
  defaultValue?: string
}
