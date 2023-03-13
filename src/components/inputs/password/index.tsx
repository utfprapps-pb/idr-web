import React, { useMemo, useState } from 'react'

import { Eye, EyeClosed } from 'phosphor-react'

import { TextField, TextFieldProps } from '@/components'

export type PasswordInputProps = TextFieldProps

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
	const { iconsEnd } = props

	const [viewPassword, setViewPassword] = useState(false)

	const icon = useMemo(() => {
		if (!viewPassword)
			return <EyeClosed onClick={() => setViewPassword(!viewPassword)} />

		return <Eye onClick={() => setViewPassword(!viewPassword)} />
	}, [viewPassword])

	const allIconsEnd = iconsEnd ? [...iconsEnd, icon] : [icon]

	return (
		<TextField
			{...props}
			type={viewPassword ? 'text' : 'password'}
			iconsEnd={allIconsEnd}
		/>
	)
}
