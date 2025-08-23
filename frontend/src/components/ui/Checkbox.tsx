import React, { forwardRef, InputHTMLAttributes } from 'react';
import { Icons } from '../../assets/icons';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card';
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  description,
  error,
  size = 'md',
  variant = 'default',
  indeterminate = false,
  className = '',
  disabled,
  checked,
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

  React.useEffect(() => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate, ref]);

  const CheckboxInput = () => (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        disabled={disabled}
        className={`
          ${sizeClasses[size]}
          text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2
          disabled:bg-gray-100 disabled:border-gray-300 disabled:cursor-not-allowed
          transition-colors duration-200
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {(checked || indeterminate) && (
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${sizeClasses[size]}`}>
          {indeterminate ? (
            <Icons.Minus className="h-3 w-3 text-white" />
          ) : (
            <Icons.CheckCircle className="h-3 w-3 text-white" />
          )}
        </div>
      )}
    </div>
  );

  if (variant === 'card') {
    return (
      <div className="w-full">
        <label className={`
          block w-full p-4 border-2 rounded-lg cursor-pointer transition-colors duration-200
          ${checked ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          ${error ? 'border-red-500' : ''}
        `}>
          <div className="flex items-start space-x-3">
            <CheckboxInput />
            <div className="flex-1">
              {label && (
                <div className={`font-medium text-gray-900 ${labelSizeClasses[size]}`}>
                  {label}
                </div>
              )}
              {description && (
                <div className="text-sm text-gray-500 mt-1">
                  {description}
                </div>
              )}
            </div>
          </div>
        </label>
        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <Icons.AlertTriangle className="h-4 w-4 mr-1" />
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <label className="flex items-start space-x-3 cursor-pointer">
        <CheckboxInput />
        {(label || description) && (
          <div className="flex-1">
            {label && (
              <div className={`text-gray-900 ${labelSizeClasses[size]} ${disabled ? 'text-gray-500' : ''}`}>
                {label}
              </div>
            )}
            {description && (
              <div className={`text-sm text-gray-500 mt-1 ${disabled ? 'text-gray-400' : ''}`}>
                {description}
              </div>
            )}
          </div>
        )}
      </label>
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <Icons.AlertTriangle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;