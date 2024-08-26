import { useHookForm } from '@/presentation/hooks'

import type { PropertySchema } from '../types'

export type TabProps = {
	form: ReturnType<typeof useHookForm<PropertySchema>>
}
