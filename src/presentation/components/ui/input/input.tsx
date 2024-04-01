import { forwardRef } from 'react'

import { AlertCircle, XCircle } from 'lucide-react'

import { cn } from '@/main/utils'
import { Loading } from '@/presentation/components/ui/loading'

import { inputVariants, styles } from './styles'
import { useInput } from './useInput'

import type { InputProps } from './types'

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type,
			iconsStart = [],
			iconsEnd = [],
			isError,
			loading = false,
			debounce = 0,
			// eslint-disable-next-line no-empty-function
			debounceCallback = () => {},
			mask,
			handleOnClearDebounce,
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
				handleOnClearDebounce,
				...props
			})

		return (
			<div className="flex relative items-center">
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
				<div className="flex items-center gap-1 absolute pr-2 right-0">
					{iconsEnd.map(({ key, icon: Icon, onClick }) => (
						<Icon
							className={onClick ? 'cursor-pointer' : 'cursor-default'}
							key={key}
							size={20}
							onClick={onClick}
						/>
					))}
					{loading ? <Loading /> : null}
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
