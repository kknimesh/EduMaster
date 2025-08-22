import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

const EduMasterLogo: React.FC<LogoProps> = ({ size = 'md', variant = 'full', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-20',
  };

  if (variant === 'icon') {
    return (
      <svg
        className={`${sizeClasses[size]} ${className}`}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Book Icon with Graduation Cap */}
        <rect x="8" y="20" width="48" height="36" rx="4" fill="#3B82F6" />
        <rect x="12" y="24" width="40" height="28" rx="2" fill="#DBEAFE" />
        
        {/* Book Pages */}
        <line x1="16" y1="30" x2="52" y2="30" stroke="#3B82F6" strokeWidth="2" />
        <line x1="16" y1="36" x2="46" y2="36" stroke="#3B82F6" strokeWidth="1" />
        <line x1="16" y1="40" x2="48" y2="40" stroke="#3B82F6" strokeWidth="1" />
        <line x1="16" y1="44" x2="44" y2="44" stroke="#3B82F6" strokeWidth="1" />
        
        {/* Graduation Cap */}
        <path
          d="M32 8L16 16L32 24L48 16L32 8Z"
          fill="#1D4ED8"
        />
        <path
          d="M48 16V28C48 30.2091 41.732 32 32 32C22.268 32 16 30.2091 16 28V16"
          stroke="#1D4ED8"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Tassel */}
        <circle cx="46" cy="18" r="2" fill="#EF4444" />
        <line x1="48" y1="18" x2="52" y2="22" stroke="#EF4444" strokeWidth="2" />
      </svg>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`font-bold text-blue-600 ${className}`}>
        <span className="text-2xl">Edu</span>
        <span className="text-2xl text-blue-800">Master</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <svg
        className={sizeClasses[size]}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Book Icon with Graduation Cap */}
        <rect x="8" y="20" width="48" height="36" rx="4" fill="#3B82F6" />
        <rect x="12" y="24" width="40" height="28" rx="2" fill="#DBEAFE" />
        
        {/* Book Pages */}
        <line x1="16" y1="30" x2="52" y2="30" stroke="#3B82F6" strokeWidth="2" />
        <line x1="16" y1="36" x2="46" y2="36" stroke="#3B82F6" strokeWidth="1" />
        <line x1="16" y1="40" x2="48" y2="40" stroke="#3B82F6" strokeWidth="1" />
        <line x1="16" y1="44" x2="44" y2="44" stroke="#3B82F6" strokeWidth="1" />
        
        {/* Graduation Cap */}
        <path
          d="M32 8L16 16L32 24L48 16L32 8Z"
          fill="#1D4ED8"
        />
        <path
          d="M48 16V28C48 30.2091 41.732 32 32 32C22.268 32 16 30.2091 16 28V16"
          stroke="#1D4ED8"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Tassel */}
        <circle cx="46" cy="18" r="2" fill="#EF4444" />
        <line x1="48" y1="18" x2="52" y2="22" stroke="#EF4444" strokeWidth="2" />
      </svg>
      
      <div className="font-bold text-blue-600">
        <span className="text-xl">Edu</span>
        <span className="text-xl text-blue-800">Master</span>
      </div>
    </div>
  );
};

export default EduMasterLogo;