import { forwardRef, type HTMLAttributes, type PropsWithChildren } from 'react'

import { LogoIdrJustBrand } from '@/app/assets/imgs'
import { cn, getInitials } from '@/core/utils'

import { Avatar } from '../avatar'

export type HeaderProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  displayName: string
  imageUrl: string
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, displayName, imageUrl, children, ...props }, ref) => (
    <header
      ref={ref}
      className={cn('flex flex-col shadow-200', className)}
      {...props}
    >
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <img
            className="w-auto h-auto max-w-[100px]"
            src={LogoIdrJustBrand}
            alt="Logo representando o IDR-Paraná"
          />
          <h1 className="text-3xl text-slate-600">Sistema IDR</h1>
        </div>

        <div>
          <Avatar.Root>
            <Avatar.Image
              src={imageUrl}
              alt="Imagem de perfil do usuário atual"
            />
            <Avatar.Fallback className="text-primary-500 bg-primary-100">
              {getInitials(displayName)}
            </Avatar.Fallback>
          </Avatar.Root>
        </div>
      </div>

      {children}
    </header>
  )
)

Header.displayName = 'Header'
