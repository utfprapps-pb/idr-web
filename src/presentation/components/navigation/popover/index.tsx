import {
	PopoverProvider,
	PopoverProviderProps
} from './contexts/popoverContext'
import { PopoverContent } from './popoverContent'
import { PopoverTrigger } from './popoverTrigger'

export type PopoverProps = PopoverProviderProps

export const Popover = {
	Root: PopoverProvider,
	Trigger: PopoverTrigger,
	Content: PopoverContent
}
