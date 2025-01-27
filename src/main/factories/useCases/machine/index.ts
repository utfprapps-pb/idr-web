import { makeRemoteCreateMachine } from './remoteCreateMachineFactory'
import { makeRemoteDeleteMachine } from './remoteDeleteMachineFactory'
import { makeRemoteGetMachine } from './remoteGetMachineFactory'
import { makeRemoteGetMachines } from './remoteGetMachinesFactory'
import { makeRemoteUpdateMachine } from './remoteUpdateMachineFactory'

export const MachineDataFactory = {
  makeRemoteCreateMachine,
  makeRemoteDeleteMachine,
  makeRemoteGetMachine,
  makeRemoteGetMachines,
  makeRemoteUpdateMachine,
}
