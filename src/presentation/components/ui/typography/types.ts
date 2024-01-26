import { PropsWithChildren } from 'react'

import { ITheme } from '@/styles/themes'

type Props = {
	/**
	 * Color of the typography
	 * @example
	 * ```tsx
	 * <Typography color="primary" />
	 * ```
	 * @default 'white'
	 */
	color?: keyof ITheme['colors']

	/**
	 * Weight of the typography
	 * @example
	 * ```tsx
	 * <Typography weight="bold" />
	 * ```
	 * @default 'regular'
	 */
	weight?: keyof ITheme['fontWeights']

	/**
	 * Size of the typography
	 * @example
	 * ```tsx
	 * <Typography size="b2" />
	 * ```
	 * @default 'b1'
	 */
	size?: keyof ITheme['fontSizes']

	/**
	 * Family of the text
	 * @example
	 * ```tsx
	 * <Typography family="secondary" />
	 * ```
	 * @default 'primary'
	 */
	family?: keyof ITheme['fontFamily']

	/**
	 * The class name of the typography
	 * @example
	 * ```tsx
	 * <Typography className="my-class" />
	 * ```
	 */
	className?: string

	/**
	 * The style of the typography
	 * @example
	 * ```tsx
	 * <Typography styles={{ color: 'red' }} />
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

export type TypographyProps = PropsWithChildren<Props>
