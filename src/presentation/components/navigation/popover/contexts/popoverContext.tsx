import {
	PropsWithChildren,
	createContext,
	useContext,
	useMemo,
	useState
} from 'react'

import { PopoverRoot } from '../popoverRoot'

type PopoverContextProps = {
	open: boolean
	setOpen: (open: boolean) => void
}

export type PopoverProviderProps = PropsWithChildren

export const PopoverContext = createContext<PopoverContextProps>(
	{} as PopoverContextProps
)

export const PopoverProvider: React.FC<PopoverProviderProps> = ({
	children
}) => {
	const [open, setOpen] = useState(false)

	const contextValue = useMemo(() => ({ open, setOpen }), [open, setOpen])

	return (
		<PopoverContext.Provider value={contextValue}>
			<PopoverRoot>{children}</PopoverRoot>
		</PopoverContext.Provider>
	)
}

export const usePopoverContext = () => useContext(PopoverContext)
