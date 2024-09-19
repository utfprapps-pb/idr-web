import React, { useCallback, useRef } from 'react'

import toast from 'react-hot-toast'

import { Card } from '../card'

import { DropzoneProps } from './types'

export const Dropzone: React.FC<DropzoneProps> = ({
	className,
	mimeType,
	error,
	onChange
}) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null)

	const handleFiles = useCallback(
		(files: FileList) => {
			const uploadFiles = (fileList: FileList) => {
				for (const uploadedFile of fileList) {
					onChange((prevFiles) => [
						...prevFiles.filter((file) => file.name !== uploadedFile.name),
						uploadedFile
					])
				}
			}

			if (!mimeType) {
				uploadFiles(files)
				return
			}

			const fileList = new DataTransfer()
			const fileListError = new DataTransfer()
			for (const uploadedFile of files) {
				const uploadedMimeType = uploadedFile.type

				const isValidMimeType = mimeType.some((type) => {
					if (type.endsWith('/*')) {
						const [baseType] = type.split('/')
						return uploadedMimeType.startsWith(baseType)
					}

					return uploadedMimeType === type
				})

				if (isValidMimeType) {
					fileList.items.add(uploadedFile)
					continue
				}

				fileListError.items.add(uploadedFile)
			}

			uploadFiles(fileList.files)

			let title = ''
			for (const errorFile of fileListError.files) {
				title += `\nArquivo ${errorFile.name} com extensão inválida`
			}

			if (title) toast.error(title)
		},
		[mimeType, onChange]
	)

	const handleDragOver = useCallback(
		(event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault()
			event.stopPropagation()
		},
		[]
	)

	const handleDrop = useCallback(
		(event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault()
			event.stopPropagation()
			const { files } = event.dataTransfer
			handleFiles(files)
		},
		[handleFiles]
	)

	const handleFileInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
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
		<Card.Container
			className={`border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50 ${className}`}
			onClick={handleButtonClick}
		>
			<Card.Content
				className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-x"
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			>
				<div className="flex items-center justify-center text-muted-foreground">
					<span className="font-medium">Drag Files to Upload or</span>
					<input
						ref={fileInputRef}
						type="file"
						accept={mimeType && mimeType.join(', ')}
						onChange={handleFileInputChange}
						className="hidden"
						multiple
					/>
				</div>
				{error && <span className="text-destructive">{error}</span>}
			</Card.Content>
		</Card.Container>
	)
}
