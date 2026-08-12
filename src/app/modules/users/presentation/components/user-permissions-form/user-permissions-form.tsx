import { useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'

import {
  Badge,
  Button,
  Combobox,
  Form,
  Loading,
  ScrollArea,
  Select,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm, useDebounce } from '@/core/presentation/hooks'
import { useSearchCitiesQuery } from '@/core/presentation/hooks/queries/search-cities-query.hook'
import { useSearchRegionsQuery } from '@/core/presentation/hooks/queries/search-regions-query.hook'

import { makeRemoteUpdateUserPermissionsUseCase } from '../../../main/factories/use-cases'
import { useUserPermissionsQuery } from '../../hooks/queries/user-permissions-query.hook'
import { useUsersContext } from '../../hooks/users-context.hook'
import {
  userPermissionsFormSchema,
  type UserPermissionsFormSchema,
} from '../../validations/user-permissions-form-schema'

import type { UserRole } from '../../../domain/models/users-model'

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'COORDENACAO_GERAL', label: 'Coordenação Geral' },
  { value: 'GERENCIA_MACRO', label: 'Gerência Macro' },
  { value: 'GERENCIA_REGIONAL', label: 'Gerência Regional' },
  { value: 'GERENCIA_MUNICIPAL', label: 'Gerência Municipal' },
  { value: 'TECNICO', label: 'Técnico' },
]

const INITIAL_VALUES: UserPermissionsFormSchema = {
  role: 'TECNICO',
  readOnly: false,
  regionIds: [],
  cityIds: [],
}

