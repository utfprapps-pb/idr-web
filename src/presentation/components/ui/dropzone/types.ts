import { FileType } from '@/domain/shared/types'

export type DropzoneProps = {
	files: FileType[]
	onChange: (files: FileType[]) => void
	className?: string
	mimeType?: string[]
	error?: string
	description?: string
}
