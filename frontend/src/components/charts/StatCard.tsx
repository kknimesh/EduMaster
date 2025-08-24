import React from 'react';
import { Icons } from '../../assets/icons/index';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  icon?: keyof typeof Icons;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  color = 'blue',
  className = '',
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  const IconComponent = icon ? Icons[icon] : Icons.InformationCircle;

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 truncate">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          
          {change && (
            <div className="flex items-center mt-2">
              <div
                className={`flex items-center text-sm font-medium ${
                  change.type === 'increase' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}
              >
                {change.type === 'increase' ? (
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {Math.abs(change.value)}%
              </div>
              <span className="text-gray-500 text-sm ml-2">from {change.period}</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <IconComponent />
        </div>
      </div>
    </div>
  );
};

// Simple Chart Component
interface SimpleChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  type: 'bar' | 'line';
  className?: string;
}

export const SimpleChart: React.FC<SimpleChartProps> = ({
  data,
  type,
  className = '',
}) => {
  const maxValue = Math.max(...data.map(d => d.value));

  if (type === 'bar') {
    return (
      <div className={`space-y-3 ${className}`}>
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-16 text-sm text-gray-600 truncate">{item.label}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
              <div
                className={`h-full rounded-full ${item.color || 'bg-blue-500'} transition-all duration-300`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
            <div className="w-12 text-sm font-medium text-gray-900 text-right">{item.value}</div>
          </div>
        ))}
      </div>
    );
  }

  // Simple line chart representation
  return (
    <div className={`h-32 flex items-end space-x-2 ${className}`}>
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div
            className={`w-full ${item.color || 'bg-blue-500'} rounded-t transition-all duration-300`}
            style={{ height: `${(item.value / maxValue) * 100}%` }}
          />
          <div className="text-xs text-gray-600 mt-1 truncate w-full text-center">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCard;