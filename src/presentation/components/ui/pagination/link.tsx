import {
  ButtonProps,
  buttonVariants,
} from '@/presentation/components/ui/button'
import { cn } from '@/shared/utils'

type LinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>

export const Link: React.FC<LinkProps> = ({
  className,
  isActive,
  size = 'icon',
  children,
  ...props
}) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
      }),
      className
    )}
    {...props}
  >
    {children}
  </a>
)

Link.displayName = 'PaginationLink'
