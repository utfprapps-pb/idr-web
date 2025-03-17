import { useCallback, useRef, type ChangeEvent, type DragEvent } from 'react'

import toast from 'react-hot-toast'

import { cn } from '@/core/utils'
import { mimeTypeToExtensions } from '@/core/utils/string/mime-type-to-extensions'

import { Card } from '../card'

import type { FileType } from '@/core/domain/types'

export type DropzoneProps = {
  files: FileType[]
  onChange: (files: FileType[]) => void
  className?: string
  mimeType?: string[]
  error?: string
  description?: string
}

export function Dropzone({
  files,
  onChange,
  className,
  mimeType,
  error,
  description = 'Arraste ou clique aqui para inserir arquivos',
}: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFiles = useCallback(
    (fileList: FileList) => {
      const validFiles: FileType[] = []
      const invalidFiles: FileType[] = []

      for (const uploadedFile of fileList) {
        if (files.some(({ file }) => file?.name === uploadedFile.name)) continue

        const uploadedMimeType = uploadedFile.type

        const isValidMimeType = mimeType?.some((type) => {
          if (type.endsWith('/*')) {
            const [baseType] = type.split('/')
            return uploadedMimeType.startsWith(baseType)
          }

          return uploadedMimeType === type
        })

        if (isValidMimeType) {
          validFiles.push({ file: uploadedFile })
        } else {
          invalidFiles.push({ file: uploadedFile })
        }
      }

      onChange(validFiles)

      if (invalidFiles.length) {
        const errorMessage = `Arquivos inválidos\n${invalidFiles.map(({ file }) => file?.name).join('\n')}`
        toast.error(errorMessage)
      }
    },
    [files, mimeType, onChange]
  )

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      const { files } = event.dataTransfer
      handleFiles(files)
    },
    [handleFiles]
  )

  const handleFileInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target
      if (files) {
        handleFiles(files)
      }
    },
    [handleFiles]
  )

  const handleButtonClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <Card.Container
        className={cn(
          'border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50',
          error && 'border-destructive/50 hover:border-destructive',
          className
        )}
        onClick={handleButtonClick}
      >
        <Card.Content
          className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-x"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex items-center justify-center text-muted-foreground">
            <div className="flex flex-col gap-1 text-center">
              <span className="font-medium">{description}</span>
              {mimeType && (
                <span className="text-xs">
                  Extensões permitidas{' '}
                  {mimeTypeToExtensions(mimeType).join(', ')}
                </span>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept={mimeType && mimeType.join(', ')}
              onChange={handleFileInputChange}
              className="hidden"
              multiple
            />
          </div>
        </Card.Content>
      </Card.Container>
      {error && (
        <span className="text-sm font-medium text-destructive">{error}</span>
      )}
    </div>
  )
}

Dropzone.displayName = 'Dropzone'
