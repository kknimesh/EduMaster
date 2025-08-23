import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Avatar, { AvatarGroup } from '../components/ui/Avatar';
import LoadingSpinner, { SkeletonLoader, CardSkeleton } from '../components/ui/LoadingSpinner';
import StatCard, { SimpleChart } from '../components/charts/StatCard';
import EmptyState from '../components/illustrations/EmptyState';
import EduMasterLogo from '../assets/logos/EduMasterLogo';
import { Icons } from '../assets/icons';

// Import new components
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import Checkbox from '../components/ui/Checkbox';
import Radio from '../components/ui/Radio';
import Modal, { ConfirmModal } from '../components/ui/Modal';
import Toast, { ToastContainer } from '../components/ui/Toast';
import Tooltip from '../components/ui/Tooltip';
import Header from '../components/navigation/Header';
import Sidebar from '../components/navigation/Sidebar';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import Tabs from '../components/navigation/Tabs';
import Pagination from '../components/navigation/Pagination';
import DataTable from '../components/ui/DataTable';
import Calendar from '../components/ui/Calendar';
import VideoPlayer from '../components/ui/VideoPlayer';
import CourseCard from '../components/education/CourseCard';
import AssignmentCard from '../components/education/AssignmentCard';
import GradeDisplay, { GradeSummary } from '../components/education/GradeDisplay';
import ProgressIndicator, { CourseProgress } from '../components/education/ProgressIndicator';
import AnimatedCounter, { AnimatedProgressRing, AnimatedSlideIn, AnimatedFadeIn } from '../components/animations/AnimatedCounter';
import DarkModeToggle, { DarkModeProvider } from '../components/ui/DarkModeToggle';
import { LineChart, BarChart, DonutChart, Heatmap } from '../components/charts/AdvancedChart';
import MobileNavigation, { MobileDrawer, MobileActionSheet } from '../components/mobile/MobileNavigation';
import SwipeableCard, { PullToRefresh } from '../components/mobile/SwipeableCard';
import { AccessibilityProvider, AccessibilityPanel } from '../components/accessibility/AccessibilityProvider';

