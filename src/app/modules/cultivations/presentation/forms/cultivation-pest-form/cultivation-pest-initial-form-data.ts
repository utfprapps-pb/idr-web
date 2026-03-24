import type { CultivationPestFormSchema } from '../../validations/cultivation-pest-form-schema'

export const CULTIVATION_PEST_INITIAL_FORM_DATA: CultivationPestFormSchema = {
  pest: {
    value: 0,
    label: '',
  },
  cultivation: {
    value: 0,
    label: '',
  },
  infestationType: 'LOW',
}
