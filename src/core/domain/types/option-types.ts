export type Option<TValue = number> = {
  id: { value: number; label: string }
  name: any
  label: string
  value: TValue
}
