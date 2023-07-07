import { withResetStyle, withRouter, withTheme } from './decorators'

export const parameters = {
	backgrounds: {
		default: 'transparent'
	},
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	}
}

export const decorators = [withResetStyle, withTheme, withRouter]
