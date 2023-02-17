import { media } from './breakpoints'
import { colors, opacity } from './colors'

export const sg = Object.freeze({
	opacity,
	colors,
	media,
	fontFamily: {
		primary: "'Figtree', 'Roboto'"
	},
	fontSize: {
		large: '20px',
		medium: '18px',
		default: '16px',
		small: '14px',
		smaller: '12px'
	},
	heading: {
		1: '104px',
		2: '76px',
		3: '48px',
		4: '32px'
	},
	spacing: {
		xsmall: '2px',
		small: '4px',
		medium: '8px',
		large: '12px',
		xlarge: '16px',
		xxlarge: '24px',
		xxxlarge: '34px'
	}
})
