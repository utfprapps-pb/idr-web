import { describe, expect, it } from 'vitest'

import { missingMedicationFields } from './medication-mock-rules'

const body = {
  applicationDate: '2024-06-10',
  appliedDose: '10 ml',
  applicationWay: 'IM',
  productId: null,
  productName: 'Vacina X',
  activePrinciple: null,
}

describe('missingMedicationFields', () => {
  it('exige data, dose e via, como a API', () => {
    expect(
      missingMedicationFields({
        ...body,
        applicationDate: null,
        appliedDose: ' ',
        applicationWay: null,
      })
    ).toEqual(['applicationDate', 'appliedDose', 'applicationWay'])
  })

  it('sem produto do catálogo, exige o nome digitado', () => {
    expect(missingMedicationFields({ ...body, productName: '' })).toEqual([
      'productName',
    ])
  })

  it('com produto do catálogo, o nome vem dele e não é exigido', () => {
    expect(
      missingMedicationFields({ ...body, productId: 'p1', productName: '' })
    ).toEqual([])
  })
})
