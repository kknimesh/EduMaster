import React, { useState, useMemo } from 'react';
import { Icons } from '../../assets/icons';
import Button from './Button';
import Checkbox from './Checkbox';
import Pagination from '../navigation/Pagination';

export interface Column<T> {
  key: string;
  title: string;
  width?: string | number;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
}

export interface TableAction<T> {
  label: string;
  icon?: keyof typeof Icons;
  onClick: (row: T, index: number) => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: (row: T) => boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  selectedRows?: string[];
  onSelectionChange?: (selectedRowIds: string[]) => void;
  getRowId?: (row: T) => string;
  actions?: TableAction<T>[];
  bulkActions?: Array<{
    label: string;
    icon?: keyof typeof Icons;
    onClick: (selectedRows: T[]) => void;
    variant?: 'primary' | 'secondary' | 'danger';
  }>;
  pagination?: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
  };
  sortable?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (column: string, order: 'asc' | 'desc') => void;
  searchable?: boolean;
  searchValue?: string;
  onSearch?: (value: string) => void;
  emptyMessage?: string;
  className?: string;
}

const DataTable = <T,>({
  data,
  columns,
  loading = false,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  getRowId = (row: any) => row.id,
  actions = [],
  bulkActions = [],
  pagination,
  sortable = true,
  sortBy,
  sortOrder,
  onSort,
  searchable = false,
  searchValue = '',
  onSearch,
  emptyMessage = 'No data available',
  className = ''
}: DataTableProps<T>) => {
  const [internalSearchValue, setInternalSearchValue] = useState('');

  const currentSearchValue = searchValue || internalSearchValue;

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!currentSearchValue || !searchable) return data;
    
    return data.filter((row: any) => {
      return columns.some(column => {
        const value = row[column.key];
        if (value == null) return false;
        return String(value).toLowerCase().includes(currentSearchValue.toLowerCase());
      });
    });
  }, [data, currentSearchValue, columns, searchable]);

  const handleSort = (column: Column<T>) => {
    if (!column.sortable || !onSort) return;
    
    const newOrder = sortBy === column.key && sortOrder === 'asc' ? 'desc' : 'asc';
    onSort(column.key, newOrder);
  };

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return;
    
    if (checked) {
      const allIds = filteredData.map(getRowId);
      onSelectionChange(allIds);
    } else {
      onSelectionChange([]);
    }
  };

  const handleRowSelect = (rowId: string, checked: boolean) => {
    if (!onSelectionChange) return;
    
    if (checked) {
      onSelectionChange([...selectedRows, rowId]);
    } else {
      onSelectionChange(selectedRows.filter(id => id !== rowId));
    }
  };

  const isAllSelected = selectedRows.length > 0 && selectedRows.length === filteredData.length;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < filteredData.length;

  const selectedRowData = filteredData.filter(row => selectedRows.includes(getRowId(row)));

  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {searchable && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={currentSearchValue}
                  onChange={(e) => {
                    const value = e.target.value;
                    setInternalSearchValue(value);
                    onSearch?.(value);
                  }}
                  className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* Bulk Actions */}
          {bulkActions.length > 0 && selectedRows.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {selectedRows.length} selected
              </span>
              {bulkActions.map((action, index) => {
                const IconComponent = action.icon ? Icons[action.icon] : null;
                return (
                  <Button
                    key={index}
                    variant={action.variant || 'secondary'}
                    size="sm"
                    onClick={() => action.onClick(selectedRowData)}
                  >
                    {IconComponent && <IconComponent className="h-4 w-4 mr-1" />}
                    {action.label}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  <Checkbox
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
              )}
              
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.align === 'center' ? 'text-center' :
                    column.align === 'right' ? 'text-right' : 'text-left'
                  } ${column.sortable && sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && sortable && handleSort(column)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.title}</span>
                    {column.sortable && sortable && (
                      <div className="flex flex-col">
                        {sortBy === column.key ? (
                          sortOrder === 'asc' ? (
                            <Icons.ChevronUp className="h-4 w-4" />
                          ) : (
                            <Icons.ChevronDown className="h-4 w-4" />
                          )
                        ) : (
                          <Icons.UpDown className="h-4 w-4 opacity-50" />
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}
              
              {actions.length > 0 && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)} className="px-6 py-12">
                  <div className="flex items-center justify-center">
                    <Icons.Loader className="animate-spin h-8 w-8 text-gray-400" />
                    <span className="ml-2 text-gray-500">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)} className="px-6 py-12">
                  <div className="text-center">
                    <Icons.Search className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
                    <p className="mt-1 text-sm text-gray-500">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((row, index) => {
                const rowId = getRowId(row);
                const isSelected = selectedRows.includes(rowId);
                
                return (
                  <tr key={rowId} className={`${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                    {selectable && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Checkbox
                          checked={isSelected}
                          onChange={(e) => handleRowSelect(rowId, e.target.checked)}
                        />
                      </td>
                    )}
                    
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-6 py-4 whitespace-nowrap text-sm ${
                          column.align === 'center' ? 'text-center' :
                          column.align === 'right' ? 'text-right' : 'text-left'
                        }`}
                      >
                        {column.render ? 
                          column.render((row as any)[column.key], row, index) : 
                          (row as any)[column.key]
                        }
                      </td>
                    ))}
                    
                    {actions.length > 0 && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          {actions.map((action, actionIndex) => {
                            const IconComponent = action.icon ? Icons[action.icon] : null;
                            const isDisabled = action.disabled?.(row);
                            
                            return (
                              <Button
                                key={actionIndex}
                                variant={action.variant || 'outline'}
                                size="sm"
                                disabled={isDisabled}
                                onClick={() => action.onClick(row, index)}
                              >
                                {IconComponent && <IconComponent className="h-4 w-4 mr-1" />}
                                {action.label}
                              </Button>
                            );
                          })}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="px-4 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((pagination.currentPage - 1) * pagination.pageSize) + 1} to{' '}
              {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)} of{' '}
              {pagination.totalItems} results
            </div>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={pagination.onPageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;