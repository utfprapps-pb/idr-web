import React, { ReactElement, ReactNode, useMemo, useState } from 'react'

import { Eye, EyeClosed } from 'phosphor-react'

import { TextField, TextFieldProps } from '../textField'

export type PasswordInputProps = TextFieldProps & {
	label: string
	iconsStart?: ReactElement
	iconsEnd?: ReactNode
}

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
	const { label, iconsStart, iconsEnd } = props

	const [viewPassword, setViewPassword] = useState(false)

	const icon = useMemo(() => {
		if (!viewPassword)
			return <EyeClosed onClick={() => setViewPassword(!viewPassword)} />

		return <Eye onClick={() => setViewPassword(!viewPassword)} />
	}, [viewPassword])

	return (
		<TextField.Root {...props}>
			<TextField.Label label={label} />
			<TextField.InputContainer>
				<TextField.Icons position="left">{iconsStart}</TextField.Icons>
				<TextField.Icons position="right">
					<>
						{iconsEnd}
						<TextField.Icon icon={icon} />
					</>
				</TextField.Icons>
				<TextField.Input type={viewPassword ? 'text' : 'password'} />
			</TextField.InputContainer>
			<TextField.Error />
		</TextField.Root>
	)
}
