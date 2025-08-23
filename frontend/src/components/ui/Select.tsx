import React, { forwardRef, SelectHTMLAttributes } from 'react';
import { Icons } from '../../assets/icons';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  options: Option[];
  placeholder?: string;
  variant?: 'default' | 'filled';
  selectSize?: 'sm' | 'md' | 'lg';
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  success,
  helper,
  options,
  placeholder,
  variant = 'default',
  selectSize = 'md',
  className = '',
  disabled,
  ...props
}, ref) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-4 py-3 text-lg'
  };

  const variantClasses = {
    default: 'border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent',
    filled: 'border-0 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white'
  };

  const getStateClasses = () => {
    if (error) return 'border-red-500 focus:ring-red-500 focus:border-red-500';
    if (success) return 'border-green-500 focus:ring-green-500 focus:border-green-500';
    return '';
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full appearance-none transition-colors duration-200 outline-none cursor-pointer
            ${sizeClasses[selectSize]}
            ${variantClasses[variant]}
            ${getStateClasses()}
            ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
            ${className}
          `}
          disabled={disabled}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <Icons.ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      {(error || success || helper) && (
        <div className="mt-2">
          {error && (
            <p className="text-sm text-red-600 flex items-center">
              <Icons.AlertTriangle className="h-4 w-4 mr-1" />
              {error}
            </p>
          )}
          {success && !error && (
            <p className="text-sm text-green-600 flex items-center">
              <Icons.CheckCircle className="h-4 w-4 mr-1" />
              {success}
            </p>
          )}
          {helper && !error && !success && (
            <p className="text-sm text-gray-500">{helper}</p>
          )}
        </div>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;