import { HTMLAttributes } from 'react'

interface IProps extends HTMLAttributes<HTMLImageElement> {
	/**
	 * The source of the avatar image
	 * @example
	 * ```tsx
	 * <Avatar src="https://example.com/avatar.png" />
	 * ```
	 */
	src: string

	/**
	 * The alt text of the avatar image
	 * @example
	 * ```tsx
	 * <Avatar alt="Avatar" />
	 * ```
	 */
	alt: string

	/**
	 * The size of the avatar
	 * @example
	 * ```tsx
	 * <Avatar size={50} />
	 * ```
	 * @default 50
	 */
	size?: number

	/**
	 * The type of the avatar
	 * @example
	 * ```tsx
	 * <Avatar type="circle" />
	 * ```
	 * @default 'circle'
	 */
	type?: 'circle' | 'square'
}

export type AvatarProps = IProps
