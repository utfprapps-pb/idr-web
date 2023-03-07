import { Theme } from '@/styles'

const breakpoints = Object.freeze({
	xsmall: 600,
	small: 960,
	medium: 1280,
	large: 1920
})

const extractBreakpointValue = (breakpoint: number) => `${breakpoint}px`

export const theme: Theme = {
	colors: {
		primary: '#0B71B9',
		secondary: '#038657',
		white: '#FFFFFF',
		black: '#070813',
		lightgray: '#8D8D8D',
		gray: '#444545',
		darkgray: '#202328',
		background: '#e4eeea',
		error: '#D51A52'
	},
	fontFamily: {
		primary: "'Figtree', 'Roboto'"
	},
	fontSizes: {
		h1: '104px',
		h2: '76px',
		h3: '48px',
		h4: '32px',
		h5: '24px',
		b1: '24px',
		b2: '20px',
		b3: '16px',
		b4: '12px'
	},
	fontWeights: {
		light: '400',
		regular: '500',
		bold: '700'
	},
	media: {
		lessThan: (breakpoint: number): string =>
			`@media(max-width: ${extractBreakpointValue(breakpoint)})`,
		between: (first: number, second: number): string => {
			const parsedFirst = extractBreakpointValue(first)
			const parsedSecond = extractBreakpointValue(second)

			return `@media (min-width: ${parsedFirst}) and (max-width: ${parsedSecond})`
		},
		greaterThan: (breakpoint: number): string =>
			`@media(min-width: ${extractBreakpointValue(breakpoint)})`,
		forPhoneOnly: (): string =>
			`@media(max-width: ${extractBreakpointValue(breakpoints.xsmall)})`,
		forTablePortraitUp: (): string =>
			`@media(min-width: ${extractBreakpointValue(breakpoints.xsmall)})`,
		forTablePortraitOnly: (): string =>
			`@media(min-width: ${extractBreakpointValue(
				breakpoints.xsmall
			)}) and (max-width: ${extractBreakpointValue(breakpoints.small)})`,
		forTableLandscapeUp: (): string =>
			`@media(min-width: ${extractBreakpointValue(breakpoints.small)})`,
		forTableLandscapeOnly: (): string =>
			`@media(min-width: ${extractBreakpointValue(
				breakpoints.small
			)}) and (max-width: ${extractBreakpointValue(breakpoints.medium)})`,
		forDesktopUp: (): string =>
			`@media(min-width: ${extractBreakpointValue(breakpoints.medium)})`,
		forDesktopOnly: (): string =>
			`@media(min-width: ${extractBreakpointValue(
				breakpoints.medium
			)}) and (max-width: ${extractBreakpointValue(breakpoints.large)})`,
		forBigDesktopUp: (): string =>
			`@media(min-width: ${extractBreakpointValue(breakpoints.large)})`
	}
}
