import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import CourseCard from '../components/education/CourseCard';
import Modal from '../components/ui/Modal';
import Tabs from '../components/navigation/Tabs';
import StatCard from '../components/charts/StatCard';
import { BarChart } from '../components/charts/AdvancedChart';
import { Icons } from '../assets/icons';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: { name: string; avatar: string };
  students: any[];
  totalStudents: number;
  progress: number;
  status: 'active' | 'inactive' | 'archived';
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  rating: number;
  totalRatings: number;
  price?: number;
  tags: string[];
  startDate: string;
  endDate: string;
  lessons: number;
  assignments: number;
  enrollmentLimit?: number;
}

const CoursesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddModal, setShowAddModal] = useState(false);

  // Sample courses data
  const courses: Course[] = [
    {
      id: '1',
      title: 'Advanced React Development',
      description: 'Learn advanced React concepts including hooks, context, performance optimization, and modern patterns.',
      instructor: { name: 'Dr. Sarah Johnson', avatar: '' },
      students: [],
      totalStudents: 247,
      progress: 75,
      status: 'active',
      duration: '12 weeks',
      level: 'advanced',
      category: 'Programming',
      rating: 4.8,
      totalRatings: 124,
      price: 299,
      tags: ['React', 'JavaScript', 'Frontend', 'Hooks'],
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      lessons: 24,
      assignments: 8,
      enrollmentLimit: 300
    },
    {
      id: '2',
      title: 'Introduction to Data Science',
      description: 'Comprehensive introduction to data science covering Python, statistics, machine learning, and data visualization.',
      instructor: { name: 'Prof. Michael Chen', avatar: '' },
      students: [],
      totalStudents: 189,
      progress: 60,
      status: 'active',
      duration: '16 weeks',
      level: 'intermediate',
      category: 'Data Science',
      rating: 4.6,
      totalRatings: 98,
      price: 399,
      tags: ['Python', 'Statistics', 'Machine Learning', 'Pandas'],
      startDate: '2024-02-01',
      endDate: '2024-05-20',
      lessons: 32,
      assignments: 12,
      enrollmentLimit: 200
    },
    {
      id: '3',
      title: 'Digital Marketing Fundamentals',
      description: 'Master the basics of digital marketing including SEO, social media, content marketing, and analytics.',
      instructor: { name: 'Ms. Emily Rodriguez', avatar: '' },
      students: [],
      totalStudents: 156,
      progress: 80,
      status: 'active',
      duration: '8 weeks',
      level: 'beginner',
      category: 'Marketing',
      rating: 4.9,
      totalRatings: 87,
      price: 199,
      tags: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
      startDate: '2024-01-20',
      endDate: '2024-03-20',
      lessons: 16,
      assignments: 6
    },
    {
      id: '4',
      title: 'Advanced Mathematics',
      description: 'Deep dive into calculus, linear algebra, and advanced mathematical concepts for engineering and science.',
      instructor: { name: 'Dr. James Wilson', avatar: '' },
      students: [],
      totalStudents: 89,
      progress: 45,
      status: 'active',
      duration: '20 weeks',
      level: 'advanced',
      category: 'Mathematics',
      rating: 4.5,
      totalRatings: 112,
      tags: ['Calculus', 'Linear Algebra', 'Differential Equations'],
      startDate: '2024-02-15',
      endDate: '2024-07-01',
      lessons: 40,
      assignments: 15,
      enrollmentLimit: 100
    },
    {
      id: '5',
      title: 'Creative Writing Workshop',
      description: 'Develop your writing skills through structured exercises, peer reviews, and personalized feedback.',
      instructor: { name: 'Ms. Lisa Thompson', avatar: '' },
      students: [],
      totalStudents: 45,
      progress: 90,
      status: 'active',
      duration: '6 weeks',
      level: 'intermediate',
      category: 'Literature',
      rating: 4.7,
      totalRatings: 64,
      price: 149,
      tags: ['Creative Writing', 'Fiction', 'Poetry', 'Workshop'],
      startDate: '2024-01-10',
      endDate: '2024-02-20',
      lessons: 12,
      assignments: 8,
      enrollmentLimit: 50
    },
    {
      id: '6',
      title: 'Physics for Engineers',
      description: 'Classical mechanics, thermodynamics, and electromagnetism with engineering applications.',
      instructor: { name: 'Prof. David Lee', avatar: '' },
      students: [],
      totalStudents: 234,
      progress: 55,
      status: 'inactive',
      duration: '18 weeks',
      level: 'intermediate',
      category: 'Science',
      rating: 4.4,
      totalRatings: 156,
      tags: ['Physics', 'Engineering', 'Mechanics', 'Thermodynamics'],
      startDate: '2024-03-01',
      endDate: '2024-07-15',
      lessons: 36,
      assignments: 10,
      enrollmentLimit: 250
    }
  ];

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !filterCategory || course.category === filterCategory;
    const matchesLevel = !filterLevel || course.level === filterLevel;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && course.status === 'active') ||
                      (activeTab === 'popular' && course.rating >= 4.5) ||
                      (activeTab === 'my-courses' && course.instructor.name === 'Dr. Sarah Johnson'); // Demo filter
    
    return matchesSearch && matchesCategory && matchesLevel && matchesTab;
  });

  const categories = Array.from(new Set(courses.map(c => c.category)));
  const categoryData = categories.map(cat => ({
    label: cat,
    value: courses.filter(c => c.category === cat).length,
    color: cat === 'Programming' ? '#3b82f6' :
           cat === 'Data Science' ? '#10b981' :
           cat === 'Marketing' ? '#f59e0b' :
           cat === 'Mathematics' ? '#8b5cf6' :
           cat === 'Literature' ? '#ef4444' :
           cat === 'Science' ? '#06b6d4' : '#6b7280'
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Courses
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Create and manage educational courses
            </p>
          </div>
          <Button 
            variant="primary" 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2"
          >
            <Icons.Plus className="w-5 h-5" />
            <span>Create Course</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Courses"
            value={courses.length.toString()}
            change={{ value: 3, type: 'increase', period: 'this month' }}
            icon="BookOpen"
            color="blue"
          />
          <StatCard
            title="Active Courses"
            value={courses.filter(c => c.status === 'active').length.toString()}
            change={{ value: 2, type: 'increase', period: 'this week' }}
            icon="CheckCircle"
            color="green"
          />
          <StatCard
            title="Total Enrollments"
            value={courses.reduce((acc, c) => acc + c.totalStudents, 0).toString()}
            change={{ value: 45, type: 'increase', period: 'this month' }}
            icon="Users"
            color="purple"
          />
          <StatCard
            title="Avg Rating"
            value={((courses.reduce((acc, c) => acc + c.rating, 0) / courses.length)).toFixed(1)}
            change={{ value: 0.3, type: 'increase', period: 'this quarter' }}
            icon="Star"
            color="yellow"
          />
        </div>

        {/* Categories Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-3">
            <Card>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Courses by Category
              </h2>
              <BarChart data={categoryData} />
            </Card>
          </div>
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Quick Stats
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icons.BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Avg Duration</span>
                </div>
                <span className="text-lg font-bold text-blue-600">
                  {Math.round(courses.reduce((acc, c) => acc + parseInt(c.duration), 0) / courses.length)} weeks
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icons.Users className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Avg Enrollment</span>
                </div>
                <span className="text-lg font-bold text-green-600">
                  {Math.round(courses.reduce((acc, c) => acc + c.totalStudents, 0) / courses.length)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icons.Target className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Completion Rate</span>
                </div>
                <span className="text-lg font-bold text-purple-600">
                  {Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length)}%
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <Tabs
              tabs={[
                { id: 'all', label: 'All Courses', badge: courses.length.toString() },
                { id: 'active', label: 'Active', badge: courses.filter(c => c.status === 'active').length.toString() },
                { id: 'popular', label: 'Popular', badge: courses.filter(c => c.rating >= 4.5).length.toString() },
                { id: 'my-courses', label: 'My Courses', badge: '1' }
              ]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Filters and Controls */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon="Search"
              />
              <Select
                placeholder="Filter by category"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                options={[
                  { value: '', label: 'All Categories' },
                  ...categories.map(cat => ({ value: cat, label: cat }))
                ]}
              />
              <Select
                placeholder="Filter by level"
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                options={[
                  { value: '', label: 'All Levels' },
                  { value: 'beginner', label: 'Beginner' },
                  { value: 'intermediate', label: 'Intermediate' },
                  { value: 'advanced', label: 'Advanced' }
                ]}
              />
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Icons.Filter className="w-4 h-4 mr-2" />
                  More
                </Button>
                <Button variant="outline">
                  <Icons.Download className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="flex-1"
                >
                  <Icons.Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="flex-1"
                >
                  <Icons.List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Courses Display */}
          <div className="p-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    variant="default"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      {course.title.split(' ').map(word => word[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{course.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{course.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">by {course.instructor.name}</span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getLevelColor(course.level)}`}>
                              {course.level}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(course.status)}`}>
                              {course.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            <Icons.Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{course.rating}</span>
                            <span className="text-xs text-gray-500">({course.totalRatings})</span>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {course.totalStudents} students
                          </div>
                          {course.price && (
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                              ${course.price}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button variant="primary" size="sm">
                        View Course
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icons.Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <Icons.BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No courses found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                  Create New Course
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Create Course Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Create New Course"
          size="xl"
          actions={
            <>
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button variant="primary">
                Create Course
              </Button>
            </>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input label="Course Title" placeholder="Enter course title" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course Description
              </label>
              <textarea
                className="w-full h-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter course description..."
                required
              />
            </div>
            <Select
              label="Category"
              placeholder="Select category"
              required
              options={categories.map(cat => ({ value: cat, label: cat }))}
            />
            <Select
              label="Level"
              placeholder="Select difficulty level"
              required
              options={[
                { value: 'beginner', label: 'Beginner' },
                { value: 'intermediate', label: 'Intermediate' },
                { value: 'advanced', label: 'Advanced' }
              ]}
            />
            <Input label="Duration (weeks)" type="number" placeholder="Enter duration" required />
            <Input label="Price ($)" type="number" placeholder="Enter price (optional)" />
            <Input label="Start Date" type="date" required />
            <Input label="End Date" type="date" required />
            <Input label="Enrollment Limit" type="number" placeholder="Max students (optional)" />
            <Select
              label="Status"
              placeholder="Select status"
              required
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' }
              ]}
            />
            <div className="md:col-span-2">
              <Input label="Tags" placeholder="Enter tags (comma separated)" />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CoursesPage;