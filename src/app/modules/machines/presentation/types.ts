import type { MachineModel } from '../domain/models/machines-model'
import type { Filters, Sort } from '@/core/domain/types'

export type MachineFilters = Partial<Filters<MachineModel>>

export type MachineSort = Sort<keyof MachineModel>
