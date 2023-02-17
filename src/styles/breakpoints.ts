const breakpoints = Object.freeze({
	xsmall: 600,
	small: 960,
	medium: 1280,
	large: 1920
})

const extractBreakpointValue = (breakpoint: number) => `${breakpoint}px`

export const media = {
	lessThan: (breakpoint: number): string => {
		return `@media(max-width: ${extractBreakpointValue(breakpoint)})`
	},
	between: (first: number, second: number): string => {
		const parsedFirst = extractBreakpointValue(first)
		const parsedSecond = extractBreakpointValue(second)

		return `@media (min-width: ${parsedFirst}) and (max-width: ${parsedSecond})`
	},
	greaterThan: (breakpoint: number): string => {
		return `@media(min-width: ${extractBreakpointValue(breakpoint)})`
	},
	forPhoneOnly: (): string => {
		return `@media(max-width: ${extractBreakpointValue(breakpoints.xsmall)})`
	},
	forTablePortraitUp: (): string => {
		return `@media(min-width: ${extractBreakpointValue(breakpoints.xsmall)})`
	},
	forTablePortraitOnly: (): string => {
		return `@media(min-width: ${extractBreakpointValue(
			breakpoints.xsmall
		)}) and (max-width: ${extractBreakpointValue(breakpoints.small)})`
	},
	forTableLandscapeUp: (): string => {
		return `@media(min-width: ${extractBreakpointValue(breakpoints.small)})`
	},
	forTableLandscapeOnly: (): string => {
		return `@media(min-width: ${extractBreakpointValue(
			breakpoints.small
		)}) and (max-width: ${extractBreakpointValue(breakpoints.medium)})`
	},
	forDesktopUp: (): string => {
		return `@media(min-width: ${extractBreakpointValue(breakpoints.medium)})`
	},
	forDesktopOnly: (): string => {
		return `@media(min-width: ${extractBreakpointValue(
			breakpoints.medium
		)}) and (max-width: ${extractBreakpointValue(breakpoints.large)})`
	},
	forBigDesktopUp: (): string => {
		return `@media(min-width: ${extractBreakpointValue(breakpoints.large)})`
	}
}