export function UserPermissionsForm() {
  const { selectedUser, isOpenPermissionsForm, closePermissionsForm } =
    useUsersContext()

  const { permissions, isLoading } = useUserPermissionsQuery({
    userId: selectedUser ? String(selectedUser.id) : undefined,
  })

  const [citySearch, setCitySearch] = useState('')
  const debouncedCitySearch = useDebounce({ value: citySearch })
  const { cities, isLoading: isLoadingCities } = useSearchCitiesQuery({
    terms: debouncedCitySearch,
  })

  const [regionSearch, setRegionSearch] = useState('')
  const debouncedRegionSearch = useDebounce({ value: regionSearch })
  const { regions, isLoading: isLoadingRegions } = useSearchRegionsQuery({
    terms: debouncedRegionSearch,
  })

  const updateUseCase = makeRemoteUpdateUserPermissionsUseCase()
  const queryClient = useQueryClient()

  const form = useHookForm<UserPermissionsFormSchema>({
    defaultValues: INITIAL_VALUES,
    values: permissions
      ? {
          role: permissions.role,
          readOnly: permissions.readOnly,
          regionIds: permissions.regionIds,
          cityIds: permissions.cityIds,
        }
      : undefined,
    resolver: zodResolver(userPermissionsFormSchema),
  })

  const { mutateAsync: mutateUpdate } = useMutation({
    mutationFn: updateUseCase.execute,
  })

  const handleSubmit = useCallback(
    async (data: UserPermissionsFormSchema) => {
      if (!selectedUser) return
      try {
        await mutateUpdate({
          userId: String(selectedUser.id),
          name: selectedUser.name,
          username: selectedUser.username,
          ...data,
        })
        queryClient.invalidateQueries({
          queryKey: ['admin', 'users'],
          exact: false,
        })
        toast.success('Permissões atualizadas com sucesso')
        closePermissionsForm()
      } catch {
        toast.error('Erro ao atualizar permissões')
      }
    },
    [closePermissionsForm, mutateUpdate, queryClient, selectedUser]
  )

  return (
    <Sheet.Root
      open={isOpenPermissionsForm}
      onOpenChange={closePermissionsForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Editar Permissões</Sheet.Title>
          <Sheet.Description>
            {selectedUser?.name ?? 'Usuário'}
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="user-permissions-form"
              className="flex flex-col px-2 gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <Loading size="lg" />
                </div>
              ) : (
                <>
                  <Form.Field
                    name="role"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Form.Item>
                        <Form.Label>Perfil de Acesso*</Form.Label>
                        <Select.Root
                          onValueChange={field.onChange}
                          value={field.value}
                          name={field.name}
                        >
                          <Form.Control>
                            <Select.Trigger isError={!!fieldState.error}>
                              <Select.Value placeholder="Selecione o perfil">
                                {
                                  ROLE_OPTIONS.find(
                                    (o) => o.value === field.value
                                  )?.label
                                }
                              </Select.Value>
                            </Select.Trigger>
                          </Form.Control>
                          <Select.Content>
                            {ROLE_OPTIONS.map((opt) => (
                              <Select.Item key={opt.value} value={opt.value}>
                                {opt.label}
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Root>
                        <Form.Message />
                      </Form.Item>
                    )}
                  />

                  <Form.Field
                    name="readOnly"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Form.Item>
                        <Form.Label>Somente leitura</Form.Label>
                        <Select.Root
                          onValueChange={(v) => field.onChange(v === 'true')}
                          value={String(field.value)}
                          name={field.name}
                        >
                          <Form.Control>
                            <Select.Trigger isError={!!fieldState.error}>
                              <Select.Value>
                                {field.value ? 'Sim' : 'Não'}
                              </Select.Value>
                            </Select.Trigger>
                          </Form.Control>
                          <Select.Content>
                            <Select.Item value="false">Não</Select.Item>
                            <Select.Item value="true">Sim</Select.Item>
                          </Select.Content>
                        </Select.Root>
                        <Form.Message />
                      </Form.Item>
                    )}
                  />

                  <Form.Field
                    name="regionIds"
                    control={form.control}
                    render={({ field, fieldState }) => {
                      const selectedIds = field.value as string[]
                      const availableRegions = regions.filter(
                        (r) => !selectedIds.includes(String(r.value))
                      )

                      return (
                        <Form.Item>
                          <Form.Label>Regiões</Form.Label>
                          <Form.Control>
                            <Combobox
                              search={regionSearch}
                              handleSearch={setRegionSearch}
                              items={availableRegions}
                              selected={undefined}
                              loading={isLoadingRegions}
                              isError={!!fieldState.error}
                              placeholder="Adicionar região..."
                              searchPlaceholder="Buscar região"
                              handleSelect={(item) => {
                                field.onChange([
                                  ...selectedIds,
                                  String(item.value),
                                ])
                                setRegionSearch('')
                              }}
                            />
                          </Form.Control>
                          {selectedIds.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedIds.map((id) => {
                                const region = regions.find(
                                  (r) => String(r.value) === id
                                )
                                return (
                                  <Badge
                                    key={id}
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                  >
                                    {region?.label ?? id}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        field.onChange(
                                          selectedIds.filter((v) => v !== id)
                                        )
                                      }
                                      className="ml-1 hover:text-destructive"
                                    >
                                      <X className="size-3" />
                                    </button>
                                  </Badge>
                                )
                              })}
                            </div>
                          )}
                          <Form.Message />
                        </Form.Item>
                      )
                    }}
                  />

                  <Form.Field
                    name="cityIds"
                    control={form.control}
                    render={({ field, fieldState }) => {
                      const selectedIds = field.value as string[]
                      const availableCities = cities.filter(
                        (c) => !selectedIds.includes(String(c.value))
                      )

                      return (
                        <Form.Item>
                          <Form.Label>Municípios</Form.Label>
                          <Form.Control>
                            <Combobox
                              search={citySearch}
                              handleSearch={setCitySearch}
                              items={availableCities}
                              selected={undefined}
                              loading={isLoadingCities}
                              isError={!!fieldState.error}
                              placeholder="Adicionar município..."
                              searchPlaceholder="Buscar município"
                              handleSelect={(item) => {
                                field.onChange([
                                  ...selectedIds,
                                  String(item.value),
                                ])
                                setCitySearch('')
                              }}
                            />
                          </Form.Control>
                          {selectedIds.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedIds.map((id) => {
                                const city = cities.find(
                                  (c) => String(c.value) === id
                                )
                                return (
                                  <Badge
                                    key={id}
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                  >
                                    {city?.label ?? id}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        field.onChange(
                                          selectedIds.filter((v) => v !== id)
                                        )
                                      }
                                      className="ml-1 hover:text-destructive"
                                    >
                                      <X className="size-3" />
                                    </button>
                                  </Badge>
                                )
                              })}
                            </div>
                          )}
                          <Form.Message />
                        </Form.Item>
                      )
                    }}
                  />
                </>
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="user-permissions-form"
            type="submit"
            className="w-full"
            disabled={form.buttonDisabled}
          >
            Salvar
          </Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  )
}

UserPermissionsForm.displayName = 'UserPermissionsForm'
