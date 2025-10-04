import type { Option, WithId } from '@/core/domain/types'

type OptionSource = WithId<Record<string, unknown>>

export function toOption<
  TOption extends OptionSource,
  TExtraData extends Record<PropertyKey, unknown> = Record<
    PropertyKey,
    unknown
  >,
>(
  object: TOption,
  labelKey: keyof TOption,
  extraData?: TExtraData
): Option<number, TExtraData> {
  const labelValue = object[labelKey]

  return {
    label: String(labelValue ?? object.id),
    value: object.id,
    extraData,
  }
}
