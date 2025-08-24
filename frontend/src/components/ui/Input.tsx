import React, { forwardRef, InputHTMLAttributes } from 'react';
import { Icons } from '../../assets/icons/index';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  leftIcon?: keyof typeof Icons;
  rightIcon?: keyof typeof Icons;
  onRightIconClick?: () => void;
  variant?: 'default' | 'filled' | 'underlined';
  inputSize?: 'sm' | 'md' | 'lg';
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  success,
  helper,
  leftIcon,
  rightIcon,
  onRightIconClick,
  variant = 'default',
  inputSize = 'md',
  className = '',
  disabled,
  ...props
}, ref) => {
  const LeftIconComponent = leftIcon ? Icons[leftIcon] : null;
  const RightIconComponent = rightIcon ? Icons[rightIcon] : null;

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-4 py-3 text-lg'
  };

  const variantClasses = {
    default: 'border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent',
    filled: 'border-0 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white',
    underlined: 'border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-blue-500 focus:ring-0'
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
        {LeftIconComponent && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LeftIconComponent className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        <input
          ref={ref}
          className={`
            w-full transition-colors duration-200 outline-none
            ${sizeClasses[inputSize]}
            ${variantClasses[variant]}
            ${getStateClasses()}
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
            ${className}
          `}
          disabled={disabled}
          {...props}
        />
        
        {RightIconComponent && (
          <div 
            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${onRightIconClick ? 'cursor-pointer' : 'pointer-events-none'}`}
            onClick={onRightIconClick}
          >
            <RightIconComponent className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </div>
        )}
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

Input.displayName = 'Input';

export default Input;