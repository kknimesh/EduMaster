import React, { useEffect, useState } from 'react';
import { Icons } from '../../assets/icons';

export interface Toast {
  id: string;
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  persistent?: boolean;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }>;
}

interface ToastProps extends Toast {
  onClose: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const ToastComponent: React.FC<ToastProps> = ({
  id,
  title,
  message,
  type = 'info',
  duration = 5000,
  persistent = false,
  actions = [],
  onClose,
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    if (!persistent && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, persistent]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 150);
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          icon: Icons.CheckCircle,
          iconColor: 'text-green-400',
          bgColor: 'bg-white',
          borderColor: 'border-green-200',
          titleColor: 'text-green-800',
          messageColor: 'text-green-700'
        };
      case 'error':
        return {
          icon: Icons.X,
          iconColor: 'text-red-400',
          bgColor: 'bg-white',
          borderColor: 'border-red-200',
          titleColor: 'text-red-800',
          messageColor: 'text-red-700'
        };
      case 'warning':
        return {
          icon: Icons.AlertTriangle,
          iconColor: 'text-yellow-400',
          bgColor: 'bg-white',
          borderColor: 'border-yellow-200',
          titleColor: 'text-yellow-800',
          messageColor: 'text-yellow-700'
        };
      default:
        return {
          icon: Icons.AlertCircle,
          iconColor: 'text-blue-400',
          bgColor: 'bg-white',
          borderColor: 'border-blue-200',
          titleColor: 'text-blue-800',
          messageColor: 'text-blue-700'
        };
    }
  };

  const { icon: IconComponent, iconColor, bgColor, borderColor, titleColor, messageColor } = getTypeStyles();

  const getPositionClasses = () => {
    const base = `fixed z-50 flex w-full flex-col items-center space-y-4 px-4 pointer-events-none`;
    switch (position) {
      case 'top-left':
        return `${base} top-4 left-4 items-start`;
      case 'top-right':
        return `${base} top-4 right-4 items-end`;
      case 'bottom-left':
        return `${base} bottom-4 left-4 items-start`;
      case 'bottom-right':
        return `${base} bottom-4 right-4 items-end`;
      case 'top-center':
        return `${base} top-4 left-1/2 transform -translate-x-1/2`;
      case 'bottom-center':
        return `${base} bottom-4 left-1/2 transform -translate-x-1/2`;
      default:
        return `${base} top-4 right-4 items-end`;
    }
  };

  const getAnimationClasses = () => {
    if (isExiting) {
      return 'animate-slideOut opacity-0 translate-x-2';
    }
    return isVisible ? 'animate-slideIn opacity-100 translate-x-0' : 'opacity-0 translate-x-2';
  };

  return (
    <div className={`
      max-w-sm w-full ${bgColor} shadow-lg rounded-lg border ${borderColor} pointer-events-auto
      transform transition-all duration-150 ease-in-out
      ${getAnimationClasses()}
    `}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <IconComponent className={`h-6 w-6 ${iconColor}`} />
          </div>
          
          <div className="ml-3 w-0 flex-1">
            {title && (
              <p className={`text-sm font-medium ${titleColor}`}>
                {title}
              </p>
            )}
            <p className={`text-sm ${messageColor} ${title ? 'mt-1' : ''}`}>
              {message}
            </p>
            
            {actions.length > 0 && (
              <div className="mt-3 flex space-x-3">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={`
                      text-sm font-medium rounded-md px-3 py-1.5 transition-colors duration-200
                      ${action.variant === 'primary' 
                        ? `${titleColor} bg-opacity-20 hover:bg-opacity-30` 
                        : `${messageColor} hover:${titleColor}`
                      }
                    `}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={handleClose}
              className={`
                rounded-md inline-flex text-gray-400 hover:text-gray-500 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              `}
            >
              <span className="sr-only">Close</span>
              <Icons.X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toast Container Component
interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  maxToasts?: number;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onClose,
  position = 'top-right',
  maxToasts = 5
}) => {
  const displayToasts = toasts.slice(0, maxToasts);

  const getContainerClasses = () => {
    const base = `fixed z-50 flex flex-col space-y-4 px-4 pointer-events-none`;
    switch (position) {
      case 'top-left':
        return `${base} top-4 left-4`;
      case 'top-right':
        return `${base} top-4 right-4`;
      case 'bottom-left':
        return `${base} bottom-4 left-4`;
      case 'bottom-right':
        return `${base} bottom-4 right-4`;
      case 'top-center':
        return `${base} top-4 left-1/2 transform -translate-x-1/2`;
      case 'bottom-center':
        return `${base} bottom-4 left-1/2 transform -translate-x-1/2`;
      default:
        return `${base} top-4 right-4`;
    }
  };

  if (displayToasts.length === 0) return null;

  return (
    <div className={getContainerClasses()}>
      {displayToasts.map((toast) => (
        <ToastComponent
          key={toast.id}
          {...toast}
          onClose={onClose}
          position={position}
        />
      ))}
    </div>
  );
};

export default ToastComponent;