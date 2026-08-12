import { baseApi } from '@/core/infra/http/api-http-client/api-http-client'
import {
  getServerIdByLocalId,
  saveIdMapping,
} from '@/core/lib/offline/id-mapping'
import {
  getPendingEntities,
  updateEntityStatus,
  updateProducerLocalIdInProperties,
} from '@/core/lib/offline/pending-entities'

import type {
  PendingEntityRecord,
  SyncUploadEntity,
  SyncUploadResponse,
} from '@/core/lib/offline/types'

const BATCH_SIZE = 100

export type UploadProgress = { current: number; total: number }

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve((reader.result as string).split(',')[1] ?? '')
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

async function serializeEntityData(
  data: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const { attachments } = data
  if (!Array.isArray(attachments) || attachments.length === 0) return data

  const serializedAttachments = await Promise.all(
    attachments.map(async (attachment) => {
      if (!(attachment instanceof File)) return attachment
      return {
        fileName: attachment.name,
        contentType: attachment.type,
        base64: await fileToBase64(attachment),
      }
    })
  )

  return { ...data, attachments: serializedAttachments }
}

export async function uploadPendingEntities(
  onProgress?: (p: UploadProgress) => void
): Promise<void> {
  const pending = await getPendingEntities()
  if (pending.length === 0) return

  const producers = pending.filter((e) => e.type === 'PRODUCER')
  const properties = pending.filter((e) => e.type === 'PROPERTY')

  const resolvedProperties: PendingEntityRecord[] = (
    await Promise.all(
      properties.map(async (prop) => {
        if (!prop.data.producerLocalId) return prop
        const serverId = await getServerIdByLocalId(
          prop.data.producerLocalId as string
        )
        if (serverId) {
          const data = { ...(prop.data as Record<string, unknown>) }
          delete data.producerLocalId
          return { ...prop, data: { ...data, producerId: serverId } }
        }
        const batchProducer = producers.find(
          (p) => p.localId === (prop.data.producerLocalId as string)
        )
        if (!batchProducer) return null
        return prop
      })
    )
  ).filter((p): p is PendingEntityRecord => p !== null)

  const ordered = [...producers, ...resolvedProperties]
  const batches: PendingEntityRecord[][] = []
  for (let i = 0; i < ordered.length; i += BATCH_SIZE) {
    batches.push(ordered.slice(i, i + BATCH_SIZE))
  }

  const total = batches.length
  for (let i = 0; i < batches.length; i += 1) {
    onProgress?.({ current: i + 1, total })
    const batch = batches[i]!
    // eslint-disable-next-line no-await-in-loop
    const entities: SyncUploadEntity[] = await Promise.all(
      batch.map(async (e) => ({
        type: e.type,
        localId: e.localId,
        data: await serializeEntityData(e.data),
      }))
    )

    // eslint-disable-next-line no-await-in-loop
    const response = await baseApi.post<SyncUploadResponse>('/v1/sync/upload', {
      entities,
    })
    const { results } = response.data

    // eslint-disable-next-line no-await-in-loop
    await Promise.all(
      results.map(async (result) => {
        if (result.status !== 'CREATED' && result.status !== 'EXISTING') return
        const entity = batch.find((e) => e.localId === result.localId)
        if (!entity) return
        await updateEntityStatus(result.localId, 'synced', Date.now())
        await saveIdMapping(result.localId, result.serverId, entity.type)
        if (entity.type === 'PRODUCER') {
          await updateProducerLocalIdInProperties(
            result.localId,
            result.serverId
          )
        }
      })
    )
  }
}
