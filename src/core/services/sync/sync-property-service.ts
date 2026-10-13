import {
  getPendingEntitiesByType,
  updateEntityData,
} from '@/core/lib/offline/pending-entities'

export async function resolveProducerIdInPendingProperties(
  producerLocalId: string,
  producerId: string
): Promise<void> {
  const properties = await getPendingEntitiesByType('PROPERTY')

  await Promise.all(
    properties
      .filter(
        (property) =>
          property.id !== undefined &&
          property.data.producerLocalId === producerLocalId
      )
      .map((property) => {
        const data: Record<string, unknown> = { ...property.data, producerId }
        delete data.producerLocalId
        return updateEntityData(property.id!, data)
      })
  )
}
