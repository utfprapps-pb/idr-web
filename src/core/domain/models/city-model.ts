export type CityModel = { id: string; name: string }

export type CityApiResponse = {
  id: string
  name: string
  state: string
  region: { id: string; name: string }
}

export type CitySearchApiResponse = {
  currentPage: number
  perPage: number
  total: number
  items: CityApiResponse[]
}
