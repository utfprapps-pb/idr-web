import Dexie, { type Table } from 'dexie'

import type {
  IdMappingRecord,
  PendingEntityRecord,
  ReferenceDataRecord,
} from './types'

export const CACHE_TTL_MS = 24 * 60 * 60 * 1000

class OfflineDB extends Dexie {
  referenceData!: Table<ReferenceDataRecord>

  pendingEntities!: Table<PendingEntityRecord>

  idMapping!: Table<IdMappingRecord>

  constructor() {
    super('idr-offline')
    this.version(1).stores({
      referenceData: 'key',
      pendingEntities: '++id, localId, type, status',
      idMapping: 'localId, serverId, type',
    })
  }
}

export const db = new OfflineDB()
