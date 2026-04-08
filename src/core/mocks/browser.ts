import { type HttpHandler } from 'msw'
import { setupWorker } from 'msw/browser'

import {
  createAnimalHandler,
  deleteAnimalHandler,
  getAllAnimalsHandler,
  getAnimalHandler,
  getAnimalsHandler,
  updateAnimalHandler,
} from '@/app/modules/animals/mocks/handlers/'
import {
  createAnimalChildbirthHandler,
  deleteAnimalChildbirthHandler,
  getAnimalChildbirthHandler,
  getAnimalChildbirthsHandler,
  updateAnimalChildbirthHandler,
} from '@/app/modules/animals/mocks/handlers/animal-childbirths-handlers'
import {
  createAnimalDeathHandler,
  deleteAnimalDeathHandler,
  getAnimalDeathHandler,
  getAnimalDeathsHandler,
  updateAnimalDeathHandler,
} from '@/app/modules/animals/mocks/handlers/animal-deaths-handlers'
import {
  createAnimalDiseaseHandler,
  deleteAnimalDiseaseHandler,
  getAnimalDiseaseHandler,
  getAnimalDiseasesHandler,
  updateAnimalDiseaseHandler,
} from '@/app/modules/animals/mocks/handlers/animal-diseases-handlers'
import {
  createAnimalHeiferCalfStageHandler,
  deleteAnimalHeiferCalfStageHandler,
  getAnimalHeiferCalfStageAdditionalDataHandler,
  getAnimalHeiferCalfStageHandler,
  getAnimalHeiferCalfStagesHandler,
  updateAnimalHeiferCalfStageHandler,
} from '@/app/modules/animals/mocks/handlers/animal-heifer-calf-stages-handlers'
import {
  createAnimalInseminationHandler,
  deleteAnimalInseminationHandler,
  getAnimalInseminationHandler,
  getAnimalInseminationsHandler,
  updateAnimalInseminationHandler,
} from '@/app/modules/animals/mocks/handlers/animal-inseminations-handlers'
import {
  createAnimalMastitisHandler,
  deleteAnimalMastitisHandler,
  getAnimalMastitidesHandler,
  getAnimalMastitisHandler,
  updateAnimalMastitisHandler,
} from '@/app/modules/animals/mocks/handlers/animal-mastitides-handlers'
import {
  createAnimalMedicationHandler,
  deleteAnimalMedicationHandler,
  getAnimalMedicationHandler,
  getAnimalMedicationsHandler,
  updateAnimalMedicationHandler,
} from '@/app/modules/animals/mocks/handlers/animal-medications-handlers'
import {
  createAnimalPregnancyDiagnosisHandler,
  deleteAnimalPregnancyDiagnosisHandler,
  getAnimalPregnancyDiagnosesHandler,
  getAnimalPregnancyDiagnosisHandler,
  updateAnimalPregnancyDiagnosisHandler,
} from '@/app/modules/animals/mocks/handlers/animal-pregnancy-diagnoses-handlers'
import {
  createAnimalPurchaseHandler,
  deleteAnimalPurchaseHandler,
  getAnimalPurchaseHandler,
  getAnimalPurchasesHandler,
  updateAnimalPurchaseHandler,
} from '@/app/modules/animals/mocks/handlers/animal-purchases-handlers'
import {
  createAnimalSaleHandler,
  deleteAnimalSaleHandler,
  getAnimalSaleHandler,
  getAnimalSalesHandler,
  updateAnimalSaleHandler,
} from '@/app/modules/animals/mocks/handlers/animal-sales-handlers'
import { loginHandler } from '@/app/modules/auth/mocks/handlers'
import {
  createCultivationDiseaseHandler,
  deleteCultivationDiseaseHandler,
  getCultivationDiseaseHandler,
  getCultivationDiseasesHandler,
  updateCultivationDiseaseHandler,
} from '@/app/modules/cultivations/mocks/handlers/cultivation-diseases-handlers'
import {
  createCultivationPestHandler,
  deleteCultivationPestHandler,
  getCultivationPestHandler,
  getCultivationPestsHandler,
  updateCultivationPestHandler,
} from '@/app/modules/cultivations/mocks/handlers/cultivation-pests-handlers'
import {
  createForageHandler,
  deleteForageHandler,
  getForageHandler,
  getForagesHandler,
  updateForageHandler,
} from '@/app/modules/forages/mocks/handlers'
import {
  createGeneralCultivationDiseaseHandler,
  deleteGeneralCultivationDiseaseHandler,
  getGeneralCultivationDiseaseHandler,
  getGeneralCultivationDiseasesHandler,
  updateGeneralCultivationDiseaseHandler,
} from '@/app/modules/general-cultivations/mocks/handlers/general-cultivation-diseases-handlers'
import {
  createGeneralCultivationPestHandler,
  deleteGeneralCultivationPestHandler,
  getGeneralCultivationPestHandler,
  getGeneralCultivationPestsHandler,
  updateGeneralCultivationPestHandler,
} from '@/app/modules/general-cultivations/mocks/handlers/general-cultivation-pests-handlers'
import {
  createGeneralCultivationHandler,
  deleteGeneralCultivationHandler,
  getGeneralCultivationHandler,
  getGeneralCultivationsHandler,
  updateGeneralCultivationHandler,
} from '@/app/modules/general-cultivations/mocks/handlers/general-cultivations-handlers'
import {
  createImprovementHandler,
  deleteImprovementHandler,
  getImprovementHandler,
  getImprovementsHandler,
  updateImprovementHandler,
} from '@/app/modules/improvements/mocks/handlers'
import {
  createInputUseLocationHandler,
  deleteInputUseLocationHandler,
  getInputUseLocationHandler,
  getInputUseLocationsHandler,
  updateInputUseLocationHandler,
} from '@/app/modules/input-uses/mocks/handlers/input-use-locations-handlers'
import {
  createProductCategoryHandler,
  deleteProductCategoryHandler,
  getProductCategoryHandler,
  getProductCategoriesHandler,
  updateProductCategoryHandler,
} from '@/app/modules/input-uses/mocks/handlers/product-categories-handlers'
import {
  createMachineHandler,
  deleteMachineHandler,
  getMachineHandler,
  getMachinesHandler,
  updateMachineHandler,
} from '@/app/modules/machines/mocks/handlers'
import {
  createNutritionalBalancingHandler,
  deleteNutritionalBalancingHandler,
  getNutritionalBalancingHandler,
  getNutritionalBalancingsHandler,
  getLastVisitNutritionalBalancingsHandler,
  updateNutritionalBalancingHandler,
} from '@/app/modules/nutritional-balancings/mocks/handlers'
import {
  createPropertyHandler,
  deletePropertyHandler,
  getPropertiesHandler,
  getPropertyHandler,
  updatePropertyHandler,
} from '@/app/modules/properties/mocks/handlers'

