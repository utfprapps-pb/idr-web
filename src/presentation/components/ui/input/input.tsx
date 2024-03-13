import React from 'react'

import { AlertCircle, XCircle } from 'lucide-react'

import { cn } from '@/main/utils'

import { inputVariants, styles } from './styles'
import { useInput } from './useInput'

import type { InputProps } from './types'

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type,
			iconsStart = [],
			iconsEnd = [],
			isError,
			debounce = 0,
			// eslint-disable-next-line no-empty-function
			debounceCallback = () => {},
			mask,
			...props
		},
		ref
	) => {
		const { paddingLeft, paddingRight, handleOnChange, handleOnClear } =
			useInput({
				iconsStart,
				iconsEnd,
				isError,
				debounce,
				debounceCallback,
				mask,
				...props
			})

		return (
			<div className="flex w-full relative items-center">
				<div className="flex gap-1 absolute pl-2">
					{iconsStart.map(({ key, icon: Icon, onClick }) => (
						<Icon
							className={onClick ? 'cursor-pointer' : 'cursor-default'}
							key={key}
							size={20}
							onClick={onClick}
						/>
					))}
				</div>
				<input
					type={type}
					style={{
						paddingLeft: `${paddingLeft}px`,
						paddingRight: `${paddingRight}px`
					}}
					className={cn(styles, className, inputVariants({ isError }))}
					ref={ref}
					{...props}
					onChange={handleOnChange}
				/>
				<div className="flex gap-1 absolute pr-2 right-0">
					{iconsEnd.map(({ key, icon: Icon, onClick }) => (
						<Icon
							className={onClick ? 'cursor-pointer' : 'cursor-default'}
							key={key}
							size={20}
							onClick={onClick}
						/>
					))}
					{debounce ? (
						<XCircle
							className="cursor-pointer"
							size={20}
							onClick={handleOnClear}
						/>
					) : null}
					{isError ? (
						<AlertCircle className="text-destructive" size={20} />
					) : null}
				</div>
			</div>
		)
	}
)

Input.displayName = 'Input'
export { Input }
