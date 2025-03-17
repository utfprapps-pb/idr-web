type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

export type MergeUnionTypes<U> =
  UnionToIntersection<U> extends infer O ? { [K in keyof O]: O[K] } : never
