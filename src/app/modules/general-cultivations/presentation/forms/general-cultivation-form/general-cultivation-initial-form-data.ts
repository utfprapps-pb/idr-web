import type { GeneralCultivationFormSchema } from '../../validations/general-cultivation-form-schema'

export const GENERAL_CULTIVATION_INITIAL_FORM_DATA: GeneralCultivationFormSchema =
  {
    name: '',
    type: 'FORAGE',
    crudeProtein: '',
    totalDigestibleNutrients: '',
    dryMatter: '',
    calcium: '',
    phosphorus: '',
    nonFibrousCarbohydrates: '',
    etherExtract: '',
    rumenDegradableProtein: '',
  }
