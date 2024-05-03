import { Option } from '@/domain/shared'

export type ComboboxProps = {
	search: string
	handleSearch: (search: string) => void
	items: Option[]
	selected: Option
	handleSelect: (item: Option) => void
	placeholder?: string
	searchPlaceholder?: string
	emptyMessage?: string
	loading?: boolean
}
