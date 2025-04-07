import type { AnimalHeiferCalfStageFormSchema } from '../../validations/animal-heifer-calf-stage-form-schema'

export const ANIMAL_HEIFER_CALF_STAGE_INITIAL_FORM_DATA: AnimalHeiferCalfStageFormSchema =
  {
    weighingDate: new Date(),
    ecc: '',
    weighing: {
      last: '',
      current: '',
    },
    age: {
      years: '',
      months: '',
    },
    ageWeightEstimate: {
      min: '',
      max: '',
    },
    amountOfEstimateConcentrate: {
      correction: '',
      calf: '',
      heifer: '',
    },
    amountOfMilk: {
      correction: '',
      morning: '',
      afternoon: '',
    },
    bulky: '',
    gmd: {
      min: '',
      max: '',
      real: '',
      status: 'normal',
    },
    reproduction: {
      minWeight: '',
      artificialInseminationNumber: '',
      carriedOut: new Date(),
      status: 'fit',
    },
  }
