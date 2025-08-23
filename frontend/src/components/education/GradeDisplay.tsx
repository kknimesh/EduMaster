import React from 'react';
import { Icons } from '../../assets/icons';

interface Grade {
  value: number | string;
  maxPoints?: number;
  percentage?: number;
  letterGrade?: string;
  gpa?: number;
  status?: 'excellent' | 'good' | 'average' | 'poor' | 'fail';
}

interface GradeDisplayProps {
  grade: Grade;
  variant?: 'default' | 'compact' | 'detailed' | 'circular';
  showTrend?: boolean;
  trend?: 'up' | 'down' | 'stable';
  showStatus?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const GradeDisplay: React.FC<GradeDisplayProps> = ({
  grade,
  variant = 'default',
  showTrend = false,
  trend,
  showStatus = true,
  size = 'md',
  className = ''
}) => {
  const getGradeStatus = (percentage: number): Grade['status'] => {
    if (percentage >= 90) return 'excellent';
    if (percentage >= 80) return 'good';
    if (percentage >= 70) return 'average';
    if (percentage >= 60) return 'poor';
    return 'fail';
  };

  const getStatusColor = (status: Grade['status']) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'average':
        return 'text-yellow-600 bg-yellow-100';
      case 'poor':
        return 'text-orange-600 bg-orange-100';
      case 'fail':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: Grade['status']) => {
    switch (status) {
      case 'excellent':
        return 'Excellent';
      case 'good':
        return 'Good';
      case 'average':
        return 'Average';
      case 'poor':
        return 'Needs Improvement';
      case 'fail':
        return 'Failing';
      default:
        return 'Unknown';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <Icons.TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <Icons.TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable':
        return <Icons.Minus className="h-4 w-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const percentage = grade.percentage || (typeof grade.value === 'number' && grade.maxPoints ? (grade.value / grade.maxPoints) * 100 : 0);
  const status = grade.status || getGradeStatus(percentage);
  
  const sizeClasses = {
    sm: {
      text: 'text-sm',
      badge: 'text-xs px-2 py-1',
      circle: 'w-16 h-16 text-sm'
    },
    md: {
      text: 'text-base',
      badge: 'text-sm px-2.5 py-1',
      circle: 'w-20 h-20 text-base'
    },
    lg: {
      text: 'text-lg',
      badge: 'text-base px-3 py-1.5',
      circle: 'w-24 h-24 text-lg'
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center space-x-2 ${className}`}>
        <span className={`font-semibold ${sizeClasses[size].text}`}>
          {grade.letterGrade || `${typeof grade.value === 'number' ? grade.value.toFixed(1) : grade.value}${grade.maxPoints ? `/${grade.maxPoints}` : ''}`}
        </span>
        {showTrend && trend && getTrendIcon()}
      </div>
    );
  }

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
              className={getStatusColor(status).replace('bg-', 'text-').replace('-100', '-600')}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`font-bold ${sizeClasses[size].text}`}>
              {grade.letterGrade || `${percentage.toFixed(0)}%`}
            </span>
            {grade.gpa && (
              <span className="text-xs text-gray-500">
                {grade.gpa.toFixed(1)} GPA
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className={`text-2xl font-bold text-gray-900`}>
              {grade.letterGrade || `${typeof grade.value === 'number' ? grade.value.toFixed(1) : grade.value}${grade.maxPoints ? `/${grade.maxPoints}` : ''}`}
            </div>
            {percentage > 0 && (
              <div className="text-lg text-gray-600">
                {percentage.toFixed(1)}%
              </div>
            )}
            {grade.gpa && (
              <div className="text-sm text-gray-500">
                GPA: {grade.gpa.toFixed(2)}
              </div>
            )}
          </div>
          {showTrend && trend && (
            <div className="flex items-center space-x-1">
              {getTrendIcon()}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(status).replace('text-', 'bg-').replace('-600', '-500')}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>

        {showStatus && (
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium ${sizeClasses[size].badge} ${getStatusColor(status)}`}>
              {getStatusText(status)}
            </span>
            <div className="text-sm text-gray-500">
              {percentage >= 60 ? 'Passing' : 'Failing'}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`inline-flex items-center space-x-3 ${className}`}>
      <div className="text-right">
        <div className={`font-semibold text-gray-900 ${sizeClasses[size].text}`}>
          {grade.letterGrade || `${typeof grade.value === 'number' ? grade.value.toFixed(1) : grade.value}${grade.maxPoints ? `/${grade.maxPoints}` : ''}`}
        </div>
        {percentage > 0 && (
          <div className="text-sm text-gray-500">
            {percentage.toFixed(1)}%
          </div>
        )}
        {grade.gpa && (
          <div className="text-xs text-gray-500">
            {grade.gpa.toFixed(2)} GPA
          </div>
        )}
      </div>

      {showStatus && (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium ${sizeClasses[size].badge} ${getStatusColor(status)}`}>
          {getStatusText(status)}
        </span>
      )}

      {showTrend && trend && (
        <div className="flex items-center">
          {getTrendIcon()}
        </div>
      )}
    </div>
  );
};

// Grade Summary Component
interface GradeSummaryProps {
  grades: Array<{
    subject: string;
    grade: Grade;
    weight?: number;
  }>;
  overallGrade?: Grade;
  className?: string;
}

export const GradeSummary: React.FC<GradeSummaryProps> = ({
  grades,
  overallGrade,
  className = ''
}) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Summary</h3>
      
      {/* Individual Grades */}
      <div className="space-y-3 mb-6">
        {grades.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <div className="flex-1">
              <span className="font-medium text-gray-900">{item.subject}</span>
              {item.weight && (
                <span className="text-sm text-gray-500 ml-2">
                  ({(item.weight * 100).toFixed(0)}%)
                </span>
              )}
            </div>
            <GradeDisplay
              grade={item.grade}
              variant="compact"
              showStatus={false}
              size="sm"
            />
          </div>
        ))}
      </div>

      {/* Overall Grade */}
      {overallGrade && (
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">Overall Grade</span>
            <GradeDisplay
              grade={overallGrade}
              variant="detailed"
              showTrend={true}
              size="md"
              className="w-48"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GradeDisplay;