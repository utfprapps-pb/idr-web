import type { PropertyModel } from '@/domain/models'
import type { IDeleteProperty } from '@/domain/useCases'

export type PropertyDeleteContainerProps = {
	property?: PropertyModel
	open: boolean
	deleteProperty: IDeleteProperty
	onOpen: (open: boolean) => void
}
