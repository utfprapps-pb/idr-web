import { useHookForm } from '@/presentation/hooks'

import type { PropertySchema } from '../validation'

export type TabProps = {
  form: ReturnType<typeof useHookForm<PropertySchema>>
}
