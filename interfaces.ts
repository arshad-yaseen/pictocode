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

export interface IBringApiKeyProps {
  noTrigger?: boolean
  isOpen?: boolean
  setIsOpen?: (isOpen: boolean) => void
}

export interface IApiKeyFormProps {
  apiKey: string
  setApiKey: React.Dispatch<React.SetStateAction<string>>
  accepted: boolean
  setAccepted: React.Dispatch<React.SetStateAction<boolean>>
  isSecureOpen: boolean
  setIsSecureOpen: React.Dispatch<React.SetStateAction<boolean>>
  apiKeyNotSupported: string | null
  setApiKeyNotSupported: React.Dispatch<React.SetStateAction<string | null>>
  saving: boolean
  deleting: boolean
  isApiKeyFromSession: boolean
  handleDelete: () => void
  saveApiKey: (apiKey: string) => void
}
