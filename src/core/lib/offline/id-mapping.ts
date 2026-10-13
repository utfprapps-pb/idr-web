import { db } from './db'

import type { SyncEntityType } from './types'

export async function saveIdMapping(
  localId: string,
  serverId: string,
  type: SyncEntityType
): Promise<void> {
  await db.idMapping.put({ localId, serverId, type })
}

export async function getServerIdByLocalId(
  localId: string
): Promise<string | null> {
  const record = await db.idMapping.get(localId)
  return record?.serverId ?? null
}
