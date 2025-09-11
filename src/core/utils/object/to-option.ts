import type { Option, WithId } from '@/core/domain/types'

type OptionSource = WithId<Record<string, unknown>>

export function toOption<T extends OptionSource>(
  object: T,
  labelKey: keyof T
): Option {
  const labelValue = object[labelKey]

  return {
    label: String(labelValue ?? object.id),
    value: object.id,
  }
}
