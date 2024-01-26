import { PropsWithChildren } from 'react'

import { ITheme } from '@/styles/themes'

type Props = {
	/**
	 * Size of the text
	 * @example
	 * ```tsx
	 * <Text size="b1" />
	 * ```
	 */
	size: keyof ITheme['fontSizes']

	/**
	 * Color of the text
	 * @example
	 * ```tsx
	 * <Text color="primary" />
	 * ```
	 */
	color?: keyof ITheme['colors']

	/**
	 * The family of the font
	 * @example
	 * ```tsx
	 * <Text fontFamily="secondary" />
	 * ```
	 */
	fontFamily?: keyof ITheme['fontFamily']

	/**
	 * The class name of the text
	 * @example
	 * ```tsx
	 * <Text className="my-class" />
	 * ```
	 */
	className?: string

	/**
	 * The style of the text
	 * @example
	 * ```tsx
	 * <Text styles={{ color: 'red' }} />
	 * ```
	 */
	styles?: React.CSSProperties

	/**
	 * Function to be called when the text is clicked
	 * @example
	 * ```tsx
	 * <Text onClick={() => console.log('Text clicked')} />
	 * ```
	 */
	onClick?: () => void
}

export type TextProps = PropsWithChildren<Props>

export type DesignSystemMapperProps = {
	[key in keyof ITheme['fontSizes']]: {
		weight: keyof ITheme['fontWeights']
	}
}
