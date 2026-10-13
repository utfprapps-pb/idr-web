import { CACHE_TTL_MS, db } from './db'

import type { ReferenceDataRecord } from './types'

export async function saveReferenceData(
  key: ReferenceDataRecord['key'],
  data: unknown[]
): Promise<void> {
  await db.referenceData.put({ key, data, cachedAt: Date.now() })
  window.dispatchEvent(new CustomEvent('reference-data:changed'))
}

export async function getReferenceData<T = unknown>(
  key: ReferenceDataRecord['key']
): Promise<T[]> {
  const record = await db.referenceData.get(key)
  return (record?.data as T[]) ?? []
}

export async function getCacheTimestamp(
  key: ReferenceDataRecord['key']
): Promise<number | null> {
  const record = await db.referenceData.get(key)
  return record?.cachedAt ?? null
}

export async function isCacheValid(): Promise<boolean> {
  const record = await db.referenceData.get('cities')
  if (!record) return false
  return Date.now() - record.cachedAt < CACHE_TTL_MS
}

export async function isCacheExpired(): Promise<boolean> {
  const record = await db.referenceData.get('cities')
  if (!record) return false
  return Date.now() - record.cachedAt >= CACHE_TTL_MS
}
