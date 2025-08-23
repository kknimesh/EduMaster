import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Avatar from '../components/ui/Avatar';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import Tabs from '../components/navigation/Tabs';
import StatCard from '../components/charts/StatCard';
import { BarChart } from '../components/charts/AdvancedChart';
import { Icons } from '../assets/icons';

interface Teacher {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subject: string[];
  department: string;
  joinDate: string;
  phone: string;
  status: 'active' | 'inactive' | 'on-leave';
  experience: number;
  education: string;
  courses: {
    id: string;
    name: string;
    students: number;
  }[];
  rating: number;
  totalRatings: number;
  salary: number;
  teachingLoad: number; // hours per week
}

const TeachersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  // Sample teachers data
  const teachers: Teacher[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@edumaster.com',
      avatar: '',
      subject: ['Mathematics', 'Statistics'],
      department: 'Mathematics',
      joinDate: '2019-08-15',
      phone: '+1 (555) 123-4567',
      status: 'active',
      experience: 8,
      education: 'Ph.D. Mathematics, Stanford University',
      courses: [
        { id: '1', name: 'Advanced Calculus', students: 32 },
        { id: '2', name: 'Statistics 101', students: 45 },
        { id: '3', name: 'Linear Algebra', students: 28 }
      ],
      rating: 4.8,
      totalRatings: 156,
      salary: 75000,
      teachingLoad: 20
    },
    {
      id: '2',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@edumaster.com',
      avatar: '',
      subject: ['Physics', 'Astronomy'],
      department: 'Science',
      joinDate: '2020-01-10',
      phone: '+1 (555) 234-5678',
      status: 'active',
      experience: 12,
      education: 'Ph.D. Physics, MIT',
      courses: [
        { id: '4', name: 'Physics 101', students: 38 },
        { id: '5', name: 'Quantum Mechanics', students: 25 },
        { id: '6', name: 'Astrophysics', students: 20 }
      ],
      rating: 4.6,
      totalRatings: 98,
      salary: 82000,
      teachingLoad: 18
    },
    {
      id: '3',
      name: 'Ms. Emily Rodriguez',
      email: 'emily.rodriguez@edumaster.com',
      avatar: '',
      subject: ['English Literature', 'Creative Writing'],
      department: 'English',
      joinDate: '2021-09-01',
      phone: '+1 (555) 345-6789',
      status: 'active',
      experience: 6,
      education: 'M.A. English Literature, Harvard University',
      courses: [
        { id: '7', name: 'English Literature', students: 42 },
        { id: '8', name: 'Creative Writing', students: 18 },
        { id: '9', name: 'Poetry Analysis', students: 24 }
      ],
      rating: 4.9,
      totalRatings: 87,
      salary: 68000,
      teachingLoad: 22
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      email: 'james.wilson@edumaster.com',
      avatar: '',
      subject: ['Chemistry', 'Biochemistry'],
      department: 'Science',
      joinDate: '2018-03-15',
      phone: '+1 (555) 456-7890',
      status: 'on-leave',
      experience: 15,
      education: 'Ph.D. Chemistry, Caltech',
      courses: [
        { id: '10', name: 'Organic Chemistry', students: 35 },
        { id: '11', name: 'Biochemistry', students: 29 }
      ],
      rating: 4.5,
      totalRatings: 112,
      salary: 79000,
      teachingLoad: 16
    },
    {
      id: '5',
      name: 'Ms. Lisa Thompson',
      email: 'lisa.thompson@edumaster.com',
      avatar: '',
      subject: ['World History', 'Geography'],
      department: 'Social Studies',
      joinDate: '2022-08-20',
      phone: '+1 (555) 567-8901',
      status: 'active',
      experience: 4,
      education: 'M.A. History, UCLA',
      courses: [
        { id: '12', name: 'World History', students: 48 },
        { id: '13', name: 'Geography', students: 36 },
        { id: '14', name: 'Ancient Civilizations', students: 31 }
      ],
      rating: 4.7,
      totalRatings: 64,
      salary: 62000,
      teachingLoad: 24
    }
  ];

  // Filter teachers
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = !filterDepartment || teacher.department === filterDepartment;
    const matchesStatus = !filterStatus || teacher.status === filterStatus;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && teacher.status === 'active') ||
                      (activeTab === 'experienced' && teacher.experience >= 10) ||
                      (activeTab === 'high-rated' && teacher.rating >= 4.7);
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const departments = Array.from(new Set(teachers.map(t => t.department)));
  
  // Calculate stats
  const totalStudents = teachers.reduce((acc, teacher) => 
    acc + teacher.courses.reduce((courseAcc, course) => courseAcc + course.students, 0), 0
  );

  const averageRating = teachers.reduce((acc, teacher) => acc + teacher.rating, 0) / teachers.length;

  const departmentData = departments.map(dept => ({
    label: dept,
    value: teachers.filter(t => t.department === dept).length,
    color: dept === 'Mathematics' ? '#3b82f6' :
           dept === 'Science' ? '#10b981' :
           dept === 'English' ? '#f59e0b' :
           dept === 'Social Studies' ? '#8b5cf6' : '#6b7280'
  }));

  const tableColumns = [
    { 
      key: 'name', 
      title: 'Teacher', 
      sortable: true,
      render: (teacher: Teacher) => (
        <div className="flex items-center space-x-3">
          <Avatar name={teacher.name} src={teacher.avatar} size="sm" />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{teacher.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{teacher.email}</div>
          </div>
        </div>
      )
    },
    { 
      key: 'department', 
      title: 'Department', 
      sortable: true,
      render: (teacher: Teacher) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{teacher.department}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {teacher.subject.join(', ')}
          </div>
        </div>
      )
    },
    { 
      key: 'experience', 
      title: 'Experience', 
      sortable: true, 
      align: 'center' as const,
      render: (teacher: Teacher) => (
        <div className="text-center">
          <div className="font-medium text-gray-900 dark:text-white">{teacher.experience}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">years</div>
        </div>
      )
    },
    { 
      key: 'rating', 
      title: 'Rating', 
      sortable: true, 
      align: 'center' as const,
      render: (teacher: Teacher) => (
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1">
            <Icons.Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium text-gray-900 dark:text-white">{teacher.rating}</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {teacher.totalRatings} reviews
          </div>
        </div>
      )
    },
    { 
      key: 'courses', 
      title: 'Courses', 
      sortable: true, 
      align: 'center' as const,
      render: (teacher: Teacher) => (
        <div className="text-center">
          <div className="font-medium text-gray-900 dark:text-white">{teacher.courses.length}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {teacher.courses.reduce((acc, course) => acc + course.students, 0)} students
          </div>
        </div>
      )
    },
    { 
      key: 'status', 
      title: 'Status', 
      sortable: true,
      render: (teacher: Teacher) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(teacher.status)}`}>
          {teacher.status.replace('-', ' ')}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (teacher: Teacher) => (
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSelectedTeacher(teacher)}
          >
            View
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              console.log('Edit teacher:', teacher.id);
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
              Teachers
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage faculty and staff information
            </p>
          </div>
          <Button 
            variant="primary" 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2"
          >
            <Icons.UserPlus className="w-5 h-5" />
            <span>Add Teacher</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Teachers"
            value={teachers.length.toString()}
            change={{ value: 2, type: 'increase', period: 'this month' }}
            icon="Users"
            color="blue"
          />
          <StatCard
            title="Active Teachers"
            value={teachers.filter(t => t.status === 'active').length.toString()}
            change={{ value: 5, type: 'increase', period: 'this semester' }}
            icon="CheckCircle"
            color="green"
          />
          <StatCard
            title="Total Students"
            value={totalStudents.toString()}
            change={{ value: 12, type: 'increase', period: 'this week' }}
            icon="GraduationCap"
            color="purple"
          />
          <StatCard
            title="Avg Rating"
            value={averageRating.toFixed(1)}
            change={{ value: 0.2, type: 'increase', period: 'this month' }}
            icon="Star"
            color="yellow"
          />
        </div>

        {/* Department Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Teachers by Department
              </h2>
              <BarChart data={departmentData} />
            </Card>
          </div>
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Quick Stats
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icons.Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Avg Experience</span>
                </div>
                <span className="text-lg font-bold text-blue-600">
                  {Math.round(teachers.reduce((acc, t) => acc + t.experience, 0) / teachers.length)} years
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icons.BookOpen className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Total Courses</span>
                </div>
                <span className="text-lg font-bold text-green-600">
                  {teachers.reduce((acc, t) => acc + t.courses.length, 0)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icons.TrendingUp className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Avg Teaching Load</span>
                </div>
                <span className="text-lg font-bold text-purple-600">
                  {Math.round(teachers.reduce((acc, t) => acc + t.teachingLoad, 0) / teachers.length)}h/week
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
                { id: 'all', label: 'All Teachers', badge: teachers.length.toString() },
                { id: 'active', label: 'Active', badge: teachers.filter(t => t.status === 'active').length.toString() },
                { id: 'experienced', label: 'Experienced', badge: teachers.filter(t => t.experience >= 10).length.toString() },
                { id: 'high-rated', label: 'Top Rated', badge: teachers.filter(t => t.rating >= 4.7).length.toString() }
              ]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon="Search"
              />
              <Select
                placeholder="Filter by department"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                options={[
                  { value: '', label: 'All Departments' },
                  ...departments.map(dept => ({ value: dept, label: dept }))
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
                  { value: 'on-leave', label: 'On Leave' }
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

          {/* Teachers Table */}
          <div className="p-6">
            <DataTable
              data={filteredTeachers}
              columns={tableColumns}
              sortable
              pagination
              pageSize={10}
            />
          </div>
        </Card>

        {/* Add Teacher Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New Teacher"
          size="lg"
          actions={
            <>
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button variant="primary">
                Add Teacher
              </Button>
            </>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" placeholder="Enter teacher name" required />
            <Input label="Email" type="email" placeholder="Enter email address" required />
            <Input label="Phone" type="tel" placeholder="Enter phone number" required />
            <Select
              label="Department"
              placeholder="Select department"
              required
              options={departments.map(dept => ({ value: dept, label: dept }))}
            />
            <Input label="Experience (years)" type="number" placeholder="Years of experience" required />
            <Select
              label="Status"
              placeholder="Select status"
              required
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'on-leave', label: 'On Leave' }
              ]}
            />
            <div className="md:col-span-2">
              <Input label="Education Background" placeholder="Enter education details" required />
            </div>
            <div className="md:col-span-2">
              <Input label="Subjects" placeholder="Enter subjects (comma separated)" required />
            </div>
            <Input label="Join Date" type="date" required />
            <Input label="Teaching Load (hours/week)" type="number" placeholder="Weekly hours" required />
          </div>
        </Modal>

        {/* Teacher Details Modal */}
        <Modal
          isOpen={!!selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
          title={selectedTeacher ? `${selectedTeacher.name} - Teacher Profile` : ''}
          size="xl"
        >
          {selectedTeacher && (
            <div className="space-y-6">
              {/* Teacher Header */}
              <div className="flex items-center space-x-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                <Avatar name={selectedTeacher.name} src={selectedTeacher.avatar} size="xl" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedTeacher.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedTeacher.email}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(selectedTeacher.status)}`}>
                      {selectedTeacher.status.replace('-', ' ')}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedTeacher.department} • {selectedTeacher.experience} years experience
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Icons.Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedTeacher.rating}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedTeacher.totalRatings} reviews
                  </p>
                </div>
              </div>

              {/* Teacher Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Professional Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Department:</span>
                      <span className="text-gray-900 dark:text-white">{selectedTeacher.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Experience:</span>
                      <span className="text-gray-900 dark:text-white">{selectedTeacher.experience} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Teaching Load:</span>
                      <span className="text-gray-900 dark:text-white">{selectedTeacher.teachingLoad} hours/week</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Join Date:</span>
                      <span className="text-gray-900 dark:text-white">
                        {new Date(selectedTeacher.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Salary:</span>
                      <span className="text-gray-900 dark:text-white">
                        ${selectedTeacher.salary.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Email:</span>
                      <span className="text-gray-900 dark:text-white">{selectedTeacher.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                      <span className="text-gray-900 dark:text-white">{selectedTeacher.phone}</span>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3 mt-6">Education</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedTeacher.education}</p>
                </div>
              </div>

              {/* Subjects */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Teaching Subjects</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {selectedTeacher.subject.map((subject, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full text-center"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Current Courses */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Current Courses</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedTeacher.courses.map((course) => (
                    <div key={course.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 dark:text-white">{course.name}</h5>
                      <div className="flex items-center space-x-2 mt-2">
                        <Icons.Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {course.students} students enrolled
                        </span>
                      </div>
                    </div>
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

export default TeachersPage;