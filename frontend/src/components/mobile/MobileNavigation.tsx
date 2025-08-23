import React, { useState } from 'react';
import { Icons } from '../../assets/icons';

interface MobileNavItem {
  id: string;
  label: string;
  icon: keyof typeof Icons;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  active?: boolean;
}

interface MobileNavigationProps {
  items: MobileNavItem[];
  onItemClick?: (item: MobileNavItem) => void;
  position?: 'bottom' | 'top';
  variant?: 'tabs' | 'pills' | 'floating';
  className?: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  items,
  onItemClick,
  position = 'bottom',
  variant = 'tabs',
  className = ''
}) => {
  const [activeItem, setActiveItem] = useState(items.find(item => item.active)?.id || items[0]?.id);

  const handleItemClick = (item: MobileNavItem) => {
    setActiveItem(item.id);
    onItemClick?.(item);
    item.onClick?.();
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'pills':
        return 'bg-gray-100 rounded-full mx-4 mb-4';
      case 'floating':
        return 'bg-white rounded-2xl shadow-lg mx-4 mb-4';
      default:
        return 'bg-white border-t border-gray-200';
    }
  };

  const getItemClasses = (item: MobileNavItem, isActive: boolean) => {
    const baseClasses = 'flex flex-col items-center justify-center space-y-1 py-2 px-3 transition-colors duration-200';
    
    switch (variant) {
      case 'pills':
        return `${baseClasses} rounded-full mx-1 ${
          isActive 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
        }`;
      case 'floating':
        return `${baseClasses} rounded-xl mx-1 ${
          isActive 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        }`;
      default:
        return `${baseClasses} ${
          isActive 
            ? 'text-blue-600' 
            : 'text-gray-500 hover:text-gray-700'
        }`;
    }
  };

  const positionClasses = position === 'top' 
    ? 'top-0 border-b border-gray-200' 
    : 'bottom-0';

  if (variant === 'floating') {
    return (
      <div className={`fixed ${positionClasses} left-0 right-0 z-40 ${className}`}>
        <div className={`${getVariantClasses()} p-2`}>
          <div className="flex justify-around">
            {items.map((item) => {
              const IconComponent = Icons[item.icon];
              const isActive = activeItem === item.id || item.active;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`${getItemClasses(item, isActive)} relative flex-1 max-w-20`}
                >
                  <div className="relative">
                    <IconComponent className="h-5 w-5" />
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed ${positionClasses} left-0 right-0 z-40 ${getVariantClasses()} ${className}`}>
      <div className="flex justify-around">
        {items.map((item) => {
          const IconComponent = Icons[item.icon];
          const isActive = activeItem === item.id || item.active;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`${getItemClasses(item, isActive)} relative flex-1`}
            >
              <div className="relative">
                <IconComponent className="h-6 w-6" />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {typeof item.badge === 'number' && item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && variant === 'tabs' && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Mobile Drawer Component
interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: 'bottom' | 'top' | 'left' | 'right';
  snapPoints?: string[];
  className?: string;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'bottom',
  snapPoints = ['50%', '90%'],
  className = ''
}) => {
  const [currentSnapPoint, setCurrentSnapPoint] = useState(0);

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'top-0 left-0 right-0 rounded-b-2xl';
      case 'left':
        return 'top-0 left-0 bottom-0 w-80 max-w-[80vw] rounded-r-2xl';
      case 'right':
        return 'top-0 right-0 bottom-0 w-80 max-w-[80vw] rounded-l-2xl';
      default:
        return 'bottom-0 left-0 right-0 rounded-t-2xl';
    }
  };

  const getTransformClasses = () => {
    if (!isOpen) {
      switch (position) {
        case 'top':
          return 'transform -translate-y-full';
        case 'left':
          return 'transform -translate-x-full';
        case 'right':
          return 'transform translate-x-full';
        default:
          return 'transform translate-y-full';
      }
    }
    return '';
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`
          fixed bg-white shadow-xl z-50 transition-transform duration-300 ease-out
          ${getPositionClasses()} ${getTransformClasses()} ${className}
        `}
        style={{ 
          height: position === 'bottom' || position === 'top' ? snapPoints[currentSnapPoint] : undefined 
        }}
      >
        {/* Handle (for bottom/top drawers) */}
        {(position === 'bottom' || position === 'top') && (
          <div className="flex justify-center p-2">
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>
        )}

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <Icons.X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
};

// Mobile Action Sheet Component
interface MobileActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  actions: Array<{
    label: string;
    icon?: keyof typeof Icons;
    onClick: () => void;
    variant?: 'default' | 'destructive';
    disabled?: boolean;
  }>;
  className?: string;
}

export const MobileActionSheet: React.FC<MobileActionSheetProps> = ({
  isOpen,
  onClose,
  title,
  actions,
  className = ''
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      
      {/* Action Sheet */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 ${className}`}>
        {/* Handle */}
        <div className="flex justify-center p-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Title */}
        {title && (
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 text-center">{title}</h3>
          </div>
        )}

        {/* Actions */}
        <div className="py-2">
          {actions.map((action, index) => {
            const IconComponent = action.icon ? Icons[action.icon] : null;
            
            return (
              <button
                key={index}
                onClick={() => {
                  action.onClick();
                  onClose();
                }}
                disabled={action.disabled}
                className={`
                  w-full flex items-center px-4 py-4 text-left transition-colors duration-200
                  ${action.variant === 'destructive' 
                    ? 'text-red-600 hover:bg-red-50' 
                    : 'text-gray-900 hover:bg-gray-50'
                  }
                  ${action.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {IconComponent && (
                  <IconComponent className="h-5 w-5 mr-3 flex-shrink-0" />
                )}
                <span className="text-base font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>

        {/* Cancel Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-3 text-center text-base font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;