const UIShowcase: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);
  const [toasts, setToasts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentPage, setCurrentPage] = useState(1);
  
  const sampleUsers = [
    { id: '1', name: 'Alice Johnson', src: '' },
    { id: '2', name: 'Bob Smith', src: '' },
    { id: '3', name: 'Carol Davis', src: '' },
    { id: '4', name: 'David Wilson', src: '' },
    { id: '5', name: 'Emma Brown', src: '' },
  ];

  const chartData = [
    { label: 'Jan', value: 30, color: 'bg-blue-500' },
    { label: 'Feb', value: 45, color: 'bg-green-500' },
    { label: 'Mar', value: 35, color: 'bg-yellow-500' },
    { label: 'Apr', value: 50, color: 'bg-purple-500' },
    { label: 'May', value: 40, color: 'bg-red-500' },
  ];

  // Sample data for new components
  const sampleCourse = {
    id: '1',
    title: 'Advanced React Development',
    description: 'Learn advanced React concepts including hooks, context, and performance optimization.',
    instructor: { name: 'Dr. Sarah Johnson', avatar: '' },
    students: sampleUsers,
    totalStudents: 247,
    progress: 75,
    status: 'active' as const,
    duration: '12 weeks',
    level: 'intermediate' as const,
    category: 'Programming',
    rating: 4.8,
    totalRatings: 124,
    price: 99,
    tags: ['React', 'JavaScript', 'Frontend'],
    startDate: '2024-01-15',
    endDate: '2024-04-15'
  };

  const sampleAssignment = {
    id: '1',
    title: 'Build a React Dashboard',
    description: 'Create a responsive dashboard using React hooks and modern CSS.',
    course: { id: '1', title: 'Advanced React Development', color: 'bg-blue-100' },
    instructor: { name: 'Dr. Sarah Johnson', avatar: '' },
    dueDate: '2024-03-15',
    status: 'pending' as const,
    type: 'project' as const,
    points: 100,
    difficulty: 'medium' as const,
    estimatedTime: '8-10 hours'
  };

  const addToast = (toast: any) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <DarkModeProvider>
      <AccessibilityProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <ToastContainer toasts={toasts} onClose={removeToast} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <EduMasterLogo size="xl" variant="full" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            EduMaster UI/UX Design System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete collection of components, icons, and design elements for the EduMaster platform
          </p>
        </div>

        {/* Logo Variants */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">🏷️ Logo Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center py-8">
              <h3 className="text-lg font-semibold mb-4">Full Logo</h3>
              <EduMasterLogo size="lg" variant="full" />
            </Card>
            <Card className="text-center py-8">
              <h3 className="text-lg font-semibold mb-4">Icon Only</h3>
              <EduMasterLogo size="lg" variant="icon" />
            </Card>
            <Card className="text-center py-8">
              <h3 className="text-lg font-semibold mb-4">Text Only</h3>
              <EduMasterLogo size="lg" variant="text" />
            </Card>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">🔘 Buttons</h2>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="danger">Danger Button</Button>
              <Button variant="outline">Outline Button</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" loading>Loading Button</Button>
              <Button variant="secondary" disabled>Disabled Button</Button>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">📋 Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-lg font-semibold mb-2">Default Card</h3>
              <p className="text-gray-600">This is a basic card with default styling and padding.</p>
            </Card>
            <Card shadow="lg" hover>
              <h3 className="text-lg font-semibold mb-2">Enhanced Card</h3>
              <p className="text-gray-600">This card has large shadow and hover effects.</p>
            </Card>
            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-2">Large Padding</h3>
              <p className="text-gray-600">This card has extra padding for more breathing room.</p>
            </Card>
          </div>
        </section>

        {/* Avatars */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">👤 Avatars</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Individual Avatars</h3>
              <div className="flex items-center space-x-4">
                <Avatar name="Alice Johnson" size="xs" />
                <Avatar name="Bob Smith" size="sm" />
                <Avatar name="Carol Davis" size="md" />
                <Avatar name="David Wilson" size="lg" />
                <Avatar name="Emma Brown" size="xl" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Avatar Groups</h3>
              <div className="space-y-4">
                <AvatarGroup users={sampleUsers} max={3} size="sm" />
                <AvatarGroup users={sampleUsers} max={4} size="md" />
              </div>
            </div>
          </div>
        </section>

        {/* Icons */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">🎯 Icons</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Object.entries(Icons).map(([iconName, IconComponent]) => (
              <Card key={iconName} className="text-center p-4 hover:shadow-md transition-shadow">
                <div className="text-blue-600 mb-2 flex justify-center">
                  <IconComponent />
                </div>
                <p className="text-sm text-gray-600 font-medium">{iconName}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Loading States */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">⚡ Loading States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-8">
              <h3 className="text-lg font-semibold mb-4">Spinner (Small)</h3>
              <LoadingSpinner size="sm" />
            </Card>
            <Card className="text-center p-8">
              <h3 className="text-lg font-semibold mb-4">Spinner (Medium)</h3>
              <LoadingSpinner size="md" />
            </Card>
            <Card className="text-center p-8">
              <h3 className="text-lg font-semibold mb-4">Spinner (Large)</h3>
              <LoadingSpinner size="lg" />
            </Card>
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Skeleton Loader</h3>
              <div className="space-y-2">
                <SkeletonLoader className="h-4 w-3/4" />
                <SkeletonLoader className="h-4 w-1/2" />
                <SkeletonLoader className="h-4 w-2/3" />
              </div>
            </Card>
          </div>
        </section>

        {/* Data Visualization */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">📊 Data Visualization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Students"
              value="1,247"
              change={{ value: 12, type: 'increase', period: 'last month' }}
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
              change={{ value: 5, type: 'decrease', period: 'yesterday' }}
              icon="AcademicCap"
              color="yellow"
            />
            <StatCard
              title="Average Grade"
              value="87.5%"
              change={{ value: 3, type: 'increase', period: 'this term' }}
              icon="CheckCircle"
              color="purple"
            />
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Bar Chart</h3>
              <SimpleChart data={chartData} type="bar" />
            </Card>
            <Card>
              <h3 className="text-lg font-semibold mb-4">Line Chart</h3>
              <SimpleChart data={chartData} type="line" />
            </Card>
          </div>
        </section>

        {/* Empty States */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">🎭 Empty States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <EmptyState
                title="No courses yet"
                description="Create your first course to get started with EduMaster"
                illustration="courses"
                actionLabel="Create Course"
                onAction={() => alert('Create course clicked!')}
              />
            </Card>
            <Card>
              <EmptyState
                title="No assignments"
                description="You haven't created any assignments yet. Start engaging your students!"
                illustration="assignments"
                actionLabel="Add Assignment"
                onAction={() => alert('Add assignment clicked!')}
              />
            </Card>
          </div>
        </section>

        {/* Card Skeleton */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">💀 Skeleton Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </section>

        {/* Form Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">📝 Form Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Input Fields</h3>
              <div className="space-y-4">
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  leftIcon="Mail"
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  rightIcon="EyeOff"
                  error="Password must be at least 8 characters"
                />
                <Input
                  label="Search"
                  placeholder="Search..."
                  leftIcon="Search"
                  variant="filled"
                  success="Found 15 results"
                />
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Select & Textarea</h3>
              <div className="space-y-4">
                <Select
                  label="Country"
                  placeholder="Select your country"
                  options={[
                    { value: 'us', label: 'United States' },
                    { value: 'ca', label: 'Canada' },
                    { value: 'uk', label: 'United Kingdom' }
                  ]}
                  required
                />
                <Textarea
                  label="Description"
                  placeholder="Tell us about yourself..."
                  characterCount
                  maxLength={500}
                  helper="This will be visible on your profile"
                />
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Checkboxes</h3>
              <div className="space-y-4">
                <Checkbox
                  label="Accept Terms & Conditions"
                  description="By checking this, you agree to our terms of service"
                />
                <Checkbox
                  label="Subscribe to newsletter"
                  variant="card"
                  checked
                />
                <Checkbox
                  label="Enable notifications"
                  indeterminate
                />
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Radio Buttons</h3>
              <Radio
                name="plan"
                label="Choose your plan"
                value="basic"
                options={[
                  { value: 'basic', label: 'Basic Plan', description: '$9/month' },
                  { value: 'pro', label: 'Pro Plan', description: '$19/month' },
                  { value: 'enterprise', label: 'Enterprise', description: '$49/month' }
                ]}
                variant="card"
              />
            </Card>
          </div>
        </section>

        {/* Navigation Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">🧭 Navigation Components</h2>
          <div className="space-y-8">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Breadcrumbs</h3>
              <Breadcrumbs
                items={[
                  { label: 'Home', icon: 'Home' },
                  { label: 'Courses', href: '/courses' },
                  { label: 'React Development', href: '/courses/react' },
                  { label: 'Components', current: true }
                ]}
              />
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Tabs</h3>
              <Tabs
                tabs={[
                  { id: 'overview', label: 'Overview', icon: 'Eye' },
                  { id: 'lessons', label: 'Lessons', badge: '12' },
                  { id: 'assignments', label: 'Assignments', badge: '5' },
                  { id: 'discussions', label: 'Discussions', icon: 'MessageSquare' }
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Pagination</h3>
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </Card>
          </div>
        </section>

        {/* Modal & Toast Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">🪟 Modals & Notifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Modals</h3>
              <div className="space-y-3">
                <Button onClick={() => setShowModal(true)} variant="outline" className="w-full">
                  Open Modal
                </Button>
                <Button onClick={() => setShowConfirmModal(true)} variant="danger" className="w-full">
                  Delete Item
                </Button>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Toast Notifications</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => addToast({
                    type: 'success',
                    message: 'Successfully saved your changes!'
                  })}
                  variant="outline"
                  className="w-full"
                >
                  Success Toast
                </Button>
                <Button
                  onClick={() => addToast({
                    type: 'error',
                    title: 'Error',
                    message: 'Failed to upload file. Please try again.'
                  })}
                  variant="outline"
                  className="w-full"
                >
                  Error Toast
                </Button>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Tooltips</h3>
              <div className="space-y-3">
                <Tooltip content="This is a helpful tooltip">
                  <Button variant="outline" className="w-full">
                    Hover me
                  </Button>
                </Tooltip>
                <Tooltip content="Click tooltip" trigger="click" position="left">
                  <Button variant="outline" className="w-full">
                    Click me
                  </Button>
                </Tooltip>
              </div>
            </Card>
          </div>
        </section>

        {/* Education Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">🎓 Education Components</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Course Card</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CourseCard course={sampleCourse} />
                <CourseCard course={{...sampleCourse, variant: 'compact'}} variant="compact" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Assignment Card</h3>
              <AssignmentCard assignment={sampleAssignment} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Grade Display</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GradeDisplay
                  grade={{ value: 92, maxPoints: 100, percentage: 92, letterGrade: 'A-' }}
                  variant="detailed"
                  showTrend
                  trend="up"
                />
                <GradeDisplay
                  grade={{ value: 85, maxPoints: 100, percentage: 85 }}
                  variant="circular"
                />
                <GradeDisplay
                  grade={{ percentage: 78, letterGrade: 'B+' }}
                  variant="compact"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Progress Indicators</h3>
              <div className="space-y-6">
                <ProgressIndicator
                  currentProgress={75}
                  totalProgress={100}
                  variant="linear"
                />
                <ProgressIndicator
                  currentProgress={60}
                  totalProgress={100}
                  variant="circular"
                />
                <CourseProgress
                  courseName="React Development"
                  lessonsCompleted={8}
                  totalLessons={12}
                  assignmentsCompleted={3}
                  totalAssignments={5}
                  overallProgress={75}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Data Visualization */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">📈 Advanced Charts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Line Chart</h3>
              <LineChart
                data={[
                  { date: new Date('2024-01-01'), value: 30 },
                  { date: new Date('2024-01-02'), value: 45 },
                  { date: new Date('2024-01-03'), value: 35 },
                  { date: new Date('2024-01-04'), value: 60 },
                  { date: new Date('2024-01-05'), value: 55 }
                ]}
              />
            </Card>
            
            <Card>
              <h3 className="text-lg font-semibold mb-4">Bar Chart</h3>
              <BarChart
                data={[
                  { label: 'Math', value: 92, color: '#3b82f6' },
                  { label: 'Science', value: 88, color: '#10b981' },
                  { label: 'English', value: 95, color: '#f59e0b' },
                  { label: 'History', value: 82, color: '#ef4444' }
                ]}
              />
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Donut Chart</h3>
              <DonutChart
                data={[
                  { label: 'Completed', value: 75, color: '#10b981' },
                  { label: 'In Progress', value: 15, color: '#f59e0b' },
                  { label: 'Not Started', value: 10, color: '#ef4444' }
                ]}
              />
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Data Table</h3>
              <DataTable
                data={[
                  { id: '1', name: 'Alice Johnson', grade: 92, course: 'React' },
                  { id: '2', name: 'Bob Smith', grade: 88, course: 'Vue' },
                  { id: '3', name: 'Carol Davis', grade: 95, course: 'Angular' }
                ]}
                columns={[
                  { key: 'name', title: 'Student Name', sortable: true },
                  { key: 'course', title: 'Course', sortable: true },
                  { key: 'grade', title: 'Grade', sortable: true, align: 'right' }
                ]}
                sortable
              />
            </Card>
          </div>
        </section>

        {/* Animation Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">✨ Animations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Animated Counter</h3>
              <div className="text-center">
                <AnimatedCounter
                  end={1247}
                  duration={2000}
                  className="text-3xl font-bold text-blue-600"
                />
                <p className="text-sm text-gray-500 mt-2">Total Students</p>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Progress Ring</h3>
              <div className="flex justify-center">
                <AnimatedProgressRing progress={85} />
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Slide In Animation</h3>
              <AnimatedSlideIn direction="up" delay={500}>
                <div className="p-4 bg-blue-100 rounded-lg text-center">
                  <p className="text-blue-800">This slides in from below!</p>
                </div>
              </AnimatedSlideIn>
            </Card>
          </div>
        </section>

        {/* Dark Mode & Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">🌙 Dark Mode & Accessibility</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Dark Mode Toggle</h3>
              <div className="space-y-4">
                <DarkModeToggle variant="switch" />
                <DarkModeToggle variant="button" />
                <DarkModeToggle variant="icon" />
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Accessibility</h3>
              <Button
                onClick={() => setShowAccessibilityPanel(true)}
                variant="outline"
                className="w-full"
              >
                Open Accessibility Settings
              </Button>
            </Card>
          </div>
        </section>

        {/* Mobile Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">📱 Mobile Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Mobile Actions</h3>
              <div className="space-y-3">
                <Button onClick={() => setShowDrawer(true)} variant="outline" className="w-full">
                  Open Drawer
                </Button>
                <Button onClick={() => setShowActionSheet(true)} variant="outline" className="w-full">
                  Show Action Sheet
                </Button>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Swipeable Card</h3>
              <SwipeableCard
                leftActions={[
                  {
                    id: 'archive',
                    label: 'Archive',
                    icon: 'Archive',
                    color: '#ffffff',
                    backgroundColor: '#3b82f6',
                    onClick: () => console.log('Archive')
                  }
                ]}
                rightActions={[
                  {
                    id: 'delete',
                    label: 'Delete',
                    icon: 'Trash2',
                    color: '#ffffff',
                    backgroundColor: '#ef4444',
                    onClick: () => console.log('Delete')
                  }
                ]}
              >
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <p className="font-medium">Swipe me left or right!</p>
                  <p className="text-sm text-gray-500">Try swiping this card to reveal actions</p>
                </div>
              </SwipeableCard>
            </Card>
          </div>
        </section>

        {/* Modals */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Sample Modal"
          actions={
            <>
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setShowModal(false)}>
                Save Changes
              </Button>
            </>
          }
        >
          <p>This is a sample modal with custom actions.</p>
        </Modal>

        <ConfirmModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={() => {
            console.log('Confirmed!');
            setShowConfirmModal(false);
          }}
          title="Delete Item"
          message="Are you sure you want to delete this item? This action cannot be undone."
          variant="danger"
        />

        <MobileDrawer
          isOpen={showDrawer}
          onClose={() => setShowDrawer(false)}
          title="Sample Drawer"
        >
          <div className="p-4">
            <p>This is content inside the mobile drawer.</p>
          </div>
        </MobileDrawer>

        <MobileActionSheet
          isOpen={showActionSheet}
          onClose={() => setShowActionSheet(false)}
          title="Choose Action"
          actions={[
            {
              label: 'Edit',
              icon: 'Edit',
              onClick: () => console.log('Edit')
            },
            {
              label: 'Share',
              icon: 'Share',
              onClick: () => console.log('Share')
            },
            {
              label: 'Delete',
              icon: 'Trash2',
              onClick: () => console.log('Delete'),
              variant: 'destructive'
            }
          ]}
        />

        <AccessibilityPanel
          isOpen={showAccessibilityPanel}
          onClose={() => setShowAccessibilityPanel(false)}
        />

          </div>
        </div>
      </AccessibilityProvider>
    </DarkModeProvider>
  );
};

export default UIShowcase;