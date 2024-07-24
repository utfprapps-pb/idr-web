import { Fragment } from 'react'

import { FieldValues } from 'react-hook-form'

import { Button, Form, Loading, Sheet } from '@/presentation/components/ui'

import { SheetContainerProps } from './types'

export const SheetContainer = <TValues extends FieldValues>({
	buttonAddText,
	title,
	description,
	loading,
	form,
	footerButtons,
	open,
	onOpenChange,
	renderData,
	handleSubmit
}: SheetContainerProps<TValues>) => (
	<Sheet.Root open={open} onOpenChange={onOpenChange}>
		<Sheet.Trigger asChild>
			<Button variant="default">{buttonAddText}</Button>
		</Sheet.Trigger>
		<Sheet.Content className="overflow-y-scroll" side="right">
			<Sheet.Header>
				<Sheet.Title>{title}</Sheet.Title>
				<Sheet.Description>{description}</Sheet.Description>
			</Sheet.Header>
			<Form.Provider {...form}>
				<form
					className="flex flex-col h-full gap-8"
					onSubmit={form.handleSubmit(handleSubmit)}
				>
					{loading ? (
						<div className="flex justify-center h-full items-center">
							<Loading size="lg" />
						</div>
					) : (
						renderData()
					)}

					{!loading && (
						<Sheet.Footer className="pb-8">
							{footerButtons.map(({ key, component, isCloser = false }) => {
								if (isCloser) {
									return (
										<Sheet.Close key={key} asChild>
											{component}
										</Sheet.Close>
									)
								}

								return <Fragment key={key}>{component}</Fragment>
							})}
						</Sheet.Footer>
					)}
				</form>
			</Form.Provider>
		</Sheet.Content>
	</Sheet.Root>
)
