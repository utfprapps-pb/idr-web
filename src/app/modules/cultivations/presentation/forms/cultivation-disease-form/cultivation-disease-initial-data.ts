import type { CultivationDiseaseFormSchema } from '../../validations/cultivation-disease-form-schema'

export const CULTIVATION_DISEASE_INITIAL_FORM_DATA: CultivationDiseaseFormSchema =
  {
    disease: {
      value: 0,
      label: '',
    },
    cultivation: {
      value: 0,
      label: '',
    },
    infestationType: 'LOW',
  }
