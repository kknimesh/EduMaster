import React from 'react';
import Button from '../ui/Button';

interface EmptyStateProps {
  title: string;
  description: string;
  illustration?: 'courses' | 'assignments' | 'students' | 'general';
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  illustration = 'general',
  actionLabel,
  onAction,
  className = '',
}) => {
  const illustrations = {
    courses: (
      <svg className="w-64 h-64 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 384 384">
        <path d="M192 0L0 96v192c0 52.8 43.2 96 96 96h192c52.8 0 96-43.2 96-96V96L192 0zM192 64l128 48v128c0 35.2-28.8 64-64 64H128c-35.2 0-64-28.8-64-64V112l128-48z"/>
        <circle cx="192" cy="160" r="32" fill="#3B82F6"/>
        <path d="M144 224h96v16h-96v-16z" fill="#6B7280"/>
        <path d="M160 248h64v8h-64v-8z" fill="#9CA3AF"/>
      </svg>
    ),
    assignments: (
      <svg className="w-64 h-64 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 384 384">
        <rect x="64" y="32" width="256" height="320" rx="16" fill="currentColor"/>
        <rect x="80" y="80" width="224" height="8" rx="4" fill="#3B82F6"/>
        <rect x="80" y="112" width="192" height="8" rx="4" fill="#6B7280"/>
        <rect x="80" y="144" width="160" height="8" rx="4" fill="#6B7280"/>
        <rect x="80" y="176" width="200" height="8" rx="4" fill="#6B7280"/>
        <circle cx="96" cy="224" r="8" fill="#22C55E"/>
        <rect x="120" y="216" width="160" height="8" rx="4" fill="#6B7280"/>
      </svg>
    ),
    students: (
      <svg className="w-64 h-64 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 384 384">
        <circle cx="192" cy="128" r="64" fill="currentColor"/>
        <path d="M192 208c-70.4 0-128 28.8-128 64v32h256v-32c0-35.2-57.6-64-128-64z" fill="currentColor"/>
        <circle cx="128" cy="96" r="32" fill="#6B7280"/>
        <circle cx="256" cy="96" r="32" fill="#6B7280"/>
        <path d="M96 144c-35.2 0-64 14.4-64 32v16h128v-16c0-17.6-28.8-32-64-32z" fill="#6B7280"/>
        <path d="M224 144c-35.2 0-64 14.4-64 32v16h128v-16c0-17.6-28.8-32-64-32z" fill="#6B7280"/>
      </svg>
    ),
    general: (
      <svg className="w-64 h-64 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 384 384">
        <rect x="32" y="64" width="320" height="256" rx="16" fill="currentColor"/>
        <rect x="64" y="128" width="256" height="8" rx="4" fill="#3B82F6"/>
        <rect x="64" y="160" width="192" height="8" rx="4" fill="#6B7280"/>
        <rect x="64" y="192" width="224" height="8" rx="4" fill="#6B7280"/>
        <rect x="64" y="224" width="160" height="8" rx="4" fill="#6B7280"/>
      </svg>
    ),
  };

  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="mb-8">
        {illustrations[illustration]}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;