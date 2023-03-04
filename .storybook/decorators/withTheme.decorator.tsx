import React from 'react'

import { ThemeProvider } from 'styled-components'
import { theme } from '../../src/styles'

export const withTheme = (Story) => (
	<ThemeProvider theme={theme}>
		<Story />
	</ThemeProvider>
)
