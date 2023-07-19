import React, { useMemo, useState } from 'react'

import { Eye, EyeClosed } from 'phosphor-react'

import { PasswordInputProps } from './types'
import { TextField } from '../textField'

export * from './types'

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
	const { disabled, iconsEnd, iconsStart, label, placeholder } = props

	const [viewPassword, setViewPassword] = useState(false)

	const iconProps = useMemo(() => {
		if (!viewPassword)
			return {
				icon: EyeClosed,
				onClick: () => setViewPassword(!viewPassword)
			}

		return {
			icon: Eye,
			onClick: () => setViewPassword(!viewPassword)
		}
	}, [viewPassword])

	return (
		<TextField.Root {...props}>
			<TextField.Label label={label} />
			<TextField.InputContainer>
				<TextField.Icons position="left">
					{iconsStart?.map(({ icon: Icon, key }) => (
						<TextField.Icon key={key} icon={Icon} />
					))}
				</TextField.Icons>
				<TextField.Icons position="right" isWithError>
					<>
						{iconsEnd?.map(({ icon: Icon, key }) => (
							<TextField.Icon key={key} icon={Icon} />
						))}
						<TextField.Icon icon={iconProps.icon} onClick={iconProps.onClick} />
					</>
				</TextField.Icons>
				<TextField.Input
					type={viewPassword ? 'text' : 'password'}
					disabled={disabled}
					placeholder={placeholder}
				/>
			</TextField.InputContainer>
			<TextField.Error />
		</TextField.Root>
	)
}
