import { regionsData } from './regions.mjs'

export const citiesDependencies = ['regions']

const findRegion = (description) =>
  regionsData.find((region) => region.description === description)

export const citiesData = [
  {
    id: 'ad907cbd-704c-4da2-b998-d56e142302f5',
    name: 'Pato Branco',
    region: 'Sudoeste',
  },
  {
    id: 'b1c2d3e4-f5a6-7890-abcd-ef1234567890',
    name: 'Francisco Beltrão',
    region: 'Sudoeste',
  },
  {
    id: 'c2d3e4f5-a6b7-8901-bcde-f12345678901',
    name: 'Dois Vizinhos',
    region: 'Sudoeste',
  },
  {
    id: 'd3e4f5a6-b7c8-9012-cdef-123456789012',
    name: 'Clevelândia',
    region: 'Sudoeste',
  },
  {
    id: 'e4f5a6b7-c8d9-0123-defa-234567890123',
    name: 'Ampére',
    region: 'Sudoeste',
  },
  {
    id: 'f5a6b7c8-d9e0-1234-efab-345678901234',
    name: 'Cascavel',
    region: 'Oeste',
  },
  {
    id: 'a6b7c8d9-e0f1-2345-fabc-456789012345',
    name: 'Foz do Iguaçu',
    region: 'Oeste',
  },
  {
    id: 'b7c8d9e0-f1a2-3456-abcd-567890123456',
    name: 'Toledo',
    region: 'Oeste',
  },
  {
    id: 'c8d9e0f1-a2b3-4567-bcde-678901234567',
    name: 'Curitiba',
    region: 'Metropolitana',
  },
  {
    id: 'd9e0f1a2-b3c4-5678-cdef-789012345678',
    name: 'Londrina',
    region: 'Norte Central',
  },
  {
    id: 'e0f1a2b3-c4d5-6789-defa-890123456789',
    name: 'Maringá',
    region: 'Norte Central',
  },
  {
    id: 'f1a2b3c4-d5e6-7890-efab-901234567890',
    name: 'Guarapuava',
    region: 'Centro-Sul',
  },
].map(({ id, name, region: regionDescription }) => {
  const region = findRegion(regionDescription)

  return {
    id,
    name: `${name} - PR - ${regionDescription}`,
    state: 'PR',
    region: { id: region.id, name: region.description },
  }
})
