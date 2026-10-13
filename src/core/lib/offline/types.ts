export type SyncEntityType = 'PRODUCER' | 'PROPERTY'
export type PendingEntityStatus = 'pending' | 'synced' | 'error'

export type ReferenceDataRecord = {
  key: 'regions' | 'cities' | 'producers'
  data: unknown[]
  cachedAt: number
}

export type PendingEntityRecord = {
  id?: number
  localId: string
  type: SyncEntityType
  data: Record<string, unknown>
  status: PendingEntityStatus
  errorMessage?: string
  syncedAt?: number
}

export type IdMappingRecord = {
  localId: string
  serverId: string
  type: SyncEntityType
}

export type ReferenceRegion = { id: string; name: string }
export type ReferenceCity = { id: string; name: string; state: string }
export type ReferenceProducer = {
  id: string
  name: string
  cpf: string
  version: number
  updatedAt: string
}

export type SyncDownloadResponse = {
  schemaVersion: string
  regions: ReferenceRegion[]
  cities: ReferenceCity[]
  producers: ReferenceProducer[]
}

export type SyncUploadEntity = {
  type: SyncEntityType
  localId: string
  data: Record<string, unknown>
}

export type SyncUploadResult = {
  localId: string
  serverId: string
  status: 'CREATED' | 'EXISTING'
  message: string | null
}

export type SyncUploadResponse = {
  results: SyncUploadResult[]
}
