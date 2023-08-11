import { PropsWithChildren } from 'react'

import { Theme } from '@/styles'

type Props = {
	/**
	 * Color of the typography
	 * @example
	 * ```tsx
	 * <Typography color="primary" />
	 * ```
	 * @default 'white'
	 */
	color?: keyof Theme['colors']

	/**
	 * Weight of the typography
	 * @example
	 * ```tsx
	 * <Typography weight="bold" />
	 * ```
	 * @default 'regular'
	 */
	weight?: keyof Theme['fontWeights']

	/**
	 * Size of the typography
	 * @example
	 * ```tsx
	 * <Typography size="b2" />
	 * ```
	 * @default 'b1'
	 */
	size?: keyof Theme['fontSizes']

	/**
	 * Family of the text
	 * @example
	 * ```tsx
	 * <Typography family="secondary" />
	 * ```
	 * @default 'primary'
	 */
	family?: keyof Theme['fontFamily']

	/**
	 * The class name of the typography
	 * @example
	 * ```tsx
	 * <Typography className="my-class" />
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

export type TypographyProps = PropsWithChildren<Props>
