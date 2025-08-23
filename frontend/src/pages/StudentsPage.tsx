import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Avatar from '../components/ui/Avatar';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import Tabs from '../components/navigation/Tabs';
import GradeDisplay from '../components/education/GradeDisplay';
import ProgressIndicator from '../components/education/ProgressIndicator';
import { Icons } from '../assets/icons';

interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  grade: string;
  age: number;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated';
  averageGrade: number;
  courses: string[];
  attendance: number;
  assignments: {
    completed: number;
    total: number;
  };
}

const StudentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Sample students data
  const students: Student[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice.johnson@student.edu',
      avatar: '',
      grade: '10th Grade',
      age: 16,
      parentName: 'Mary Johnson',
      parentEmail: 'mary.johnson@gmail.com',
      parentPhone: '+1 (555) 123-4567',
      enrollmentDate: '2023-09-01',
      status: 'active',
      averageGrade: 92.5,
      courses: ['Mathematics', 'Physics', 'Chemistry', 'English'],
      attendance: 95,
      assignments: { completed: 28, total: 30 }
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob.smith@student.edu',
      avatar: '',
      grade: '11th Grade',
      age: 17,
      parentName: 'John Smith',
      parentEmail: 'john.smith@gmail.com',
      parentPhone: '+1 (555) 234-5678',
      enrollmentDate: '2022-09-01',
      status: 'active',
      averageGrade: 88.2,
      courses: ['Biology', 'Chemistry', 'English', 'History'],
      attendance: 89,
      assignments: { completed: 24, total: 27 }
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol.davis@student.edu',
      avatar: '',
      grade: '12th Grade',
      age: 18,
      parentName: 'Linda Davis',
      parentEmail: 'linda.davis@gmail.com',
      parentPhone: '+1 (555) 345-6789',
      enrollmentDate: '2021-09-01',
      status: 'active',
      averageGrade: 95.8,
      courses: ['Advanced Mathematics', 'Physics', 'Computer Science', 'English'],
      attendance: 98,
      assignments: { completed: 32, total: 33 }
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david.wilson@student.edu',
      avatar: '',
      grade: '9th Grade',
      age: 15,
      parentName: 'Robert Wilson',
      parentEmail: 'robert.wilson@gmail.com',
      parentPhone: '+1 (555) 456-7890',
      enrollmentDate: '2024-09-01',
      status: 'active',
      averageGrade: 85.4,
      courses: ['Algebra', 'Biology', 'English', 'World History'],
      attendance: 92,
      assignments: { completed: 18, total: 22 }
    },
    {
      id: '5',
      name: 'Emma Brown',
      email: 'emma.brown@student.edu',
      avatar: '',
      grade: '10th Grade',
      age: 16,
      parentName: 'Sarah Brown',
      parentEmail: 'sarah.brown@gmail.com',
      parentPhone: '+1 (555) 567-8901',
      enrollmentDate: '2023-09-01',
      status: 'inactive',
      averageGrade: 78.9,
      courses: ['Geometry', 'Chemistry', 'English', 'Art'],
      attendance: 76,
      assignments: { completed: 15, total: 25 }
    }
  ];

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = !filterGrade || student.grade === filterGrade;
    const matchesStatus = !filterStatus || student.status === filterStatus;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && student.status === 'active') ||
                      (activeTab === 'inactive' && student.status === 'inactive') ||
                      (activeTab === 'top-performers' && student.averageGrade >= 90);
    
    return matchesSearch && matchesGrade && matchesStatus && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'graduated': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tableColumns = [
    { 
      key: 'name', 
      title: 'Student', 
      sortable: true,
      render: (student: Student) => (
        <div className="flex items-center space-x-3">
          <Avatar name={student.name} src={student.avatar} size="sm" />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{student.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{student.email}</div>
          </div>
        </div>
      )
    },
    { 
      key: 'grade', 
      title: 'Grade', 
      sortable: true,
      render: (student: Student) => (
        <span className="font-medium text-gray-900 dark:text-white">{student.grade}</span>
      )
    },
    { 
      key: 'averageGrade', 
      title: 'Average', 
      sortable: true, 
      align: 'center' as const,
      render: (student: Student) => (
        <GradeDisplay 
          grade={{ percentage: student.averageGrade }} 
          variant="compact" 
        />
      )
    },
    { 
      key: 'attendance', 
      title: 'Attendance', 
      sortable: true, 
      align: 'center' as const,
      render: (student: Student) => (
        <div className="text-center">
          <div className="font-medium text-gray-900 dark:text-white">{student.attendance}%</div>
          <div className="w-12 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mx-auto">
            <div 
              className={`h-1.5 rounded-full ${student.attendance >= 95 ? 'bg-green-500' : 
                          student.attendance >= 85 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${student.attendance}%` }}
            />
          </div>
        </div>
      )
    },
    { 
      key: 'status', 
      title: 'Status', 
      sortable: true,
      render: (student: Student) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(student.status)}`}>
          {student.status}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (student: Student) => (
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSelectedStudent(student)}
          >
            View
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              // Handle edit
              console.log('Edit student:', student.id);
            }}
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
              Students
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage and monitor student performance and information
            </p>
          </div>
          <Button 
            variant="primary" 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2"
          >
            <Icons.UserPlus className="w-5 h-5" />
            <span>Add Student</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Icons.Users className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{students.length}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Icons.CheckCircle className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {students.filter(s => s.status === 'active').length}
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <Icons.TrendingUp className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Grade</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(students.reduce((acc, s) => acc + s.averageGrade, 0) / students.length)}%
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Icons.Clock className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Attendance</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)}%
                </p>
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
                { id: 'all', label: 'All Students', badge: students.length.toString() },
                { id: 'active', label: 'Active', badge: students.filter(s => s.status === 'active').length.toString() },
                { id: 'inactive', label: 'Inactive', badge: students.filter(s => s.status === 'inactive').length.toString() },
                { id: 'top-performers', label: 'Top Performers', badge: students.filter(s => s.averageGrade >= 90).length.toString() }
              ]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon="Search"
              />
              <Select
                placeholder="Filter by grade"
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                options={[
                  { value: '', label: 'All Grades' },
                  { value: '9th Grade', label: '9th Grade' },
                  { value: '10th Grade', label: '10th Grade' },
                  { value: '11th Grade', label: '11th Grade' },
                  { value: '12th Grade', label: '12th Grade' }
                ]}
              />
              <Select
                placeholder="Filter by status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                options={[
                  { value: '', label: 'All Status' },
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                  { value: 'graduated', label: 'Graduated' }
                ]}
              />
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <Icons.Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
                <Button variant="outline">
                  <Icons.Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Students Table */}
          <div className="p-6">
            <DataTable
              data={filteredStudents}
              columns={tableColumns}
              sortable
              pagination
              pageSize={10}
            />
          </div>
        </Card>

        {/* Add Student Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New Student"
          size="lg"
          actions={
            <>
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button variant="primary">
                Add Student
              </Button>
            </>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" placeholder="Enter student name" required />
            <Input label="Email" type="email" placeholder="Enter email address" required />
            <Input label="Age" type="number" placeholder="Enter age" required />
            <Select
              label="Grade"
              placeholder="Select grade"
              required
              options={[
                { value: '9th Grade', label: '9th Grade' },
                { value: '10th Grade', label: '10th Grade' },
                { value: '11th Grade', label: '11th Grade' },
                { value: '12th Grade', label: '12th Grade' }
              ]}
            />
            <Input label="Parent Name" placeholder="Enter parent/guardian name" required />
            <Input label="Parent Email" type="email" placeholder="Enter parent email" required />
            <Input label="Parent Phone" type="tel" placeholder="Enter phone number" required />
            <Input label="Enrollment Date" type="date" required />
          </div>
        </Modal>

        {/* Student Details Modal */}
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={selectedStudent ? `${selectedStudent.name} - Student Details` : ''}
          size="xl"
        >
          {selectedStudent && (
            <div className="space-y-6">
              {/* Student Info Header */}
              <div className="flex items-center space-x-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                <Avatar name={selectedStudent.name} src={selectedStudent.avatar} size="xl" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedStudent.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedStudent.email}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(selectedStudent.status)}`}>
                      {selectedStudent.status}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedStudent.grade} • Age {selectedStudent.age}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <GradeDisplay 
                    grade={{ percentage: selectedStudent.averageGrade }} 
                    variant="detailed"
                  />
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <ProgressIndicator 
                    currentProgress={selectedStudent.attendance} 
                    totalProgress={100} 
                    variant="circular"
                    label="Attendance"
                  />
                </div>
                <div className="text-center">
                  <ProgressIndicator 
                    currentProgress={selectedStudent.assignments.completed} 
                    totalProgress={selectedStudent.assignments.total} 
                    variant="circular"
                    label="Assignments"
                  />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {selectedStudent.courses.length}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Enrolled Courses</p>
                </div>
              </div>

              {/* Student Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Academic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Grade Level:</span>
                      <span className="text-gray-900 dark:text-white">{selectedStudent.grade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Average Grade:</span>
                      <span className="text-gray-900 dark:text-white">{selectedStudent.averageGrade}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Attendance:</span>
                      <span className="text-gray-900 dark:text-white">{selectedStudent.attendance}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Enrollment Date:</span>
                      <span className="text-gray-900 dark:text-white">
                        {new Date(selectedStudent.enrollmentDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Parent/Guardian Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Name:</span>
                      <span className="text-gray-900 dark:text-white">{selectedStudent.parentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Email:</span>
                      <span className="text-gray-900 dark:text-white">{selectedStudent.parentEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                      <span className="text-gray-900 dark:text-white">{selectedStudent.parentPhone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enrolled Courses */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Enrolled Courses</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {selectedStudent.courses.map((course, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full text-center"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default StudentsPage;