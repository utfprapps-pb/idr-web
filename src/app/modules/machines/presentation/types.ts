import type { MachineModel } from '../domain/models/machines-model'
import type { Filters, Sort } from '@/core/domain/types'

export type MachineFilters = Filters<MachineModel>
export type MachineSort = Sort<MachineModel>
