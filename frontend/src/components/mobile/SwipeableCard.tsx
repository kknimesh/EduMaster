import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../../assets/icons';

interface SwipeAction {
  id: string;
  label: string;
  icon: keyof typeof Icons;
  color: string;
  backgroundColor: string;
  onClick: () => void;
}

interface SwipeableCardProps {
  children: React.ReactNode;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
  disabled?: boolean;
  snapThreshold?: number;
  className?: string;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  leftActions = [],
  rightActions = [],
  onSwipeStart,
  onSwipeEnd,
  disabled = false,
  snapThreshold = 80,
  className = ''
}) => {
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const maxTranslate = 120;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || disabled) return;
      
      const deltaX = e.clientX - startX;
      const newTranslateX = Math.max(-maxTranslate, Math.min(maxTranslate, deltaX));
      setTranslateX(newTranslateX);
      setCurrentX(e.clientX);
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      
      const deltaX = currentX - startX;
      let finalTranslateX = 0;

      // Snap to action if threshold is met
      if (Math.abs(deltaX) > snapThreshold) {
        if (deltaX > 0 && leftActions.length > 0) {
          finalTranslateX = maxTranslate;
        } else if (deltaX < 0 && rightActions.length > 0) {
          finalTranslateX = -maxTranslate;
        }
      }

      setTranslateX(finalTranslateX);
      setIsDragging(false);
      onSwipeEnd?.();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || disabled) return;
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - startX;
      const newTranslateX = Math.max(-maxTranslate, Math.min(maxTranslate, deltaX));
      setTranslateX(newTranslateX);
      setCurrentX(touch.clientX);
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      
      const deltaX = currentX - startX;
      let finalTranslateX = 0;

      if (Math.abs(deltaX) > snapThreshold) {
        if (deltaX > 0 && leftActions.length > 0) {
          finalTranslateX = maxTranslate;
        } else if (deltaX < 0 && rightActions.length > 0) {
          finalTranslateX = -maxTranslate;
        }
      }

      setTranslateX(finalTranslateX);
      setIsDragging(false);
      onSwipeEnd?.();
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, startX, currentX, snapThreshold, leftActions, rightActions, disabled, onSwipeEnd]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    onSwipeStart?.();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    
    const touch = e.touches[0];
    setIsDragging(true);
    setStartX(touch.clientX);
    setCurrentX(touch.clientX);
    onSwipeStart?.();
  };

  const handleActionClick = (action: SwipeAction) => {
    action.onClick();
    setTranslateX(0); // Reset position after action
  };

  const renderActions = (actions: SwipeAction[], side: 'left' | 'right') => {
    const isVisible = side === 'left' ? translateX > 0 : translateX < 0;
    const opacity = Math.min(1, Math.abs(translateX) / snapThreshold);
    
    return (
      <div
        className={`absolute top-0 bottom-0 flex items-center ${
          side === 'left' ? 'left-0' : 'right-0'
        }`}
        style={{
          opacity: isVisible ? opacity : 0,
          transform: side === 'left' 
            ? `translateX(${Math.min(0, translateX - maxTranslate)}px)`
            : `translateX(${Math.max(0, translateX + maxTranslate)}px)`
        }}
      >
        {actions.map((action, index) => {
          const IconComponent = Icons[action.icon];
          
          return (
            <button
              key={action.id}
              onClick={() => handleActionClick(action)}
              className={`h-full px-4 flex flex-col items-center justify-center min-w-20 transition-all duration-200`}
              style={{ 
                backgroundColor: action.backgroundColor,
                color: action.color
              }}
            >
              <IconComponent className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Left Actions */}
      {leftActions.length > 0 && renderActions(leftActions, 'left')}
      
      {/* Right Actions */}
      {rightActions.length > 0 && renderActions(rightActions, 'right')}
      
      {/* Card Content */}
      <div
        ref={cardRef}
        className={`relative z-10 bg-white transition-transform duration-200 ease-out ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          transform: `translateX(${translateX}px)`,
          transitionDuration: isDragging ? '0ms' : '200ms'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {children}
      </div>

      {/* Swipe Hint Indicators */}
      {!isDragging && translateX === 0 && (
        <>
          {leftActions.length > 0 && (
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center text-gray-400 pointer-events-none">
              <Icons.ChevronRight className="h-4 w-4" />
            </div>
          )}
          {rightActions.length > 0 && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-gray-400 pointer-events-none">
              <Icons.ChevronLeft className="h-4 w-4" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Pull to Refresh Component
interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  threshold?: number;
  disabled?: boolean;
  className?: string;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  threshold = 100,
  disabled = false,
  className = ''
}) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || disabled || isRefreshing) return;
      
      const container = containerRef.current;
      if (!container || container.scrollTop > 0) return;

      const touch = e.touches[0];
      const deltaY = touch.clientY - startY;
      
      if (deltaY > 0) {
        e.preventDefault();
        const distance = Math.min(deltaY * 0.5, threshold * 1.5);
        setPullDistance(distance);
      }
    };

    const handleTouchEnd = async () => {
      if (!isDragging) return;
      
      setIsDragging(false);
      
      if (pullDistance >= threshold && !isRefreshing) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
        }
      }
      
      setPullDistance(0);
    };

    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, startY, pullDistance, threshold, onRefresh, disabled, isRefreshing]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || isRefreshing) return;
    
    const container = containerRef.current;
    if (!container || container.scrollTop > 0) return;

    const touch = e.touches[0];
    setStartY(touch.clientY);
    setIsDragging(true);
  };

  const refreshProgress = Math.min(pullDistance / threshold, 1);
  const shouldTrigger = pullDistance >= threshold;

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-auto ${className}`}
      onTouchStart={handleTouchStart}
    >
      {/* Pull to Refresh Indicator */}
      <div 
        className="absolute top-0 left-0 right-0 flex items-center justify-center bg-white z-10 transition-all duration-200"
        style={{
          height: `${Math.max(pullDistance, isRefreshing ? 60 : 0)}px`,
          transform: `translateY(-${Math.max(0, 60 - pullDistance)}px)`
        }}
      >
        <div className="flex items-center space-x-2 text-gray-600">
          {isRefreshing ? (
            <>
              <Icons.Loader className="h-5 w-5 animate-spin" />
              <span className="text-sm font-medium">Refreshing...</span>
            </>
          ) : (
            <>
              <div 
                className={`transition-transform duration-200 ${shouldTrigger ? 'rotate-180' : ''}`}
              >
                <Icons.ChevronDown className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">
                {shouldTrigger ? 'Release to refresh' : 'Pull to refresh'}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ paddingTop: isRefreshing ? '60px' : '0px' }}>
        {children}
      </div>
    </div>
  );
};

export default SwipeableCard;