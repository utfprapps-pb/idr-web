import { darken, lighten } from '@/main/utils'
import { theme } from '@/styles'

export type ButtonThemes = 'primary' | 'outline' | 'text' | 'success' | 'error'

export type ButtonThemeProps = {
	color: string
	background: string
	backgroundHover: string

	border?: string
}

export const buttonThemes: { [key in ButtonThemes]: ButtonThemeProps } = {
	primary: {
		color: lighten({ color: theme.colors.white }),
		background: lighten({ color: theme.colors.primary }),
		backgroundHover: theme.colors.primary
	},
	outline: {
		color: theme.colors.primary,
		background: theme.colors.white,
		backgroundHover: darken({ color: theme.colors.white, percentage: 0.05 }),
		border: `1px solid ${theme.colors.primary}`
	},
	text: {
		color: theme.colors.primary,
		background: 'transparent',
		backgroundHover: darken({ color: theme.colors.white, percentage: 0.05 })
	},
	success: {
		color: lighten({ color: theme.colors.white }),
		background: theme.colors.secondary,
		backgroundHover: lighten({ color: theme.colors.secondary, percentage: 0.2 })
	},
	error: {
		color: lighten({ color: theme.colors.white }),
		background: theme.colors.error,
		backgroundHover: lighten({ color: theme.colors.error, percentage: 0.2 })
	}
}
