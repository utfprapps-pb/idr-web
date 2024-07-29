import { useHookForm } from '@/presentation/hooks'

import type { PropertyDetailsModel } from '@/domain/models'

export type TabProps = {
	form: ReturnType<typeof useHookForm<PropertyDetailsModel>>
}
