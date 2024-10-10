import { useCallback } from 'react'

import { Trash2Icon } from 'lucide-react'

import {
	Button,
	Dropzone,
	Form,
	Input,
	Label,
} from '@/presentation/components/ui'

import { TabProps } from './types'

import type { FileType } from '@/domain/shared/types'

export const LocalizationTab: React.FC<TabProps> = ({ form }) => {
	const { control, setValue } = form

	const handleRemoveFile = useCallback(
		(index: number, files: FileType[]) => {
			const updatedFiles = [...files.slice(0, index), ...files.slice(index + 1)]

			setValue('localization.images', updatedFiles)
		},
		[setValue]
	)

	return (
		<>
			<Form.Field
				control={control}
				name="localization.images"
				render={({ field, fieldState }) => {
					const { error } = fieldState
					const onlyPreviews = field.value
						.filter((item): item is { preview: string } => !!item.preview)
						.map((item) => item.preview)
					const onlyFiles = field.value
						.filter((item): item is { file: File } => !!item.file)
						.map((item) => item.file)

					return (
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<Label>Mapas de uso de solo</Label>
								<Dropzone
									files={field.value}
									onChange={(files) =>
										field.onChange([...field.value, ...files])
									}
									mimeType={['image/*']}
									error={error?.message}
								/>
							</div>
							<div className="flex flex-col gap-2">
								{onlyPreviews.map((preview, index) => (
									<div
										key={preview}
										className="flex items-center w-full justify-between gap-1"
									>
										<Button
											type="button"
											variant="link"
											size="link"
											asChild
											className="max-w-[80%] whitespace-normal text-ellipsis"
										>
											<a href={preview} target="_blank" rel="noreferrer">
												{preview}
											</a>
										</Button>
										<Button
											type="button"
											size="icon"
											variant="outline"
											onClick={() => handleRemoveFile(index, field.value)}
										>
											<Trash2Icon className="text-destructive" />
										</Button>
									</div>
								))}

								{onlyFiles.map((file, index) => (
									<div
										key={file.name}
										className="flex items-center w-full justify-between gap-1"
									>
										<Button
											type="button"
											variant="link"
											size="link"
											onClick={() =>
												window.open(URL.createObjectURL(file), '_blank')
											}
										>
											{file.name}
										</Button>
										<Button
											type="button"
											size="icon"
											variant="outline"
											onClick={() => handleRemoveFile(index, field.value)}
										>
											<Trash2Icon className="text-destructive" />
										</Button>
									</div>
								))}
							</div>
						</div>
					)
				}}
			/>

			<Form.Field
				name="localization.latitude"
				control={control}
				render={({ field, fieldState }) => {
					const { error } = fieldState

					return (
						<Form.Item>
							<Form.Label>Latitude</Form.Label>
							<Form.Control>
								<Input {...field} isError={!!error?.message} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)
				}}
			/>

			<Form.Field
				name="localization.longitude"
				control={control}
				render={({ field, fieldState }) => {
					const { error } = fieldState

					return (
						<Form.Item>
							<Form.Label>Longitude</Form.Label>
							<Form.Control>
								<Input {...field} isError={!!error?.message} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)
				}}
			/>
		</>
	)
}
