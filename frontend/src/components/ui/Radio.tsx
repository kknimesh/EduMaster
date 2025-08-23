import React, { forwardRef, InputHTMLAttributes } from 'react';
import { Icons } from '../../assets/icons';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  options: RadioOption[];
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card';
  direction?: 'horizontal' | 'vertical';
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  label,
  error,
  options,
  size = 'md',
  variant = 'default',
  direction = 'vertical',
  className = '',
  name,
  value,
  onChange,
  ...props
}, ref) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const labelSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const containerClasses = direction === 'horizontal' 
    ? 'flex flex-wrap gap-4' 
    : 'space-y-3';

  const RadioInput = ({ option }: { option: RadioOption }) => (
    <div className="relative flex items-center">
      <input
        type="radio"
        name={name}
        value={option.value}
        checked={value === option.value}
        disabled={option.disabled || props.disabled}
        onChange={onChange}
        className={`
          ${sizeClasses[size]}
          text-blue-600 bg-white border-gray-300 focus:ring-blue-500 focus:ring-2
          disabled:bg-gray-100 disabled:border-gray-300 disabled:cursor-not-allowed
          transition-colors duration-200
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
        `}
        {...props}
      />
      {value === option.value && (
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${sizeClasses[size]}`}>
          <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className={containerClasses}>
        {options.map((option) => {
          if (variant === 'card') {
            return (
              <label
                key={option.value}
                className={`
                  block p-4 border-2 rounded-lg cursor-pointer transition-colors duration-200
                  ${value === option.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}
                  ${option.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                  ${error ? 'border-red-500' : ''}
                  ${direction === 'horizontal' ? 'flex-1' : ''}
                `}
              >
                <div className="flex items-start space-x-3">
                  <RadioInput option={option} />
                  <div className="flex-1">
                    <div className={`font-medium text-gray-900 ${labelSizeClasses[size]}`}>
                      {option.label}
                    </div>
                    {option.description && (
                      <div className="text-sm text-gray-500 mt-1">
                        {option.description}
                      </div>
                    )}
                  </div>
                </div>
              </label>
            );
          }

          return (
            <label
              key={option.value}
              className="flex items-start space-x-3 cursor-pointer"
            >
              <RadioInput option={option} />
              <div className="flex-1">
                <div className={`text-gray-900 ${labelSizeClasses[size]} ${option.disabled ? 'text-gray-500' : ''}`}>
                  {option.label}
                </div>
                {option.description && (
                  <div className={`text-sm text-gray-500 mt-1 ${option.disabled ? 'text-gray-400' : ''}`}>
                    {option.description}
                  </div>
                )}
              </div>
            </label>
          );
        })}
      </div>
      
      {error && (
        <p className="mt-3 text-sm text-red-600 flex items-center">
          <Icons.AlertTriangle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
});

Radio.displayName = 'Radio';

export default Radio;