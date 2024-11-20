import { useCallback, useMemo } from 'react'

import {
  type OnChangeFn,
  type PaginationState,
  type RowData,
  type RowModel,
  type SortingState,
  type Updater,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react'

import { ITEMS_PER_PAGE } from '@/infra/http'

import { Loading } from '../loading'
import { Pagination } from '../pagination'
import { Table } from '../table'
import { Tooltip } from '../tooltip'

import { DataTableProps } from './types'

const TableBody = <TData extends RowData>({
  columns,
  loading,
  rowModel,
  onClickRow,
}: Pick<DataTableProps<TData>, 'loading' | 'columns' | 'onClickRow'> & {
  rowModel: RowModel<TData>
}) => {
  if (loading) {
    return (
      <Table.Row>
        <Table.Cell colSpan={columns.length}>
          <Loading className="flex justify-center" size="lg" />
        </Table.Cell>
      </Table.Row>
    )
  }

  if (!rowModel.rows.length) {
    return (
      <Table.Row>
        <Table.Cell colSpan={columns.length} className="h-24 text-center">
          No results.
        </Table.Cell>
      </Table.Row>
    )
  }

  const handleOnClickRow = (event: React.MouseEvent, row: TData) => {
    event.stopPropagation()
    onClickRow?.(row)
  }

  return rowModel.rows.map((row) => (
    <Table.Row
      key={row.id}
      data-state={row.getIsSelected() && 'selected'}
      className={onClickRow ? 'cursor-pointer' : ''}
      onClick={(event) => handleOnClickRow(event, row.original)}
    >
      {row.getVisibleCells().map((cell) => (
        <Table.Cell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </Table.Cell>
      ))}
    </Table.Row>
  ))
}

export const DataTable = <TData extends RowData>({
  columns,
  data,
  sorting,
  pagination,
  totalPages,
  loading = false,
  onClickRow,
}: DataTableProps<TData>) => {
  const { currentSorting, onSorting } = sorting
  const { currentPage, onPageChange } = pagination

  const onSortingChange: OnChangeFn<SortingState> = useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      const [sort] =
        typeof updaterOrValue === 'function'
          ? updaterOrValue([
              {
                desc: currentSorting?.direction === 'desc',
                id: String(currentSorting?.field),
              },
            ])
          : updaterOrValue

      if (!sort) {
        onSorting(null)
        return
      }

      onSorting({
        direction: sort.desc ? 'desc' : 'asc',
        field: sort.id as keyof TData,
      })
    },
    [currentSorting?.direction, currentSorting?.field, onSorting]
  )

  const onPaginationChange: OnChangeFn<PaginationState> = useCallback(
    (updaterOrValue: Updater<PaginationState>) => {
      const page =
        typeof updaterOrValue === 'function'
          ? updaterOrValue({
              pageIndex: currentPage - 1,
              pageSize: ITEMS_PER_PAGE,
            }).pageIndex
          : updaterOrValue.pageIndex

      onPageChange(page + 1)
    },
    [currentPage, onPageChange]
  )

  const {
    getState,
    getRowModel,
    getHeaderGroups,
    previousPage,
    nextPage,
    setPageIndex,
    getCanPreviousPage,
    getCanNextPage,
  } = useReactTable<TData>({
    columns,
    data,
    state: {
      sorting: [
        {
          id: String(currentSorting?.field),
          desc: currentSorting?.direction === 'desc',
        },
      ],
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: ITEMS_PER_PAGE,
      },
    },
    manualSorting: true,
    manualPagination: true,
    pageCount: totalPages,
    onSortingChange,
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const tooltipText = (value: 'asc' | 'desc' | false) => {
    if (value === 'asc') return 'Ordenar de forma de crescente'
    if (value === 'desc') return 'Ordenar de forma decrescente'

    return 'Limpar ordenação'
  }

  const page = getState().pagination.pageIndex + 1
  const showFinalEllipsis = useMemo(() => page + 2 > 3, [page])
  const isAfterFirstPage = useMemo(() => page > 1, [page])
  const isBeforeLastPage = useMemo(
    () => page + 1 < totalPages,
    [page, totalPages]
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border">
        <Table.Root>
          <Table.Header>
            {getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Head
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className={
                      header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : ''
                    }
                  >
                    {header.isPlaceholder ? null : (
                      <Tooltip.Provider>
                        <Tooltip.Root>
                          <Tooltip.Trigger>
                            <div className="inline-flex items-center gap-2">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: <ArrowDownNarrowWide size={20} />,
                                desc: <ArrowUpNarrowWide size={20} />,
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          </Tooltip.Trigger>
                          <Tooltip.Content>
                            <p>
                              {tooltipText(header.column.getNextSortingOrder())}
                            </p>
                          </Tooltip.Content>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                    )}
                  </Table.Head>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            <TableBody
              columns={columns}
              rowModel={getRowModel()}
              loading={loading}
              onClickRow={onClickRow}
            />
          </Table.Body>
        </Table.Root>
      </div>
      <Pagination.Root>
        <Pagination.Content>
          <Pagination.Item
            isDisabled={!getCanPreviousPage()}
            onClick={previousPage}
          >
            <Pagination.Previous />
          </Pagination.Item>

          {isAfterFirstPage && (
            <>
              <Pagination.Item onClick={() => setPageIndex(0)}>
                <Pagination.Link>1</Pagination.Link>
              </Pagination.Item>

              <Pagination.Item>
                <Pagination.Ellipsis />
              </Pagination.Item>
            </>
          )}

          <Pagination.Item>
            <Pagination.Link isActive>{page}</Pagination.Link>
          </Pagination.Item>

          {page === 1 && isBeforeLastPage && (
            <Pagination.Item>
              <Pagination.Ellipsis />
            </Pagination.Item>
          )}

          {isBeforeLastPage && (
            <>
              {showFinalEllipsis && (
                <Pagination.Item>
                  <Pagination.Ellipsis />
                </Pagination.Item>
              )}

              <Pagination.Item
                onClick={() => setPageIndex(totalPages - 1)}
                isDisabled={!getCanNextPage()}
              >
                <Pagination.Link>{totalPages}</Pagination.Link>
              </Pagination.Item>
            </>
          )}

          <Pagination.Item isDisabled={!getCanNextPage()} onClick={nextPage}>
            <Pagination.Next />
          </Pagination.Item>
        </Pagination.Content>
      </Pagination.Root>
    </div>
  )
}
