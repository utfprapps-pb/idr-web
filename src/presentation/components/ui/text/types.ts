import { PropsWithChildren } from 'react'

import { Theme } from '@/styles'

type Props = {
	/**
	 * Size of the text
	 * @example
	 * ```tsx
	 * <Text size="b1" />
	 * ```
	 */
	size: keyof Theme['fontSizes']

	/**
	 * Color of the text
	 * @example
	 * ```tsx
	 * <Text color="primary" />
	 * ```
	 */
	color?: keyof Theme['colors']

	/**
	 * The family of the font
	 * @example
	 * ```tsx
	 * <Text fontFamily="secondary" />
	 * ```
	 */
	fontFamily?: keyof Theme['fontFamily']

	/**
	 * The class name of the text
	 * @example
	 * ```tsx
	 * <Text className="my-class" />
	 * ```
	 */
	className?: string

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
	[key in keyof Theme['fontSizes']]: {
		weight: keyof Theme['fontWeights']
	}
}
