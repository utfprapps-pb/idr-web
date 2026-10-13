export type FileType =
  | {
      preview?: string
      id?: string
      fileName?: string
      file: File
    }
  | {
      preview: string
      id?: string
      fileName?: string
      file?: File
    }
