import { useState } from 'react'

import { Mail, Eye, EyeOff, LockKeyhole } from 'lucide-react'

import { LoginUserParams } from '@/domain/useCases'
import { InputDataGrouped } from '@/main/factories/components'
import { Input } from '@/presentation/components/ui'

export const useInputData = () => {
	const [viewPassword, setViewPassword] = useState(false)

	const inputData: InputDataGrouped<LoginUserParams>[] = [
		{
			key: 'email-group',
			group: [
				{
					name: 'email',
					label: 'Email *',
					renderComponent: ({ field, fieldState }) => (
						<Input
							{...field}
							value={field.value as string}
							placeholder="Email"
							iconsStart={[
								{
									key: Mail.displayName ?? 'Mail',
									icon: Mail
								}
							]}
							isError={!!fieldState.error?.message}
						/>
					)
				}
			]
		},
		{
			key: 'password-group',
			group: [
				{
					name: 'password',
					label: 'Senha *',
					renderComponent: ({ field, fieldState }) => (
						<Input
							{...field}
							value={field.value as string}
							placeholder="Senha"
							type={viewPassword ? 'text' : 'password'}
							iconsStart={[
								{
									key: LockKeyhole.displayName ?? 'LockKeyhole',
									icon: LockKeyhole
								}
							]}
							iconsEnd={[
								{
									key: viewPassword
										? EyeOff.displayName ?? 'EyeOff'
										: Eye.displayName ?? 'Eye',
									icon: viewPassword ? EyeOff : Eye,
									onClick: () => setViewPassword((oldValue) => !oldValue)
								}
							]}
							isError={!!fieldState.error?.message}
						/>
					)
				}
			]
		}
	]

	return {
		inputData
	}
}
