import { forwardRef, type InputHTMLAttributes } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import { AlertCircle, type LucideIcon } from 'lucide-react'

import { cn } from '@/core/utils'

import { Loading } from '../loading'

import { useInput } from './input.hook'

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-slate-300 py-2 text-base text-slate-900 bg-white ring-offset-slate-400 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      isError: {
        true: clsx`border-destructive focus-visible:ring-0`,
        false: '',
      },
    },
    defaultVariants: {
      isError: false,
    },
  }
)

export type InputIcon = {
  key: string
  icon: LucideIcon
  onClick?: () => void
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    iconsStart?: InputIcon[]
    iconsEnd?: InputIcon[]
    loading?: boolean
    mask?: (value: string) => string
  }

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      iconsStart = [],
      iconsEnd = [],
      isError,
      loading = false,
      mask,
      ...props
    },
    ref
  ) => {
    const { paddingLeft, paddingRight, handleOnChange } = useInput({
      iconsStart,
      iconsEnd,
      isError,
      mask,
      ...props,
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
            paddingRight: `${paddingRight}px`,
          }}
          className={cn(inputVariants({ isError, className }))}
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
          {loading && <Loading />}
          {isError && <AlertCircle className="text-destructive" size={20} />}
        </div>
      </div>
    )
  }
)

Input.displayName = 'Input'
