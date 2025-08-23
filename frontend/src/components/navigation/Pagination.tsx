import React from 'react';
import { Icons } from '../../assets/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 7,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2.5 text-base'
  };

  const iconSizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  // Calculate visible page numbers
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages = [];
    
    // Add first page and ellipsis if needed
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }

    // Add visible pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  const PageButton: React.FC<{
    page: number | string;
    isActive?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
  }> = ({ page, isActive = false, disabled = false, onClick, children }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        ${isActive 
          ? 'bg-blue-600 text-white border-blue-600 z-10' 
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        border font-medium transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      `}
      aria-label={typeof page === 'number' ? `Go to page ${page}` : undefined}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </button>
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center justify-center ${className}`} aria-label="Pagination">
      <div className="flex -space-x-px rounded-md shadow-sm">
        {/* First Page */}
        {showFirstLast && (
          <PageButton
            page={1}
            disabled={currentPage === 1}
            onClick={() => handlePageClick(1)}
          >
            <span className="sr-only">First page</span>
            <Icons.ChevronLeft className={`${iconSizeClasses[size]} mr-1`} />
            <Icons.ChevronLeft className={`${iconSizeClasses[size]} -ml-2`} />
          </PageButton>
        )}

        {/* Previous Page */}
        {showPrevNext && (
          <PageButton
            page={currentPage - 1}
            disabled={currentPage === 1}
            onClick={() => handlePageClick(currentPage - 1)}
          >
            <span className="sr-only">Previous page</span>
            <Icons.ChevronLeft className={iconSizeClasses[size]} />
          </PageButton>
        )}

        {/* Page Numbers */}
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={`
                  ${sizeClasses[size]}
                  bg-white text-gray-700 border-gray-300 border
                  flex items-center justify-center
                `}
              >
                ...
              </span>
            );
          }

          return (
            <PageButton
              key={page}
              page={page}
              isActive={page === currentPage}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </PageButton>
          );
        })}

        {/* Next Page */}
        {showPrevNext && (
          <PageButton
            page={currentPage + 1}
            disabled={currentPage === totalPages}
            onClick={() => handlePageClick(currentPage + 1)}
          >
            <span className="sr-only">Next page</span>
            <Icons.ChevronRight className={iconSizeClasses[size]} />
          </PageButton>
        )}

        {/* Last Page */}
        {showFirstLast && (
          <PageButton
            page={totalPages}
            disabled={currentPage === totalPages}
            onClick={() => handlePageClick(totalPages)}
          >
            <span className="sr-only">Last page</span>
            <Icons.ChevronRight className={`${iconSizeClasses[size]} mr-1`} />
            <Icons.ChevronRight className={`${iconSizeClasses[size]} -ml-2`} />
          </PageButton>
        )}
      </div>

      {/* Page Info */}
      <div className="ml-4 text-sm text-gray-700">
        Showing page {currentPage} of {totalPages}
      </div>
    </nav>
  );
};

export default Pagination;