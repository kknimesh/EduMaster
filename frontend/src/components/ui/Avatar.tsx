import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: 'initials' | 'icon';
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name = '',
  size = 'md',
  className = '',
  fallback = 'initials',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarBgColor = (name: string) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name}
        className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
        onError={(e) => {
          // Hide image on error and show fallback
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }

  if (fallback === 'initials' && name) {
    return (
      <div
        className={`${sizeClasses[size]} ${getAvatarBgColor(name)} rounded-full flex items-center justify-center text-white font-medium ${className}`}
      >
        {getInitials(name)}
      </div>
    );
  }

  // Default user icon fallback
  return (
    <div
      className={`${sizeClasses[size]} bg-gray-300 rounded-full flex items-center justify-center text-gray-600 ${className}`}
    >
      <svg
        className="w-2/3 h-2/3"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
  );
};

// Avatar Group Component
interface AvatarGroupProps {
  users: Array<{ name: string; src?: string; id: string }>;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  users,
  max = 4,
  size = 'md',
  className = '',
}) => {
  const displayUsers = users.slice(0, max);
  const remainingCount = users.length - max;

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {displayUsers.map((user, index) => (
        <Avatar
          key={user.id}
          src={user.src}
          name={user.name}
          size={size}
          className="border-2 border-white"
        />
      ))}
      {remainingCount > 0 && (
        <div
          className={`${size === 'xs' ? 'w-6 h-6 text-xs' : 
                      size === 'sm' ? 'w-8 h-8 text-sm' : 
                      size === 'lg' ? 'w-12 h-12 text-lg' : 
                      size === 'xl' ? 'w-16 h-16 text-xl' : 
                      'w-10 h-10 text-base'} 
                     bg-gray-500 rounded-full flex items-center justify-center text-white font-medium border-2 border-white`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default Avatar;