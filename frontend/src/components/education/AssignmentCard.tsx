import React from 'react';
import { Icons } from '../../assets/icons';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

interface Assignment {
  id: string;
  title: string;
  description: string;
  course: {
    id: string;
    title: string;
    color?: string;
  };
  instructor: {
    name: string;
    avatar?: string;
  };
  dueDate: string;
  submittedDate?: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue' | 'draft';
  type: 'quiz' | 'essay' | 'project' | 'presentation' | 'lab' | 'exam';
  points: number;
  earnedPoints?: number;
  grade?: string;
  submissionCount?: number;
  totalSubmissions?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime?: string;
  attachments?: Array<{
    name: string;
    type: string;
    size: string;
  }>;
  feedback?: string;
  isGroupAssignment?: boolean;
}

interface AssignmentCardProps {
  assignment: Assignment;
  variant?: 'default' | 'compact' | 'detailed';
  showActions?: boolean;
  showProgress?: boolean;
  userRole?: 'student' | 'instructor';
  onView?: (assignmentId: string) => void;
  onSubmit?: (assignmentId: string) => void;
  onGrade?: (assignmentId: string) => void;
  onEdit?: (assignmentId: string) => void;
  className?: string;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  variant = 'default',
  showActions = true,
  showProgress = false,
  userRole = 'student',
  onView,
  onSubmit,
  onGrade,
  onEdit,
  className = ''
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'graded':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz':
        return Icons.CheckCircle;
      case 'essay':
        return Icons.FileText;
      case 'project':
        return Icons.Folder;
      case 'presentation':
        return Icons.Monitor;
      case 'lab':
        return Icons.Microscope;
      case 'exam':
        return Icons.Shield;
      default:
        return Icons.FileText;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'hard':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const isOverdue = () => {
    return new Date(assignment.dueDate) < new Date() && assignment.status === 'pending';
  };

  const getTimeRemaining = () => {
    const dueDate = new Date(assignment.dueDate);
    const now = new Date();
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  const TypeIconComponent = getTypeIcon(assignment.type);

  if (variant === 'compact') {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200 ${className}`}>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1 min-w-0">
              <div className="flex-shrink-0 mt-1">
                <div className={`p-2 rounded-lg ${assignment.course.color || 'bg-blue-100'}`}>
                  <TypeIconComponent className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {assignment.title}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {assignment.course.title}
                </p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                    {assignment.status}
                  </span>
                  <span className={`text-xs ${isOverdue() ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                    {getTimeRemaining()}
                  </span>
                </div>
              </div>
            </div>
            {assignment.earnedPoints !== undefined && (
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {assignment.earnedPoints}/{assignment.points}
                </div>
                {assignment.grade && (
                  <div className="text-xs text-gray-500">{assignment.grade}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3 flex-1">
            <div className="flex-shrink-0">
              <div className={`p-3 rounded-lg ${assignment.course.color || 'bg-blue-100'}`}>
                <TypeIconComponent className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {assignment.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {assignment.description}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium">{assignment.course.title}</span>
                {assignment.isGroupAssignment && (
                  <>
                    <span className="mx-2">•</span>
                    <Icons.Users className="h-4 w-4 mr-1" />
                    <span>Group Assignment</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Status & Grade */}
          <div className="text-right">
            <div className="flex items-center justify-end space-x-2 mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                {assignment.status}
              </span>
              {isOverdue() && (
                <Icons.AlertCircle className="h-4 w-4 text-red-500" />
              )}
            </div>
            {assignment.earnedPoints !== undefined ? (
              <div className="text-lg font-semibold text-gray-900">
                {assignment.earnedPoints}/{assignment.points} pts
              </div>
            ) : (
              <div className="text-lg font-semibold text-gray-900">
                {assignment.points} pts
              </div>
            )}
            {assignment.grade && (
              <div className="text-sm text-gray-600 font-medium">
                Grade: {assignment.grade}
              </div>
            )}
          </div>
        </div>

        {/* Meta Information */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Icons.Calendar className="h-4 w-4 mr-2" />
              <span className={isOverdue() ? 'text-red-600 font-medium' : ''}>
                {getTimeRemaining()}
              </span>
            </div>
            {assignment.estimatedTime && (
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Icons.Clock className="h-4 w-4 mr-2" />
                <span>{assignment.estimatedTime}</span>
              </div>
            )}
            <div className="flex items-center text-sm text-gray-600">
              <Icons.BarChart className="h-4 w-4 mr-2" />
              <span className={`capitalize ${getDifficultyColor(assignment.difficulty)}`}>
                {assignment.difficulty}
              </span>
            </div>
          </div>
          
          <div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Icons.FileText className="h-4 w-4 mr-2" />
              <span className="capitalize">{assignment.type}</span>
            </div>
            {assignment.submittedDate && (
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Icons.Upload className="h-4 w-4 mr-2" />
                <span>Submitted {new Date(assignment.submittedDate).toLocaleDateString()}</span>
              </div>
            )}
            {showProgress && assignment.submissionCount !== undefined && (
              <div className="flex items-center text-sm text-gray-600">
                <Icons.Users className="h-4 w-4 mr-2" />
                <span>{assignment.submissionCount}/{assignment.totalSubmissions} submitted</span>
              </div>
            )}
          </div>
        </div>

        {/* Instructor */}
        <div className="flex items-center mb-4">
          <Avatar
            name={assignment.instructor.name}
            src={assignment.instructor.avatar}
            size="sm"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {assignment.instructor.name}
            </p>
            <p className="text-xs text-gray-500">Instructor</p>
          </div>
        </div>

        {/* Attachments */}
        {assignment.attachments && assignment.attachments.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
            <div className="space-y-2">
              {assignment.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <Icons.Paperclip className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700 flex-1">{attachment.name}</span>
                  <span className="text-xs text-gray-500">{attachment.size}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback */}
        {assignment.feedback && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-1">Feedback</h4>
            <p className="text-sm text-blue-800">{assignment.feedback}</p>
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onView?.(assignment.id)}
              className="flex-1"
            >
              <Icons.Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
            
            {userRole === 'student' && assignment.status === 'pending' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSubmit?.(assignment.id)}
              >
                <Icons.Upload className="h-4 w-4 mr-2" />
                Submit
              </Button>
            )}
            
            {userRole === 'instructor' && assignment.status === 'submitted' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onGrade?.(assignment.id)}
              >
                <Icons.CheckCircle className="h-4 w-4 mr-2" />
                Grade
              </Button>
            )}
            
            {userRole === 'instructor' && onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(assignment.id)}
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

export default AssignmentCard;