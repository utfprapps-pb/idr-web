import type { MachineModel } from '@/domain/models/machineModel'
import type { Filters, Sort } from '@/domain/shared/types'

export type MachineFilters = Partial<Filters<keyof MachineModel>>

export type MachineSort = Sort<keyof MachineModel>
