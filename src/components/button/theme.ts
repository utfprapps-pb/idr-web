import { theme } from '@/styles'
import { lighten } from '@/utils'

export enum ButtonThemes {
	primary = 'primary',
	success = 'success',
	error = 'error'
}

export type ButtonThemeProps = {
	color: string
	background: string
	backgroundHover: string
}

export const buttonThemes: { [key in ButtonThemes]: ButtonThemeProps } = {
	primary: {
		color: lighten({ color: theme.colors.white, percentage: 0.1 }),
		background: theme.colors.primary,
		backgroundHover: lighten({ color: theme.colors.primary, percentage: 0.2 })
	},
	success: {
		color: lighten({ color: theme.colors.white, percentage: 0.1 }),
		background: theme.colors.secondary,
		backgroundHover: lighten({ color: theme.colors.secondary, percentage: 0.2 })
	},
	error: {
		color: lighten({ color: theme.colors.white, percentage: 0.1 }),
		background: theme.colors.error,
		backgroundHover: lighten({ color: theme.colors.error, percentage: 0.2 })
	}
}
