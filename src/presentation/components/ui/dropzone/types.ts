export type DropzoneProps = {
	files: File[]
	onChange: (files: File[]) => void
	className?: string
	mimeType?: string[]
	error?: string
	description?: string
}
