export interface IUrlFormProps {
  url: string
  setUrl: React.Dispatch<React.SetStateAction<string>>
  onUrlSubmit: () => Promise<void>
  submitting: boolean
}

export interface IFileDropzoneProps {
  setUploading: React.Dispatch<React.SetStateAction<boolean>>
  uploading: boolean
  technology: string
  push: (url: string) => void
}

export interface ITechnologiesSelectProps {
  setTechnology: React.Dispatch<React.SetStateAction<string>>
  className?: string
  defaultValue?: string
}
