import React from 'react'

import { ResetStyle } from '../../src/styles'

export const withResetStyle = (Story) => (
	<>
		<ResetStyle />
		<Story />
	</>
)
