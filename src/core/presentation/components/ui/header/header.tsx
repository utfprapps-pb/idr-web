import { forwardRef, type HTMLAttributes } from 'react'

import { LogoIdrJustBrand } from '@/app/assets/imgs'
import { cn, getInitials } from '@/core/utils'

import { Avatar } from '../avatar'

export type HeaderProps = HTMLAttributes<HTMLDivElement> & {
  displayName: string
  imageUrl: string
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, displayName, imageUrl, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        'flex items-center justify-between p-5 shadow-200',
        className
      )}
      {...props}
    >
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
    </header>
  )
)

Header.displayName = 'Header'
