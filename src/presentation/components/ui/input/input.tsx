import { forwardRef } from 'react'

import { AlertCircle } from 'lucide-react'

import { Loading } from '@/presentation/components/ui/loading'
import { cn } from '@/shared/utils'

import { inputVariants } from './styles'
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
