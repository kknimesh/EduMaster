import React from 'react';
import { Icons } from '../../assets/icons';
import Avatar, { AvatarGroup } from '../ui/Avatar';
import Button from '../ui/Button';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    avatar?: string;
  };
  thumbnail?: string;
  students: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  totalStudents: number;
  progress?: number;
  status: 'active' | 'completed' | 'upcoming' | 'draft';
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  rating?: number;
  totalRatings?: number;
  price?: number;
  isFree?: boolean;
  tags?: string[];
  startDate?: string;
  endDate?: string;
}

interface CourseCardProps {
  course: Course;
  variant?: 'default' | 'compact' | 'detailed';
  showProgress?: boolean;
  showStudents?: boolean;
  showActions?: boolean;
  onEnroll?: (courseId: string) => void;
  onView?: (courseId: string) => void;
  onEdit?: (courseId: string) => void;
  className?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  variant = 'default',
  showProgress = true,
  showStudents = true,
  showActions = true,
  onEnroll,
  onView,
  onEdit,
  className = ''
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'text-green-600';
      case 'intermediate':
        return 'text-yellow-600';
      case 'advanced':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icons.Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (variant === 'compact') {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200 ${className}`}>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1 truncate">
                {course.instructor.name}
              </p>
              <div className="flex items-center mt-2 space-x-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                  {course.status}
                </span>
                <span className="text-sm text-gray-500">{course.duration}</span>
              </div>
            </div>
            {showActions && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView?.(course.id)}
              >
                View
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden ${className}`}>
      {/* Thumbnail */}
      <div className="relative">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Icons.BookOpen className="h-16 w-16 text-white opacity-50" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
            {course.status}
          </span>
        </div>

        {/* Price/Free Badge */}
        <div className="absolute top-3 right-3">
          {course.isFree ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Free
            </span>
          ) : course.price && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              ${course.price}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
              {course.title}
            </h3>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {course.description}
          </p>

          {/* Rating */}
          {course.rating && (
            <div className="flex items-center space-x-1 mb-3">
              <div className="flex space-x-1">
                {renderStars(course.rating)}
              </div>
              <span className="text-sm text-gray-600">
                {course.rating} ({course.totalRatings} reviews)
              </span>
            </div>
          )}
        </div>

        {/* Instructor */}
        <div className="flex items-center mb-4">
          <Avatar
            name={course.instructor.name}
            src={course.instructor.avatar}
            size="sm"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {course.instructor.name}
            </p>
            <p className="text-xs text-gray-500">Instructor</p>
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <Icons.Clock className="h-4 w-4 mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Icons.Users className="h-4 w-4 mr-1" />
              {course.totalStudents}
            </div>
            <div className={`flex items-center text-sm ${getLevelColor(course.level)}`}>
              <Icons.TrendingUp className="h-4 w-4 mr-1" />
              {course.level}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {showProgress && course.progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Students */}
        {showStudents && course.students.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Students</span>
              <AvatarGroup
                users={course.students}
                max={4}
                size="xs"
              />
            </div>
          </div>
        )}

        {/* Tags */}
        {course.tags && course.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {course.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
              {course.tags.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  +{course.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-3">
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={() => course.status === 'active' ? onView?.(course.id) : onEnroll?.(course.id)}
            >
              {course.status === 'active' ? 'Continue' : 'Enroll Now'}
            </Button>
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(course.id)}
              >
                <Icons.Edit className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;