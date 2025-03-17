import { useState } from 'react'

import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/core/utils/tailwind'

import { Button } from '../button'
import { Command } from '../command'
import { Loading } from '../loading'
import { Popover } from '../popover'

import type { Option } from '@/core/domain/types'

export type ComboboxProps = {
  search: string
  handleSearch: (search: string) => void
  items: Option[]
  selected: Option
  handleSelect: (item: Option) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  loading?: boolean
  isError?: boolean
}

export function Combobox({
  search,
  handleSearch,
  items,
  selected,
  handleSelect,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  loading = false,
  isError = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-full justify-between',
            isError && 'border border-red-500',
            !selected && 'text-muted-foreground'
          )}
        >
          {selected?.label
            ? selected.label
            : (placeholder ?? 'Selecione um item')}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
        <Command.Root shouldFilter={false}>
          <Command.Input
            value={search}
            onValueChange={(value) => handleSearch(value)}
            placeholder={searchPlaceholder ?? 'Buscar'}
          />
          <Command.List>
            {!loading && !items.length && (
              <Command.Empty>
                {emptyMessage ?? 'Nenhum registro encontrado'}
              </Command.Empty>
            )}

            {loading ? (
              <Command.Loading>
                <Loading />
              </Command.Loading>
            ) : (
              <Command.Group>
                {items.map((item) => (
                  <Command.Item
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue: string) => {
                      const selectedItem = items.find(
                        (it) => it.value === currentValue
                      ) ?? { label: '', value: '' }

                      handleSelect(selectedItem)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selected.value === item.value
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    {item.label}
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>
        </Command.Root>
      </Popover.Content>
    </Popover.Root>
  )
}

Combobox.displayName = 'Combobox'
