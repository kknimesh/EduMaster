import React from 'react';
import { Icons } from '../../assets/icons';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: keyof typeof Icons;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: 'chevron' | 'slash' | 'dot';
  maxItems?: number;
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = 'chevron',
  maxItems,
  className = ''
}) => {
  // Handle collapsed breadcrumbs if maxItems is set
  const displayItems = maxItems && items.length > maxItems
    ? [
        items[0],
        { label: '...', href: undefined, onClick: undefined },
        ...items.slice(-(maxItems - 2))
      ]
    : items;

  const getSeparatorIcon = () => {
    switch (separator) {
      case 'chevron':
        return <Icons.ChevronRight className="h-4 w-4 text-gray-400" />;
      case 'slash':
        return <span className="text-gray-400 mx-2">/</span>;
      case 'dot':
        return <span className="text-gray-400 mx-2">•</span>;
      default:
        return <Icons.ChevronRight className="h-4 w-4 text-gray-400" />;
    }
  };

  const renderBreadcrumbItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    const IconComponent = item.icon ? Icons[item.icon] : null;
    const isClickable = item.href || item.onClick;
    const isCurrent = item.current || isLast;

    const itemContent = (
      <>
        {IconComponent && <IconComponent className="h-4 w-4 mr-1.5 flex-shrink-0" />}
        <span className="truncate">{item.label}</span>
      </>
    );

    if (item.label === '...') {
      return (
        <li key={index} className="flex items-center">
          <button className="text-gray-500 hover:text-gray-700 px-2">
            <Icons.MoreHorizontal className="h-4 w-4" />
          </button>
        </li>
      );
    }

    return (
      <li key={index} className="flex items-center">
        {isClickable && !isCurrent ? (
          <button
            onClick={item.onClick}
            className={`
              flex items-center text-sm font-medium transition-colors duration-200
              ${isCurrent 
                ? 'text-gray-900 cursor-default' 
                : 'text-gray-500 hover:text-gray-700'
              }
            `}
            aria-current={isCurrent ? 'page' : undefined}
          >
            {itemContent}
          </button>
        ) : (
          <span 
            className={`
              flex items-center text-sm font-medium
              ${isCurrent ? 'text-gray-900' : 'text-gray-500'}
            `}
            aria-current={isCurrent ? 'page' : undefined}
          >
            {itemContent}
          </span>
        )}

        {!isLast && (
          <div className="flex items-center mx-2">
            {getSeparatorIcon()}
          </div>
        )}
      </li>
    );
  };

  if (!items.length) {
    return null;
  }

  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-0 min-w-0">
        {displayItems.map((item, index) => 
          renderBreadcrumbItem(item, index, index === displayItems.length - 1)
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;