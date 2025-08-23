import React from 'react';
import { Icons } from '../../assets/icons';

interface ProgressStep {
  id: string;
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'upcoming' | 'locked';
  date?: string;
}

interface ProgressIndicatorProps {
  steps?: ProgressStep[];
  currentProgress?: number;
  totalProgress?: number;
  variant?: 'linear' | 'circular' | 'steps' | 'milestone';
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  showLabels?: boolean;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps = [],
  currentProgress = 0,
  totalProgress = 100,
  variant = 'linear',
  size = 'md',
  showPercentage = true,
  showLabels = true,
  color = 'blue',
  className = ''
}) => {
  const percentage = totalProgress > 0 ? Math.min((currentProgress / totalProgress) * 100, 100) : 0;

  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      text: 'text-blue-600',
      light: 'bg-blue-100',
      ring: 'ring-blue-500'
    },
    green: {
      bg: 'bg-green-500',
      text: 'text-green-600',
      light: 'bg-green-100',
      ring: 'ring-green-500'
    },
    purple: {
      bg: 'bg-purple-500',
      text: 'text-purple-600',
      light: 'bg-purple-100',
      ring: 'ring-purple-500'
    },
    orange: {
      bg: 'bg-orange-500',
      text: 'text-orange-600',
      light: 'bg-orange-100',
      ring: 'ring-orange-500'
    }
  };

  const sizeClasses = {
    sm: {
      height: 'h-2',
      text: 'text-sm',
      circle: 'w-16 h-16',
      step: 'w-8 h-8'
    },
    md: {
      height: 'h-3',
      text: 'text-base',
      circle: 'w-20 h-20',
      step: 'w-10 h-10'
    },
    lg: {
      height: 'h-4',
      text: 'text-lg',
      circle: 'w-24 h-24',
      step: 'w-12 h-12'
    }
  };

  if (variant === 'circular') {
    const circumference = 2 * Math.PI * 30;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <div className={`${sizeClasses[size].circle} relative`}>
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 68 68">
            <circle
              cx="34"
              cy="34"
              r="30"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="34"
              cy="34"
              r="30"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={colorClasses[color].text}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`font-bold ${sizeClasses[size].text}`}>
              {percentage.toFixed(0)}%
            </span>
            {showLabels && (
              <span className="text-xs text-gray-500">
                Complete
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'steps') {
    return (
      <div className={`${className}`}>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            
            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="relative flex items-center justify-center">
                  <div
                    className={`
                      ${sizeClasses[size].step} rounded-full border-2 flex items-center justify-center
                      ${step.status === 'completed' 
                        ? `${colorClasses[color].bg} border-transparent text-white`
                        : step.status === 'current'
                        ? `bg-white border-${color}-500 ${colorClasses[color].text} ${colorClasses[color].ring} ring-2`
                        : step.status === 'upcoming'
                        ? 'bg-white border-gray-300 text-gray-500'
                        : 'bg-gray-100 border-gray-200 text-gray-400'
                      }
                    `}
                  >
                    {step.status === 'completed' ? (
                      <Icons.Check className="h-5 w-5" />
                    ) : step.status === 'locked' ? (
                      <Icons.Lock className="h-4 w-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div className="flex-1 mx-4">
                    <div className={`${sizeClasses[size].height} rounded-full bg-gray-200 relative overflow-hidden`}>
                      <div
                        className={`${sizeClasses[size].height} ${colorClasses[color].bg} rounded-full transition-all duration-500`}
                        style={{
                          width: step.status === 'completed' ? '100%' : '0%'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step Labels */}
        {showLabels && (
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <div key={`label-${step.id}`} className="flex-1 text-center px-2">
                <div className={`text-sm font-medium ${step.status === 'current' ? colorClasses[color].text : 'text-gray-900'}`}>
                  {step.title}
                </div>
                {step.description && (
                  <div className="text-xs text-gray-500 mt-1">
                    {step.description}
                  </div>
                )}
                {step.date && (
                  <div className="text-xs text-gray-400 mt-1">
                    {step.date}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'milestone') {
    const milestones = [25, 50, 75, 100];
    
    return (
      <div className={`${className}`}>
        <div className="relative">
          {/* Progress Bar */}
          <div className={`w-full ${sizeClasses[size].height} bg-gray-200 rounded-full`}>
            <div
              className={`${sizeClasses[size].height} ${colorClasses[color].bg} rounded-full transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Milestone Markers */}
          <div className="absolute top-0 w-full h-full flex justify-between items-center px-1">
            {milestones.map((milestone) => (
              <div
                key={milestone}
                className={`
                  w-4 h-4 rounded-full border-2 bg-white
                  ${percentage >= milestone 
                    ? `border-${color}-500 ${colorClasses[color].bg}`
                    : 'border-gray-300'
                  }
                `}
                style={{ left: `${milestone - 2}%` }}
              />
            ))}
          </div>
        </div>

        {showLabels && (
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {milestones.map((milestone) => (
              <span key={milestone}>{milestone}%</span>
            ))}
          </div>
        )}

        {showPercentage && (
          <div className="text-center mt-2">
            <span className={`font-semibold ${sizeClasses[size].text} ${colorClasses[color].text}`}>
              {percentage.toFixed(1)}% Complete
            </span>
          </div>
        )}
      </div>
    );
  }

  // Linear variant (default)
  return (
    <div className={`${className}`}>
      {showLabels && (
        <div className="flex justify-between items-center mb-2">
          <span className={`font-medium ${sizeClasses[size].text} text-gray-900`}>
            Progress
          </span>
          {showPercentage && (
            <span className={`${sizeClasses[size].text} ${colorClasses[color].text} font-semibold`}>
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>
      )}
      
      <div className={`w-full ${sizeClasses[size].height} bg-gray-200 rounded-full overflow-hidden`}>
        <div
          className={`${sizeClasses[size].height} ${colorClasses[color].bg} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {totalProgress > 0 && showLabels && (
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>{currentProgress} completed</span>
          <span>{totalProgress} total</span>
        </div>
      )}
    </div>
  );
};

// Course Progress Component
interface CourseProgressProps {
  courseName: string;
  lessonsCompleted: number;
  totalLessons: number;
  assignmentsCompleted: number;
  totalAssignments: number;
  overallProgress: number;
  className?: string;
}

export const CourseProgress: React.FC<CourseProgressProps> = ({
  courseName,
  lessonsCompleted,
  totalLessons,
  assignmentsCompleted,
  totalAssignments,
  overallProgress,
  className = ''
}) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{courseName}</h3>
      
      {/* Overall Progress */}
      <div className="mb-6">
        <ProgressIndicator
          currentProgress={overallProgress}
          totalProgress={100}
          variant="linear"
          size="lg"
          color="blue"
          showPercentage={true}
          showLabels={true}
        />
      </div>

      {/* Detailed Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Lessons</h4>
          <ProgressIndicator
            currentProgress={lessonsCompleted}
            totalProgress={totalLessons}
            variant="linear"
            size="md"
            color="green"
            showPercentage={false}
            showLabels={true}
          />
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Assignments</h4>
          <ProgressIndicator
            currentProgress={assignmentsCompleted}
            totalProgress={totalAssignments}
            variant="linear"
            size="md"
            color="purple"
            showPercentage={false}
            showLabels={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;