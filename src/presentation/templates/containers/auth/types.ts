type Props = {
	/**
	 * The title of auth container
	 *
	 * @example
	 * ```tsx
	 * <AuthContainerTemplate title="Sign in" />
	 * ```
	 */
	title: string

	/**
	 * The description of auth container
	 *
	 * @example
	 * ```tsx
	 * <AuthContainerTemplate description="Sign in to your account" />
	 * ```
	 */
	description: string

	/**
	 * The main content of the form
	 *
	 * @example
	 * ```tsx
	 * <AuthContainerTemplate body={<h1>main content</h1>} />
	 * ```
	 */
	body: React.ReactNode

	/**
	 * The footer of the form
	 *
	 * @example
	 * ```tsx
	 * <AuthContainerTemplate footer={<h1>footer content</h1>} />
	 * ```
	 */
	footer: React.ReactNode

	/**
	 * The max width of the form
	 *
	 * @example
	 * ```tsx
	 * <AuthContainerTemplate maxWidth='100px' />
	 * ```
	 */
	maxWidth: string

	/**
	 * The submit of the button
	 *
	 * @example
	 * ```tsx
	 * <AuthContainerTemplate handleSubmit={() => doSomething()} />
	 * ```
	 */
	handleSubmit: () => Promise<void>
}

export type AuthContainerTemplateProps = Props
