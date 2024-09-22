import { useCallback } from 'react'

import { Trash2Icon } from 'lucide-react'

import { Button, Dropzone, Form, Label } from '@/presentation/components/ui'

import { TabProps } from './types'

export const LocalizationTab: React.FC<TabProps> = ({ form }) => {
	const { control, setValue } = form

	const handleRemoveFile = useCallback(
		(index: number, files: File[]) => {
			const updatedFiles = [...files.slice(0, index), ...files.slice(index + 1)]

			setValue('localization.images', updatedFiles)
		},
		[setValue]
	)

	return (
		<Form.Field
			control={control}
			name="localization.images"
			render={({ field, fieldState }) => {
				const { error } = fieldState

				return (
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<Label>Mapas de uso de solo</Label>
							<Dropzone
								files={field.value}
								onChange={(files) => field.onChange([...field.value, ...files])}
								mimeType={['image/*']}
								error={error?.message}
							/>
						</div>
						<div className="flex flex-col gap-2">
							{field.value.map((file, index) => (
								<div
									key={file.name}
									className="flex items-center justify-between w-full"
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
	)
}
