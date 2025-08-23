import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import StatCard from '../components/charts/StatCard';
import { LineChart, BarChart, DonutChart } from '../components/charts/AdvancedChart';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import { Icons } from '../assets/icons';

const Dashboard: React.FC = () => {
  // Sample data
  const recentActivities = [
    {
      id: '1',
      type: 'assignment',
      title: 'Math Assignment 5 submitted',
      student: 'Alice Johnson',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: '2',
      type: 'course',
      title: 'New student enrolled in Physics 101',
      student: 'Bob Smith',
      time: '4 hours ago',
      status: 'info'
    },
    {
      id: '3',
      type: 'grade',
      title: 'Chemistry Quiz graded',
      student: 'Carol Davis',
      time: '6 hours ago',
      status: 'warning'
    }
  ];

  const upcomingAssignments = [
    {
      id: '1',
      title: 'Physics Lab Report',
      course: 'Physics 101',
      dueDate: '2024-03-20',
      submissions: 15,
      totalStudents: 28
    },
    {
      id: '2',
      title: 'Math Problem Set 7',
      course: 'Advanced Mathematics',
      dueDate: '2024-03-22',
      submissions: 8,
      totalStudents: 22
    }
  ];

  const topPerformers = [
    { id: '1', name: 'Alice Johnson', grade: 98.5, avatar: '' },
    { id: '2', name: 'Bob Smith', grade: 96.2, avatar: '' },
    { id: '3', name: 'Carol Davis', grade: 94.8, avatar: '' },
    { id: '4', name: 'David Wilson', grade: 93.1, avatar: '' },
    { id: '5', name: 'Emma Brown', grade: 91.7, avatar: '' }
  ];

  const chartData = [
    { date: new Date('2024-01-01'), value: 65 },
    { date: new Date('2024-01-02'), value: 78 },
    { date: new Date('2024-01-03'), value: 82 },
    { date: new Date('2024-01-04'), value: 75 },
    { date: new Date('2024-01-05'), value: 88 },
    { date: new Date('2024-01-06'), value: 91 },
    { date: new Date('2024-01-07'), value: 95 }
  ];

  const gradeDistribution = [
    { label: 'A (90-100)', value: 35, color: '#10b981' },
    { label: 'B (80-89)', value: 40, color: '#3b82f6' },
    { label: 'C (70-79)', value: 20, color: '#f59e0b' },
    { label: 'D (60-69)', value: 5, color: '#ef4444' }
  ];

  const subjectPerformance = [
    { label: 'Mathematics', value: 92, color: '#3b82f6' },
    { label: 'Science', value: 88, color: '#10b981' },
    { label: 'English', value: 85, color: '#f59e0b' },
    { label: 'History', value: 90, color: '#8b5cf6' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Good morning, John! 👋
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Here's what's happening in your school today.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value="1,247"
            change={{ value: 12, type: 'increase', period: 'this month' }}
            icon="Users"
            color="blue"
          />
          <StatCard
            title="Active Courses"
            value="89"
            change={{ value: 8, type: 'increase', period: 'this week' }}
            icon="BookOpen"
            color="green"
          />
          <StatCard
            title="Assignments Due"
            value="23"
            change={{ value: 5, type: 'decrease', period: 'today' }}
            icon="FileText"
            color="yellow"
          />
          <StatCard
            title="Average Grade"
            value="87.5%"
            change={{ value: 3, type: 'increase', period: 'this term' }}
            icon="TrendingUp"
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Performance Trends */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Performance Trends
                </h2>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
              <LineChart data={chartData} height={300} />
            </Card>
          </div>

          {/* Grade Distribution */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Grade Distribution
            </h2>
            <DonutChart data={gradeDistribution} />
            <div className="mt-4 space-y-2">
              {gradeDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Subject Performance */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Subject Performance
            </h2>
            <BarChart data={subjectPerformance} />
          </Card>

          {/* Recent Activities */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Activities
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className={`p-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-100 text-green-600' :
                    activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.type === 'assignment' && <Icons.FileText className="w-4 h-4" />}
                    {activity.type === 'course' && <Icons.BookOpen className="w-4 h-4" />}
                    {activity.type === 'grade' && <Icons.Star className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      by {activity.student} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Assignments */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Upcoming Assignments
              </h2>
              <Link to="/assignments">
                <Button variant="outline" size="sm">
                  Manage All
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {assignment.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Due {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {assignment.course}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {assignment.submissions}/{assignment.totalStudents} submitted
                    </div>
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ 
                          width: `${(assignment.submissions / assignment.totalStudents) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Performers */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Top Performers
              </h2>
              <Link to="/students">
                <Button variant="outline" size="sm">
                  View All Students
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {topPerformers.map((student, index) => (
                <div key={student.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                    {index + 1}
                  </div>
                  <Avatar name={student.name} src={student.avatar} size="md" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {student.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Average Grade
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      {student.grade}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/courses" className="block">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                <Icons.BookOpen className="w-6 h-6" />
                <span className="text-sm">Create Course</span>
              </Button>
            </Link>
            <Link to="/assignments" className="block">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                <Icons.FileText className="w-6 h-6" />
                <span className="text-sm">New Assignment</span>
              </Button>
            </Link>
            <Link to="/students" className="block">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                <Icons.UserPlus className="w-6 h-6" />
                <span className="text-sm">Add Student</span>
              </Button>
            </Link>
            <Link to="/teachers" className="block">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                <Icons.Users className="w-6 h-6" />
                <span className="text-sm">Invite Teacher</span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;