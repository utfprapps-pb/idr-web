import React from 'react'

import { ResetStyle } from '../../src/styles/base'

export const withResetStyle = (Story) => (
	<>
		<ResetStyle />
		<Story />
	</>
)
