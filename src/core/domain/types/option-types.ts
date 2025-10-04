export type Option<
  TValue = number,
  TExtraData extends Record<PropertyKey, unknown> = Record<
    PropertyKey,
    unknown
  >,
> = {
  label: string
  value: TValue
  extraData?: TExtraData
}
