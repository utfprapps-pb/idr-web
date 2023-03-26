import { darken, lighten } from '@/main/utils'
import { theme } from '@/styles'

export enum ButtonThemes {
	primary = 'primary',
	outline = 'outline',
	success = 'success',
	error = 'error'
}

export type ButtonThemeProps = {
	color: string
	background: string
	backgroundHover: string

	border?: string
}

export const buttonThemes: { [key in ButtonThemes]: ButtonThemeProps } = {
	primary: {
		color: lighten({ color: theme.colors.white, percentage: 0.1 }),
		background: lighten({ color: theme.colors.primary }),
		backgroundHover: theme.colors.primary
	},
	outline: {
		color: theme.colors.primary,
		background: theme.colors.white,
		backgroundHover: darken({ color: theme.colors.white, percentage: 0.024 }),
		border: `1px solid ${theme.colors.primary}`
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
