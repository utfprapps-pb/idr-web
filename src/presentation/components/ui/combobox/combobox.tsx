import { useState } from 'react'

import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'
import { Command } from '@/presentation/components/ui/command'
import { Loading } from '@/presentation/components/ui/loading'
import { Popover } from '@/presentation/components/ui/popover'
import { cn } from '@/shared/utils/tailwind'

import type { ComboboxProps } from './types'

export const Combobox: React.FC<ComboboxProps> = ({
	search,
	handleSearch,
	items,
	selected,
	handleSelect,
	placeholder,
	searchPlaceholder,
	emptyMessage,
	loading = false,
	isError = false,
}) => {
	const [open, setOpen] = useState(false)

	return (
		<Popover.Root open={open} onOpenChange={setOpen}>
			<Popover.Trigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn(
						'w-full justify-between',
						isError && 'border border-red-500',
						!selected && 'text-muted-foreground'
					)}
				>
					{selected?.label
						? selected.label
						: placeholder ?? 'Selecione um item'}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</Popover.Trigger>
			<Popover.Content className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
				<Command.Root shouldFilter={false}>
					<Command.Input
						value={search}
						onValueChange={(value) => handleSearch(value)}
						placeholder={searchPlaceholder ?? 'Buscar'}
					/>
					<Command.List>
						{!loading && !items.length && (
							<Command.Empty>
								{emptyMessage ?? 'Nenhum registro encontrado'}
							</Command.Empty>
						)}

						{loading ? (
							<Command.Loading>
								<Loading />
							</Command.Loading>
						) : (
							<Command.Group>
								{items.map((item) => (
									<Command.Item
										key={item.value}
										value={item.value}
										onSelect={(currentValue: string) => {
											const selectedItem = items.find(
												(it) => it.value === currentValue
											) ?? { label: '', value: '' }

											handleSelect(selectedItem)
											setOpen(false)
										}}
									>
										<Check
											className={cn(
												'mr-2 h-4 w-4',
												selected.value === item.value
													? 'opacity-100'
													: 'opacity-0'
											)}
										/>
										{item.label}
									</Command.Item>
								))}
							</Command.Group>
						)}
					</Command.List>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
	)
}

Combobox.displayName = 'Combobox'
