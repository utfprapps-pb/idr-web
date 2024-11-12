import type { PerennialForageDetailsModel } from '@/domain/models/perennialForageModel'
import type { IRequestInterface } from '@/domain/shared/types'
import type { WithId } from '@/domain/shared/types/withId'

export type IUpdatePerennialForage = IRequestInterface<
  WithId<PerennialForageDetailsModel>,
  void
>
