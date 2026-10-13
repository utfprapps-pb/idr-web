export type CityModel = {
  id: string
  name: string
  state: string
  regionId: string
  regionName: string
}

export type CityApiResponse = {
  id: string
  name: string
  state: string
  region: { id: string; name: string }
}

export type CityDetailsModel = {
  name: string
  state: string
  regionId: string
}

export type CityDetailsApiResponse = {
  name: string
  state: string
  regionId: string
}
