import { generateRoutePath } from '@/core/main/routes/generate-route-path'
import { DataTable, Input } from '@/core/presentation/components/ui'
import { useIdrNavigate } from '@/core/presentation/hooks'

import { usePropertyDataTable } from './property-data-table.hook'

import type { PropertyModel } from '../../../domain/models/properties-model'

export function PropertyDataTable() {
  const {
    columns,
    properties,
    isLoading,
    filters,
    page,
    sort,
    setFilters,
    setSort,
    setPage,
  } = usePropertyDataTable()

  const { navigate } = useIdrNavigate()

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={filters.name}
        className="w-fit"
        onChange={({ target }) => {
          setFilters((prevState) => ({
            ...prevState,
            name: target.value,
          }))
        }}
        placeholder="Procurar propriedade"
      />

      <DataTable<PropertyModel>
        columns={columns}
        data={properties.resources}
        totalPages={properties.totalPages}
        onClickRow={(row) =>
          navigate(
            generateRoutePath('PROPERTY', {
              params: {
                propertyId: row.id,
              },
              query: {
                producer: row.producer,
                property: row.name,
              },
            })
          )
        }
        pagination={{
          currentPage: page,
          onPageChange: setPage,
        }}
        sorting={{
          currentSorting: sort,
          onSorting: setSort,
        }}
        loading={isLoading}
      />
    </div>
  )
}

PropertyDataTable.displayName = 'PropertyDataTable'
