import { WithDefault } from '@/types'

export type IconProps = {
	/**
	 * The size of the icon
	 *
	 * @example
	 * ```tsx
	 * <Icon size={32} />
	 * ```
	 * @default 32
	 */
	size: WithDefault<number, 32>

	/**
	 * The color of the icon
	 *
	 * @example
	 * ```tsx
	 * <Icon color="#202328" />
	 * ```
	 * @default '#202328'
	 */
	color: WithDefault<string, '#202328'>
}
