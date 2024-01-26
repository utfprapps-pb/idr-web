export interface ITheme {
	colors: {
		primary: string
		secondary: string
		white: string
		black: string
		text: string
		lightgray: string
		gray: string
		darkgray: string
		disabled: {
			background: string
			border: string
			text: string
		}
		background: string
		error: string
	}
	fontFamily: {
		primary: string
		logo: string
	}
	fontSizes: {
		h1: string
		h2: string
		h3: string
		h4: string
		h5: string
		b1: string
		b2: string
		b3: string
		b4: string
	}
	fontWeights: {
		light: string
		regular: string
		bold: string
	}
	media: {
		lessThan: (breakpoint: number) => string
		between: (first: number, second: number) => string
		greaterThan: (breakpoint: number) => string
		forPhoneOnly: () => string
		forTablePortraitUp: () => string
		forTablePortraitOnly: () => string
		forTableLandscapeUp: () => string
		forTableLandscapeOnly: () => string
		forDesktopUp: () => string
		forDesktopOnly: () => string
		forBigDesktopUp: () => string
	}
}
