import { withThemeByClassName } from '@storybook/addon-themes'

import '../src/styles/globals.css'
import { withRouter } from './decorators'

export const parameters = {
	backgrounds: {
		default: 'transparent',
	},
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
}

export const decorators = [
	withRouter,
	withThemeByClassName({
		themes: {
			light: 'light',
			dark: 'dark',
		},
		defaultTheme: 'light',
	}),
]
