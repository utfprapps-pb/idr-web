import { ValidationBuilder } from '@/main/builders'
import { ValidationComposite } from '@/main/composite'

import type { PropertyDetailsModel } from '@/domain/models'
import type { NestedKeyOf } from '@/domain/shared/types'

export const makePropertyValidation = () =>
	ValidationComposite.build([
		...ValidationBuilder.field<NestedKeyOf<PropertyDetailsModel>>(
			'general.name'
		)
			.required()
			.build(),

		...ValidationBuilder.field<NestedKeyOf<PropertyDetailsModel>>(
			'general.city'
		)
			.required()
			.build(),

		...ValidationBuilder.field<NestedKeyOf<PropertyDetailsModel>>(
			'general.producer'
		)
			.required()
			.build(),

		...ValidationBuilder.field<NestedKeyOf<PropertyDetailsModel>>(
			'general.nakedAveragePricePerHectare'
		)
			.required()
			.minNumber(0.01)
			.build(),

		...ValidationBuilder.field<NestedKeyOf<PropertyDetailsModel>>(
			'general.leaseAveragePricePerHectare'
		)
			.required()
			.minNumber(0.01)
			.build(),

		...ValidationBuilder.field<NestedKeyOf<PropertyDetailsModel>>(
			'general.responsibleTechnicians'
		)
			.required()
			.min(1)
			.build()
	])
