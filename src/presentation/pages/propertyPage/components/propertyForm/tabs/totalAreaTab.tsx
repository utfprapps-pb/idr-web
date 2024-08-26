import { floatMask } from '@/masker'
import { Form, Input } from '@/presentation/components/ui'

import { TabProps } from './types'

export const TotalAreaTab: React.FC<TabProps> = ({ form }) => {
	const { control } = form

	return (
		<>
			<Form.Field
				name="totalArea.dairyCattleFarming"
				control={control}
				render={({ field, fieldState }) => {
					const { error } = fieldState

					return (
						<Form.Item>
							<Form.Label>Área destinada a Bovinocultura Leiteira</Form.Label>
							<Form.Control>
								<Input {...field} isError={!!error?.message} mask={floatMask} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)
				}}
			/>
			<Form.Field
				name="totalArea.perennialPasture"
				control={control}
				render={({ field, fieldState }) => {
					const { error } = fieldState

					return (
						<Form.Item>
							<Form.Label>Área de pasto perene</Form.Label>
							<Form.Control>
								<Input {...field} isError={!!error?.message} mask={floatMask} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)
				}}
			/>
			<Form.Field
				name="totalArea.summerPlowing"
				control={control}
				render={({ field, fieldState }) => {
					const { error } = fieldState

					return (
						<Form.Item>
							<Form.Label>Área de lavoura de verão</Form.Label>
							<Form.Control>
								<Input {...field} isError={!!error?.message} mask={floatMask} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)
				}}
			/>
			<Form.Field
				name="totalArea.winterPlowing"
				control={control}
				render={({ field, fieldState }) => {
					const { error } = fieldState

					return (
						<Form.Item>
							<Form.Label>Área de lavoura de inverno</Form.Label>
							<Form.Control>
								<Input {...field} isError={!!error?.message} mask={floatMask} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)
				}}
			/>
		</>
	)
}
