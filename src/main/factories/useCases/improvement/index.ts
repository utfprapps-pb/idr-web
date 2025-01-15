import { makeRemoteCreateImprovement } from './remoteCreateImprovementFactory'
import { makeRemoteDeleteImprovement } from './remoteDeleteImprovementFactory'
import { makeRemoteGetImprovement } from './remoteGetImprovementFactory'
import { makeRemoteGetImprovements } from './remoteGetImprovementsFactory'
import { makeRemoteUpdateImprovement } from './remoteUpdateImprovementFactory'

export const ImprovementDataFactory = {
  makeRemoteCreateImprovement,
  makeRemoteDeleteImprovement,
  makeRemoteGetImprovement,
  makeRemoteGetImprovements,
  makeRemoteUpdateImprovement,
}
