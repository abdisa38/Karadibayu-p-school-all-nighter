import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  X,
  Database,
} from 'lucide-react';
import { Skeleton } from '../common/Skeleton.js';
import { EmptyState } from '../common/EmptyState.js';

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchField?: keyof T;
  emptyTitle?: string;
  emptyDescription?: string;
  pageSizeOptions?: number[];
  initialPageSize?: number;
  className?: string;
  headerAction?: React.ReactNode;
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  isLoading = false,
  searchable = true,
  searchPlaceholder = 'Search records...',
  searchField,
  emptyTitle = 'No Records Found',
  emptyDescription = 'There are currently no records available in this institutional register.',
  pageSizeOptions = [10, 25, 50],
  initialPageSize = 10,
  className = '',
  headerAction,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Filter Data
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    return data.filter((item) => {
      if (searchField) {
        const val = item[searchField];
        return String(val ?? '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }

      // Search across all string/number fields
      return Object.values(item).some((val) =>
        String(val ?? '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    });
  }, [data, searchTerm, searchField]);

  // Sort Data
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    const col = columns.find((c) => c.id === sortColumn);
    if (!col) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = col.accessorKey ? a[col.accessorKey] : '';
      const bVal = col.accessorKey ? b[col.accessorKey] : '';

      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const comparison = String(aVal).localeCompare(String(bVal), undefined, {
        numeric: true,
        sensitivity: 'base',
      });

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortColumn, sortDirection, columns]);

  // Paginate Data
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, pageIndex, pageSize]);

  const handleSort = (columnId: string, sortable?: boolean) => {
    if (!sortable) return;

    if (sortColumn === columnId) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortColumn(null);
      }
    } else {
      setSortColumn(columnId);
      setSortDirection('asc');
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setPageIndex(0);
  };

  return (
    <div className={`flex flex-col bg-white rounded-lg border border-surface-200 shadow-subtle overflow-hidden ${className}`}>
      {/* Top Table Toolbar */}
      {(searchable || headerAction) && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 border-b border-surface-200 bg-surface-50/50">
          {searchable ? (
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPageIndex(0);
                }}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm rounded-md border border-surface-300 bg-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-700"
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : <div />}

          {headerAction && <div className="flex items-center gap-2">{headerAction}</div>}
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto min-h-[240px]">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-surface-200 bg-surface-50 text-[11px] uppercase tracking-wider text-surface-600 font-semibold select-none">
              {columns.map((column) => {
                const isSorted = sortColumn === column.id;
                return (
                  <th
                    key={column.id}
                    scope="col"
                    style={{ width: column.width }}
                    onClick={() => handleSort(column.id, column.sortable)}
                    className={`px-4 py-3 ${
                      column.align === 'center'
                        ? 'text-center'
                        : column.align === 'right'
                        ? 'text-right'
                        : 'text-left'
                    } ${
                      column.sortable
                        ? 'cursor-pointer hover:bg-surface-100/80 transition-colors'
                        : ''
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-1.5 ${
                        column.align === 'right' ? 'justify-end w-full' : ''
                      }`}
                    >
                      <span>{column.header}</span>
                      {column.sortable && (
                        <span className="text-surface-400">
                          {isSorted ? (
                            sortDirection === 'asc' ? (
                              <ArrowUp className="w-3.5 h-3.5 text-brand-900" />
                            ) : (
                              <ArrowDown className="w-3.5 h-3.5 text-brand-900" />
                            )
                          ) : (
                            <ArrowUpDown className="w-3 h-3" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-200/80 text-surface-700 font-normal">
            {isLoading ? (
              // Loading Skeleton Rows
              Array.from({ length: pageSize > 5 ? 5 : pageSize }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="animate-pulse">
                  {columns.map((col) => (
                    <td key={col.id} className="px-4 py-3.5">
                      <Skeleton className="h-4 w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12">
                  <EmptyState
                    title={emptyTitle}
                    description={emptyDescription}
                    icon={Database}
                  />
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={`row-${rowIndex}`}
                  className="hover:bg-surface-50/70 transition-colors duration-100"
                >
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className={`px-4 py-3 text-xs sm:text-sm ${
                        column.align === 'center'
                          ? 'text-center'
                          : column.align === 'right'
                          ? 'text-right'
                          : 'text-left'
                      }`}
                    >
                      {column.cell
                        ? column.cell(row)
                        : column.accessorKey
                        ? String(row[column.accessorKey] ?? '-')
                        : '-'}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {!isLoading && sortedData.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-surface-200 bg-surface-50/50 text-xs text-surface-600">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPageIndex(0);
              }}
              className="rounded border border-surface-300 bg-white px-2 py-1 text-xs text-surface-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="hidden sm:inline text-surface-400">|</span>
            <span className="text-surface-600">
              Showing{' '}
              <span className="font-semibold text-surface-800">
                {pageIndex * pageSize + 1}
              </span>{' '}
              to{' '}
              <span className="font-semibold text-surface-800">
                {Math.min((pageIndex + 1) * pageSize, sortedData.length)}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-surface-800">{sortedData.length}</span>{' '}
              entries
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setPageIndex(0)}
              disabled={pageIndex === 0}
              className="p-1 rounded border border-surface-300 bg-white text-surface-600 hover:bg-surface-100 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="First page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              disabled={pageIndex === 0}
              className="p-1 rounded border border-surface-300 bg-white text-surface-600 hover:bg-surface-100 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-2 font-medium text-surface-700">
              Page {pageIndex + 1} of {totalPages}
            </span>

            <button
              onClick={() => setPageIndex((prev) => Math.min(prev + 1, totalPages - 1))}
              disabled={pageIndex >= totalPages - 1}
              className="p-1 rounded border border-surface-300 bg-white text-surface-600 hover:bg-surface-100 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPageIndex(totalPages - 1)}
              disabled={pageIndex >= totalPages - 1}
              className="p-1 rounded border border-surface-300 bg-white text-surface-600 hover:bg-surface-100 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Last page"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
