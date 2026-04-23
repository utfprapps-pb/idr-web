import {
  type RequestInterface,
  type ListParams,
  type ListResponse,
} from '@/core/domain/types'

import { type ForageAvailabilityModel } from '../../models/forage-availability-model'

export type GetForageAvailabilitiesUseCase = RequestInterface<
  ListParams<ForageAvailabilityModel> & { propertyId: number },
  ListResponse<ForageAvailabilityModel>
>
