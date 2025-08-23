import React, { useState } from 'react';
import { Icons } from '../../assets/icons';

interface SidebarItem {
  id: string;
  label: string;
  icon: keyof typeof Icons;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  children?: SidebarItem[];
  disabled?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  activeItem?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onItemClick?: (item: SidebarItem) => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeItem,
  collapsed = false,
  onToggleCollapse,
  onItemClick,
  className = ''
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (item: SidebarItem) => {
    if (item.children && item.children.length > 0) {
      toggleExpanded(item.id);
    } else {
      onItemClick?.(item);
      item.onClick?.();
    }
  };

  const renderSidebarItem = (item: SidebarItem, level: number = 0) => {
    const IconComponent = Icons[item.icon];
    const isActive = activeItem === item.id;
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id}>
        <button
          onClick={() => handleItemClick(item)}
          disabled={item.disabled}
          className={`
            w-full flex items-center text-left transition-colors duration-200
            ${collapsed ? 'px-3 py-3 justify-center' : `px-4 py-2.5 ${level > 0 ? 'pl-8' : ''}`}
            ${isActive 
              ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600' 
              : 'text-gray-700 hover:bg-gray-100'
            }
            ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-900'}
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset
          `}
        >
          <IconComponent className={`${collapsed ? 'h-6 w-6' : 'h-5 w-5'} flex-shrink-0`} />
          
          {!collapsed && (
            <>
              <span className="ml-3 flex-1 text-sm font-medium">{item.label}</span>
              
              {item.badge && (
                <span className={`
                  ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                  ${typeof item.badge === 'number' && item.badge > 0
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                  }
                `}>
                  {item.badge}
                </span>
              )}
              
              {hasChildren && (
                <Icons.ChevronDown 
                  className={`ml-2 h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                />
              )}
            </>
          )}
        </button>

        {/* Render children */}
        {hasChildren && !collapsed && isExpanded && (
          <div className="bg-gray-50">
            {item.children?.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-white border-r border-gray-200 ${collapsed ? 'w-16' : 'w-64'} ${className}`}>
      {/* Toggle Button */}
      {onToggleCollapse && (
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Icons.Menu className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {items.map(item => renderSidebarItem(item))}
      </nav>

      {/* Collapse Indicator */}
      {collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-center">
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;