import { getAllActiveIngredientsHandler } from './handlers/active-ingredients-handlers'
import { getAllBreedsHandler } from './handlers/breeds-handlers'
import { getAllProductsHandler } from './handlers/products-handlers'
import { getAllUsersHandler, getMeHandler } from './handlers/users-handlers'

const handlers: HttpHandler[] = [
  loginHandler,

  getAllBreedsHandler,

  getAllActiveIngredientsHandler,

  getAllProductsHandler,

  getAllUsersHandler,
  getMeHandler,

  createAnimalHandler,
  deleteAnimalHandler,
  getAllAnimalsHandler,
  getAnimalHandler,
  getAnimalsHandler,
  updateAnimalHandler,

  createForageHandler,
  deleteForageHandler,
  getForageHandler,
  getForagesHandler,
  updateForageHandler,

  createImprovementHandler,
  deleteImprovementHandler,
  getImprovementHandler,
  getImprovementsHandler,
  updateImprovementHandler,

  createPropertyHandler,
  deletePropertyHandler,
  getPropertiesHandler,
  getPropertyHandler,
  updatePropertyHandler,

  createMachineHandler,
  deleteMachineHandler,
  getMachineHandler,
  getMachinesHandler,
  updateMachineHandler,

  createAnimalChildbirthHandler,
  deleteAnimalChildbirthHandler,
  getAnimalChildbirthHandler,
  getAnimalChildbirthsHandler,
  updateAnimalChildbirthHandler,

  createAnimalHeiferCalfStageHandler,
  deleteAnimalHeiferCalfStageHandler,
  getAnimalHeiferCalfStageAdditionalDataHandler,
  getAnimalHeiferCalfStageHandler,
  getAnimalHeiferCalfStagesHandler,
  updateAnimalHeiferCalfStageHandler,

  createAnimalDiseaseHandler,
  deleteAnimalDiseaseHandler,
  getAnimalDiseaseHandler,
  getAnimalDiseasesHandler,
  updateAnimalDiseaseHandler,

  createAnimalPregnancyDiagnosisHandler,
  deleteAnimalPregnancyDiagnosisHandler,
  getAnimalPregnancyDiagnosisHandler,
  getAnimalPregnancyDiagnosesHandler,
  updateAnimalPregnancyDiagnosisHandler,

  createAnimalDeathHandler,
  deleteAnimalDeathHandler,
  getAnimalDeathHandler,
  getAnimalDeathsHandler,
  updateAnimalDeathHandler,

  createAnimalInseminationHandler,
  deleteAnimalInseminationHandler,
  getAnimalInseminationHandler,
  getAnimalInseminationsHandler,
  updateAnimalInseminationHandler,

  createAnimalPurchaseHandler,
  deleteAnimalPurchaseHandler,
  getAnimalPurchaseHandler,
  getAnimalPurchasesHandler,
  updateAnimalPurchaseHandler,

  createAnimalSaleHandler,
  deleteAnimalSaleHandler,
  getAnimalSaleHandler,
  getAnimalSalesHandler,
  updateAnimalSaleHandler,

  createAnimalMedicationHandler,
  deleteAnimalMedicationHandler,
  getAnimalMedicationHandler,
  getAnimalMedicationsHandler,
  updateAnimalMedicationHandler,

  createAnimalMastitisHandler,
  deleteAnimalMastitisHandler,
  getAnimalMastitisHandler,
  getAnimalMastitidesHandler,
  updateAnimalMastitisHandler,

  createGeneralCultivationHandler,
  deleteGeneralCultivationHandler,
  getGeneralCultivationHandler,
  getGeneralCultivationsHandler,
  updateGeneralCultivationHandler,

  createGeneralCultivationDiseaseHandler,
  deleteGeneralCultivationDiseaseHandler,
  getGeneralCultivationDiseaseHandler,
  getGeneralCultivationDiseasesHandler,
  updateGeneralCultivationDiseaseHandler,

  createGeneralCultivationPestHandler,
  deleteGeneralCultivationPestHandler,
  getGeneralCultivationPestHandler,
  getGeneralCultivationPestsHandler,
  updateGeneralCultivationPestHandler,

  createCultivationDiseaseHandler,
  deleteCultivationDiseaseHandler,
  getCultivationDiseaseHandler,
  getCultivationDiseasesHandler,
  updateCultivationDiseaseHandler,

  createCultivationPestHandler,
  deleteCultivationPestHandler,
  getCultivationPestHandler,
  getCultivationPestsHandler,
  updateCultivationPestHandler,

  createInputUseLocationHandler,
  deleteInputUseLocationHandler,
  getInputUseLocationHandler,
  getInputUseLocationsHandler,
  updateInputUseLocationHandler,

  createProductCategoryHandler,
  deleteProductCategoryHandler,
  getProductCategoryHandler,
  getProductCategoriesHandler,
  updateProductCategoryHandler,

  createNutritionalBalancingHandler,
  deleteNutritionalBalancingHandler,
  getLastVisitNutritionalBalancingsHandler,
  getNutritionalBalancingHandler,
  getNutritionalBalancingsHandler,
  updateNutritionalBalancingHandler,
]

export const worker = setupWorker(...handlers)
