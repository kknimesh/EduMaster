import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import AssignmentCard from '../components/education/AssignmentCard';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import Tabs from '../components/navigation/Tabs';
import StatCard from '../components/charts/StatCard';
import { DonutChart, BarChart } from '../components/charts/AdvancedChart';
import { Icons } from '../assets/icons';

interface Assignment {
  id: string;
  title: string;
  description: string;
  course: { id: string; title: string; color: string };
  instructor: { name: string; avatar: string };
  dueDate: string;
  status: 'draft' | 'published' | 'graded' | 'overdue';
  type: 'homework' | 'quiz' | 'project' | 'exam' | 'essay';
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  submissions: {
    total: number;
    submitted: number;
    graded: number;
    pending: number;
  };
  averageGrade?: number;
  createdDate: string;
  attachments?: string[];
}

const AssignmentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  // Sample assignments data
  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'React Hooks Implementation',
      description: 'Create a complex React application demonstrating advanced hook patterns including custom hooks, useContext, and useReducer.',
      course: { id: '1', title: 'Advanced React Development', color: 'bg-blue-100' },
      instructor: { name: 'Dr. Sarah Johnson', avatar: '' },
      dueDate: '2024-03-25',
      status: 'published',
      type: 'project',
      points: 100,
      difficulty: 'hard',
      estimatedTime: '8-10 hours',
      submissions: { total: 247, submitted: 189, graded: 145, pending: 44 },
      averageGrade: 87.5,
      createdDate: '2024-03-01',
      attachments: ['project-requirements.pdf', 'starter-code.zip']
    },
    {
      id: '2',
      title: 'Data Analysis with Pandas',
      description: 'Analyze a real-world dataset using Pandas, NumPy, and create visualizations with Matplotlib.',
      course: { id: '2', title: 'Introduction to Data Science', color: 'bg-green-100' },
      instructor: { name: 'Prof. Michael Chen', avatar: '' },
      dueDate: '2024-03-20',
      status: 'published',
      type: 'homework',
      points: 75,
      difficulty: 'medium',
      estimatedTime: '4-6 hours',
      submissions: { total: 189, submitted: 167, graded: 167, pending: 0 },
      averageGrade: 84.2,
      createdDate: '2024-03-05',
      attachments: ['dataset.csv', 'analysis-template.ipynb']
    },
    {
      id: '3',
      title: 'SEO Strategy Presentation',
      description: 'Develop a comprehensive SEO strategy for a fictional business and present your findings.',
      course: { id: '3', title: 'Digital Marketing Fundamentals', color: 'bg-yellow-100' },
      instructor: { name: 'Ms. Emily Rodriguez', avatar: '' },
      dueDate: '2024-03-18',
      status: 'overdue',
      type: 'project',
      points: 80,
      difficulty: 'medium',
      estimatedTime: '6-8 hours',
      submissions: { total: 156, submitted: 134, graded: 89, pending: 45 },
      averageGrade: 91.3,
      createdDate: '2024-02-28',
      attachments: ['seo-guidelines.pdf']
    },
    {
      id: '4',
      title: 'Calculus Problem Set 7',
      description: 'Solve advanced calculus problems focusing on integration by parts and partial fractions.',
      course: { id: '4', title: 'Advanced Mathematics', color: 'bg-purple-100' },
      instructor: { name: 'Dr. James Wilson', avatar: '' },
      dueDate: '2024-03-30',
      status: 'published',
      type: 'homework',
      points: 50,
      difficulty: 'hard',
      estimatedTime: '3-4 hours',
      submissions: { total: 89, submitted: 45, graded: 20, pending: 25 },
      averageGrade: 76.8,
      createdDate: '2024-03-10',
      attachments: ['problem-set-7.pdf']
    },
    {
      id: '5',
      title: 'Short Story Analysis',
      description: 'Write a critical analysis of a contemporary short story, focusing on literary devices and themes.',
      course: { id: '5', title: 'Creative Writing Workshop', color: 'bg-red-100' },
      instructor: { name: 'Ms. Lisa Thompson', avatar: '' },
      dueDate: '2024-03-22',
      status: 'published',
      type: 'essay',
      points: 60,
      difficulty: 'medium',
      estimatedTime: '4-5 hours',
      submissions: { total: 45, submitted: 38, graded: 30, pending: 8 },
      averageGrade: 88.7,
      createdDate: '2024-03-08',
      attachments: ['story-collection.pdf', 'analysis-rubric.pdf']
    },
    {
      id: '6',
      title: 'Physics Lab Report',
      description: 'Conduct experiments on projectile motion and write a comprehensive lab report with data analysis.',
      course: { id: '6', title: 'Physics for Engineers', color: 'bg-indigo-100' },
      instructor: { name: 'Prof. David Lee', avatar: '' },
      dueDate: '2024-04-05',
      status: 'draft',
      type: 'project',
      points: 90,
      difficulty: 'hard',
      estimatedTime: '6-8 hours',
      submissions: { total: 0, submitted: 0, graded: 0, pending: 0 },
      createdDate: '2024-03-12'
    }
  ];

  // Filter assignments
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || assignment.status === filterStatus;
    const matchesType = !filterType || assignment.type === filterType;
    const matchesCourse = !filterCourse || assignment.course.id === filterCourse;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && ['published', 'overdue'].includes(assignment.status)) ||
                      (activeTab === 'drafts' && assignment.status === 'draft') ||
                      (activeTab === 'graded' && assignment.status === 'graded') ||
                      (activeTab === 'overdue' && assignment.status === 'overdue');
    
    return matchesSearch && matchesStatus && matchesType && matchesCourse && matchesTab;
  });

  const courses = Array.from(new Set(assignments.map(a => a.course)));
  
  // Calculate stats
  const totalSubmissions = assignments.reduce((acc, a) => acc + a.submissions.submitted, 0);
  const averageGrade = assignments
    .filter(a => a.averageGrade)
    .reduce((acc, a) => acc + (a.averageGrade || 0), 0) / assignments.filter(a => a.averageGrade).length;

  const statusData = [
    { label: 'Published', value: assignments.filter(a => a.status === 'published').length, color: '#10b981' },
    { label: 'Draft', value: assignments.filter(a => a.status === 'draft').length, color: '#f59e0b' },
    { label: 'Graded', value: assignments.filter(a => a.status === 'graded').length, color: '#3b82f6' },
    { label: 'Overdue', value: assignments.filter(a => a.status === 'overdue').length, color: '#ef4444' }
  ];

  const typeData = [
    { label: 'Homework', value: assignments.filter(a => a.type === 'homework').length, color: '#3b82f6' },
    { label: 'Project', value: assignments.filter(a => a.type === 'project').length, color: '#10b981' },
    { label: 'Essay', value: assignments.filter(a => a.type === 'essay').length, color: '#f59e0b' },
    { label: 'Quiz', value: assignments.filter(a => a.type === 'quiz').length, color: '#8b5cf6' },
    { label: 'Exam', value: assignments.filter(a => a.type === 'exam').length, color: '#ef4444' }
  ].filter(item => item.value > 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'graded': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tableColumns = [
    { 
      key: 'title', 
      title: 'Assignment', 
      sortable: true,
      render: (assignment: Assignment) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{assignment.title}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{assignment.course.title}</div>
        </div>
      )
    },
    { 
      key: 'type', 
      title: 'Type', 
      sortable: true,
      render: (assignment: Assignment) => (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-800">
          {assignment.type}
        </span>
      )
    },
    { 
      key: 'dueDate', 
      title: 'Due Date', 
      sortable: true,
      render: (assignment: Assignment) => (
        <div className="text-sm">
          <div className="font-medium text-gray-900 dark:text-white">
            {new Date(assignment.dueDate).toLocaleDateString()}
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            {Math.ceil((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} days
          </div>
        </div>
      )
    },
    { 
      key: 'submissions', 
      title: 'Submissions', 
      align: 'center' as const,
      render: (assignment: Assignment) => (
        <div className="text-center">
          <div className="font-medium text-gray-900 dark:text-white">
            {assignment.submissions.submitted}/{assignment.submissions.total}
          </div>
          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mx-auto mt-1">
            <div 
              className="bg-blue-500 h-1.5 rounded-full"
              style={{ 
                width: `${assignment.submissions.total > 0 ? (assignment.submissions.submitted / assignment.submissions.total) * 100 : 0}%` 
              }}
            />
          </div>
        </div>
      )
    },
    { 
      key: 'averageGrade', 
      title: 'Avg Grade', 
      align: 'center' as const,
      render: (assignment: Assignment) => (
        <div className="text-center">
          {assignment.averageGrade ? (
            <span className="font-medium text-gray-900 dark:text-white">
              {assignment.averageGrade.toFixed(1)}%
            </span>
          ) : (
            <span className="text-gray-400">N/A</span>
          )}
        </div>
      )
    },
    { 
      key: 'status', 
      title: 'Status', 
      sortable: true,
      render: (assignment: Assignment) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(assignment.status)}`}>
          {assignment.status}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (assignment: Assignment) => (
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSelectedAssignment(assignment)}
          >
            View
          </Button>
          <Button 
            variant="outline" 
            size="sm"
          >
            <Icons.Edit className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Assignments
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Create and manage course assignments and assessments
            </p>
          </div>
          <Button 
            variant="primary" 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2"
          >
            <Icons.Plus className="w-5 h-5" />
            <span>Create Assignment</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Assignments"
            value={assignments.length.toString()}
            change={{ value: 4, type: 'increase', period: 'this month' }}
            icon="FileText"
            color="blue"
          />
          <StatCard
            title="Active Assignments"
            value={assignments.filter(a => a.status === 'published').length.toString()}
            change={{ value: 2, type: 'increase', period: 'this week' }}
            icon="CheckCircle"
            color="green"
          />
          <StatCard
            title="Total Submissions"
            value={totalSubmissions.toString()}
            change={{ value: 23, type: 'increase', period: 'today' }}
            icon="Upload"
            color="purple"
          />
          <StatCard
            title="Average Grade"
            value={`${averageGrade.toFixed(1)}%`}
            change={{ value: 2.3, type: 'increase', period: 'this month' }}
            icon="TrendingUp"
            color="yellow"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Assignment Status
            </h2>
            <DonutChart data={statusData} />
            <div className="mt-4 space-y-2">
              {statusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Assignment Types
            </h2>
            <BarChart data={typeData} />
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <Tabs
              tabs={[
                { id: 'all', label: 'All Assignments', badge: assignments.length.toString() },
                { id: 'active', label: 'Active', badge: assignments.filter(a => ['published', 'overdue'].includes(a.status)).length.toString() },
                { id: 'drafts', label: 'Drafts', badge: assignments.filter(a => a.status === 'draft').length.toString() },
                { id: 'graded', label: 'Graded', badge: assignments.filter(a => a.status === 'graded').length.toString() },
                { id: 'overdue', label: 'Overdue', badge: assignments.filter(a => a.status === 'overdue').length.toString() }
              ]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Filters and Controls */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
              <Input
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon="Search"
              />
              <Select
                placeholder="Filter by status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                options={[
                  { value: '', label: 'All Status' },
                  { value: 'published', label: 'Published' },
                  { value: 'draft', label: 'Draft' },
                  { value: 'graded', label: 'Graded' },
                  { value: 'overdue', label: 'Overdue' }
                ]}
              />
              <Select
                placeholder="Filter by type"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                options={[
                  { value: '', label: 'All Types' },
                  { value: 'homework', label: 'Homework' },
                  { value: 'project', label: 'Project' },
                  { value: 'quiz', label: 'Quiz' },
                  { value: 'exam', label: 'Exam' },
                  { value: 'essay', label: 'Essay' }
                ]}
              />
              <Select
                placeholder="Filter by course"
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                options={[
                  { value: '', label: 'All Courses' },
                  ...courses.map(course => ({ value: course.id, label: course.title }))
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
                  variant={viewMode === 'cards' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                  className="flex-1"
                >
                  <Icons.LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="flex-1"
                >
                  <Icons.List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Assignments Display */}
          <div className="p-6">
            {viewMode === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                  />
                ))}
              </div>
            ) : (
              <DataTable
                data={filteredAssignments}
                columns={tableColumns}
                sortable
                pagination
                pageSize={10}
              />
            )}
            
            {filteredAssignments.length === 0 && (
              <div className="text-center py-12">
                <Icons.FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No assignments found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search or filters, or create a new assignment.
                </p>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                  Create Assignment
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Create Assignment Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Create New Assignment"
          size="xl"
          actions={
            <>
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Save as Draft
              </Button>
              <Button variant="primary">
                Publish Assignment
              </Button>
            </>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input label="Assignment Title" placeholder="Enter assignment title" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter assignment description and instructions..."
                required
              />
            </div>
            <Select
              label="Course"
              placeholder="Select course"
              required
              options={courses.map(course => ({ value: course.id, label: course.title }))}
            />
            <Select
              label="Assignment Type"
              placeholder="Select type"
              required
              options={[
                { value: 'homework', label: 'Homework' },
                { value: 'project', label: 'Project' },
                { value: 'quiz', label: 'Quiz' },
                { value: 'exam', label: 'Exam' },
                { value: 'essay', label: 'Essay' }
              ]}
            />
            <Input label="Points" type="number" placeholder="Total points" required />
            <Select
              label="Difficulty"
              placeholder="Select difficulty"
              required
              options={[
                { value: 'easy', label: 'Easy' },
                { value: 'medium', label: 'Medium' },
                { value: 'hard', label: 'Hard' }
              ]}
            />
            <Input label="Due Date" type="datetime-local" required />
            <Input label="Estimated Time" placeholder="e.g., 2-3 hours" />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Attachments
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-6 text-center">
                <Icons.Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Drop files here or <span className="text-blue-600 cursor-pointer">browse</span>
                </p>
              </div>
            </div>
          </div>
        </Modal>

        {/* Assignment Details Modal */}
        <Modal
          isOpen={!!selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
          title={selectedAssignment ? `${selectedAssignment.title} - Assignment Details` : ''}
          size="xl"
        >
          {selectedAssignment && (
            <div className="space-y-6">
              {/* Assignment Header */}
              <div className="flex items-start justify-between pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(selectedAssignment.status)}`}>
                      {selectedAssignment.status}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-800">
                      {selectedAssignment.type}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyColor(selectedAssignment.difficulty)}`}>
                      {selectedAssignment.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedAssignment.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {selectedAssignment.description}
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Icons.BookOpen className="w-4 h-4" />
                      <span>{selectedAssignment.course.title}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icons.User className="w-4 h-4" />
                      <span>{selectedAssignment.instructor.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icons.Calendar className="w-4 h-4" />
                      <span>Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedAssignment.points} pts
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedAssignment.estimatedTime}
                  </p>
                </div>
              </div>

              {/* Submission Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedAssignment.submissions.total}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {selectedAssignment.submissions.submitted}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Submitted</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {selectedAssignment.submissions.graded}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Graded</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {selectedAssignment.submissions.pending}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                </div>
              </div>

              {/* Average Grade */}
              {selectedAssignment.averageGrade && (
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="font-medium text-gray-900 dark:text-white">Average Grade</span>
                  <span className="text-2xl font-bold text-green-600">
                    {selectedAssignment.averageGrade.toFixed(1)}%
                  </span>
                </div>
              )}

              {/* Attachments */}
              {selectedAssignment.attachments && selectedAssignment.attachments.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Attachments</h4>
                  <div className="space-y-2">
                    {selectedAssignment.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Icons.Paperclip className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{attachment}</span>
                        <Button variant="outline" size="sm">
                          <Icons.Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-3">
                  <Button variant="outline">
                    <Icons.Edit className="w-4 h-4 mr-2" />
                    Edit Assignment
                  </Button>
                  <Button variant="outline">
                    <Icons.Eye className="w-4 h-4 mr-2" />
                    View Submissions
                  </Button>
                </div>
                <div className="flex space-x-3">
                  {selectedAssignment.status === 'draft' && (
                    <Button variant="primary">
                      Publish Assignment
                    </Button>
                  )}
                  <Button variant="outline">
                    <Icons.Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AssignmentsPage;