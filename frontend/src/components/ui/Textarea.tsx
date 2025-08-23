import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { Icons } from '../../assets/icons';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  variant?: 'default' | 'filled';
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  characterCount?: boolean;
  maxLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  success,
  helper,
  variant = 'default',
  resize = 'vertical',
  characterCount = false,
  maxLength,
  className = '',
  disabled,
  value,
  ...props
}, ref) => {
  const currentLength = typeof value === 'string' ? value.length : 0;

  const variantClasses = {
    default: 'border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent',
    filled: 'border-0 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white'
  };

  const resizeClasses = {
    none: 'resize-none',
    both: 'resize',
    horizontal: 'resize-x',
    vertical: 'resize-y'
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
      
      <textarea
        ref={ref}
        value={value}
        maxLength={maxLength}
        className={`
          w-full px-4 py-2.5 text-base transition-colors duration-200 outline-none
          ${variantClasses[variant]}
          ${resizeClasses[resize]}
          ${getStateClasses()}
          ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
          ${className}
        `}
        disabled={disabled}
        {...props}
      />
      
      <div className="flex justify-between items-start mt-2">
        <div className="flex-1">
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
        
        {(characterCount && maxLength) && (
          <div className="text-sm text-gray-500 ml-2 flex-shrink-0">
            <span className={currentLength > maxLength * 0.9 ? 'text-yellow-600' : ''}>
              {currentLength}
            </span>
            <span className="text-gray-400">/{maxLength}</span>
          </div>
        )}
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;