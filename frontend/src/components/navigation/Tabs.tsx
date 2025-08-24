import React from 'react';
import { Icons } from '../../assets/icons/index';

interface Tab {
  id: string;
  label: string;
  icon?: keyof typeof Icons;
  badge?: string | number;
  disabled?: boolean;
  href?: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const getVariantClasses = (isActive: boolean) => {
    switch (variant) {
      case 'pills':
        return isActive
          ? 'bg-blue-100 text-blue-700 rounded-lg'
          : 'text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100';
      case 'underline':
        return isActive
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300';
      default:
        return isActive
          ? 'bg-white text-gray-900 border border-gray-300 rounded-t-lg'
          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border border-transparent rounded-t-lg';
    }
  };

  const containerClass = variant === 'underline' 
    ? 'border-b border-gray-200' 
    : variant === 'default'
    ? 'border-b border-gray-200'
    : '';

  return (
    <div className={`${containerClass} ${className}`}>
      <nav className={`flex ${fullWidth ? '' : 'space-x-1'} ${variant === 'underline' ? 'space-x-8' : ''}`}>
        {tabs.map((tab) => {
          const IconComponent = tab.icon ? Icons[tab.icon] : null;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && onTabChange(tab.id)}
              disabled={tab.disabled}
              className={`
                ${sizeClasses[size]}
                ${getVariantClasses(isActive)}
                ${fullWidth ? 'flex-1' : ''}
                ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                flex items-center justify-center font-medium transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${variant === 'underline' ? 'pb-3' : ''}
              `}
              aria-selected={isActive}
              role="tab"
            >
              {IconComponent && (
                <IconComponent className="h-5 w-5 mr-2 flex-shrink-0" />
              )}
              
              <span className="truncate">{tab.label}</span>
              
              {tab.badge && (
                <span className={`
                  ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0
                  ${isActive 
                    ? 'bg-blue-200 text-blue-800' 
                    : 'bg-gray-200 text-gray-800'
                  }
                `}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Tabs;