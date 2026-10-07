import { db } from './db'

import type {
  PendingEntityRecord,
  PendingEntityStatus,
  SyncEntityType,
} from './types'

export async function addPendingEntity(
  entity: Omit<PendingEntityRecord, 'id'>
): Promise<void> {
  await db.pendingEntities.add(entity)
  window.dispatchEvent(new CustomEvent('pending-entities:changed'))
}

export async function getPendingEntities(): Promise<PendingEntityRecord[]> {
  return db.pendingEntities.where('status').equals('pending').toArray()
}

export async function updateEntityStatus(
  localId: string,
  status: PendingEntityStatus,
  syncedAt?: number,
  errorMessage?: string
): Promise<void> {
  await db.pendingEntities
    .where('localId')
    .equals(localId)
    .modify({
      status,
      ...(syncedAt !== undefined ? { syncedAt } : {}),
      ...(errorMessage !== undefined ? { errorMessage } : {}),
    })
  window.dispatchEvent(new CustomEvent('pending-entities:changed'))
}

export async function getPendingEntityCount(): Promise<number> {
  return db.pendingEntities.where('status').equals('pending').count()
}

export async function getPendingEntitiesByType(
  type: SyncEntityType
): Promise<PendingEntityRecord[]> {
  return db.pendingEntities
    .where('status')
    .equals('pending')
    .and((e) => e.type === type)
    .toArray()
}

export async function updateEntityData(
  id: number,
  data: Record<string, unknown>
): Promise<void> {
  await db.pendingEntities.update(id, { data })
}
