export type FileType =
  | {
      preview?: string
      file: File
    }
  | {
      preview: string
      file?: File
    }
