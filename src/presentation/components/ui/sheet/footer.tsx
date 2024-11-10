import { cn } from '@/shared/utils'

export const Footer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse gap-4 mt-auto sm:flex-row sm:justify-center',
      className
    )}
    {...props}
  />
)

Footer.displayName = 'SheetFooter'
