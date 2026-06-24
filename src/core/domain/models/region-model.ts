export type RegionModel = { id: string; description: string }

export type RegionSearchApiResponse = {
  currentPage: number
  perPage: number
  total: number
  items: RegionModel[]
}
