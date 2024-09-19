export type DropzoneProps = {
	className?: string
	mimeType?: string[]
	error?: string
	onChange: React.Dispatch<React.SetStateAction<File[]>>
}
