import { useCallback, useState } from 'react'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/core/utils'

import { Button } from '../button'
import { Calendar } from '../calendar'
import { Popover } from '../popover'

type DatePickerProps = {
  date?: Date
  isError?: boolean
  disabled?: boolean
  label?: string
  className?: string
  onSelect?: (date?: Date) => void
}

export function DatePicker({
  date,
  isError,
  disabled,
  label,
  className,
  onSelect,
}: DatePickerProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (selectedDate?: Date) => {
    onSelect?.(selectedDate)
    setOpen(false)
  }

  const getLabel = useCallback(() => {
    if (date) {
      return format(date, 'PPP', { locale: ptBR })
    }

    if (label) {
      return label
    }

    return null
  }, [date, label])

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal gap-2',
            !date && 'text-muted-foreground',
            isError && 'border-destructive',
            className
          )}
        >
          <CalendarIcon className="size-4" />
          {getLabel()}
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </Popover.Content>
    </Popover.Root>
  )
}

DatePicker.displayName = 'DatePicker'
