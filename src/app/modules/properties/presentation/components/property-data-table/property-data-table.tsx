import { generateRoutePath } from '@/core/main/routes/generate-route-path'
import { DataTable, Input } from '@/core/presentation/components/ui'
import { useIdrNavigate } from '@/core/presentation/hooks'

import { usePropertyDataTable } from './property-data-table.hook'

import type { PropertyModel } from '../../../domain/models/properties-model'

export function PropertyDataTable() {
  const { columns, properties, isLoading, filters, page, setFilters, setPage } =
    usePropertyDataTable()

  const { navigate } = useIdrNavigate()

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={filters.terms ?? ''}
        className="w-fit"
        onChange={({ target }) => {
          setFilters({ terms: target.value })
        }}
        placeholder="Procurar por propriedade"
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
                property: row.name,
              },
            })
          )
        }
        pagination={{
          currentPage: page,
          onPageChange: setPage,
        }}
        loading={isLoading}
      />
    </div>
  )
}

PropertyDataTable.displayName = 'PropertyDataTable'
