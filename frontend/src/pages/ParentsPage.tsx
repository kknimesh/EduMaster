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
import GradeDisplay from '../components/education/GradeDisplay';
import ProgressIndicator from '../components/education/ProgressIndicator';
import { DonutChart } from '../components/charts/AdvancedChart';
import { Icons } from '../assets/icons';

interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  relationship: 'mother' | 'father' | 'guardian';
  occupation: string;
  address: string;
  emergencyContact: string;
  registrationDate: string;
  status: 'active' | 'inactive';
  children: {
    id: string;
    name: string;
    grade: string;
    averageGrade: number;
    attendance: number;
    upcomingAssignments: number;
    recentGrades: { subject: string; grade: number; date: string }[];
  }[];
  communicationPreference: 'email' | 'sms' | 'app' | 'call';
  meetingsAttended: number;
  totalMeetingsInvited: number;
}

const ParentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);

  // Sample parents data
  const parents: Parent[] = [
    {
      id: '1',
      name: 'Mary Johnson',
      email: 'mary.johnson@gmail.com',
      phone: '+1 (555) 123-4567',
      avatar: '',
      relationship: 'mother',
      occupation: 'Software Engineer',
      address: '123 Oak Street, Springfield, IL 62701',
      emergencyContact: '+1 (555) 987-6543',
      registrationDate: '2023-08-15',
      status: 'active',
      children: [
        {
          id: '1',
          name: 'Alice Johnson',
          grade: '10th Grade',
          averageGrade: 92.5,
          attendance: 95,
          upcomingAssignments: 3,
          recentGrades: [
            { subject: 'Mathematics', grade: 94, date: '2024-03-15' },
            { subject: 'Physics', grade: 91, date: '2024-03-14' },
            { subject: 'Chemistry', grade: 89, date: '2024-03-13' }
          ]
        }
      ],
      communicationPreference: 'email',
      meetingsAttended: 8,
      totalMeetingsInvited: 10
    },
    {
      id: '2',
      name: 'John Smith',
      email: 'john.smith@gmail.com',
      phone: '+1 (555) 234-5678',
      avatar: '',
      relationship: 'father',
      occupation: 'Marketing Manager',
      address: '456 Pine Avenue, Springfield, IL 62702',
      emergencyContact: '+1 (555) 876-5432',
      registrationDate: '2022-08-20',
      status: 'active',
      children: [
        {
          id: '2',
          name: 'Bob Smith',
          grade: '11th Grade',
          averageGrade: 88.2,
          attendance: 89,
          upcomingAssignments: 2,
          recentGrades: [
            { subject: 'Biology', grade: 87, date: '2024-03-15' },
            { subject: 'Chemistry', grade: 85, date: '2024-03-14' },
            { subject: 'English', grade: 92, date: '2024-03-13' }
          ]
        }
      ],
      communicationPreference: 'app',
      meetingsAttended: 12,
      totalMeetingsInvited: 15
    },
    {
      id: '3',
      name: 'Linda Davis',
      email: 'linda.davis@gmail.com',
      phone: '+1 (555) 345-6789',
      avatar: '',
      relationship: 'mother',
      occupation: 'Nurse',
      address: '789 Elm Street, Springfield, IL 62703',
      emergencyContact: '+1 (555) 765-4321',
      registrationDate: '2021-09-01',
      status: 'active',
      children: [
        {
          id: '3',
          name: 'Carol Davis',
          grade: '12th Grade',
          averageGrade: 95.8,
          attendance: 98,
          upcomingAssignments: 4,
          recentGrades: [
            { subject: 'Advanced Mathematics', grade: 98, date: '2024-03-15' },
            { subject: 'Physics', grade: 96, date: '2024-03-14' },
            { subject: 'Computer Science', grade: 94, date: '2024-03-13' }
          ]
        }
      ],
      communicationPreference: 'sms',
      meetingsAttended: 18,
      totalMeetingsInvited: 20
    },
    {
      id: '4',
      name: 'Robert Wilson',
      email: 'robert.wilson@gmail.com',
      phone: '+1 (555) 456-7890',
      avatar: '',
      relationship: 'father',
      occupation: 'Teacher',
      address: '321 Maple Drive, Springfield, IL 62704',
      emergencyContact: '+1 (555) 654-3210',
      registrationDate: '2024-08-25',
      status: 'active',
      children: [
        {
          id: '4',
          name: 'David Wilson',
          grade: '9th Grade',
          averageGrade: 85.4,
          attendance: 92,
          upcomingAssignments: 5,
          recentGrades: [
            { subject: 'Algebra', grade: 84, date: '2024-03-15' },
            { subject: 'Biology', grade: 88, date: '2024-03-14' },
            { subject: 'English', grade: 86, date: '2024-03-13' }
          ]
        }
      ],
      communicationPreference: 'email',
      meetingsAttended: 3,
      totalMeetingsInvited: 5
    },
    {
      id: '5',
      name: 'Sarah Brown',
      email: 'sarah.brown@gmail.com',
      phone: '+1 (555) 567-8901',
      avatar: '',
      relationship: 'guardian',
      occupation: 'Business Owner',
      address: '654 Cedar Lane, Springfield, IL 62705',
      emergencyContact: '+1 (555) 543-2109',
      registrationDate: '2023-09-10',
      status: 'inactive',
      children: [
        {
          id: '5',
          name: 'Emma Brown',
          grade: '10th Grade',
          averageGrade: 78.9,
          attendance: 76,
          upcomingAssignments: 1,
          recentGrades: [
            { subject: 'Geometry', grade: 76, date: '2024-03-15' },
            { subject: 'Chemistry', grade: 82, date: '2024-03-14' },
            { subject: 'English', grade: 79, date: '2024-03-13' }
          ]
        }
      ],
      communicationPreference: 'call',
      meetingsAttended: 2,
      totalMeetingsInvited: 8
    }
  ];

  // Filter parents
  const filteredParents = parents.filter(parent => {
    const matchesSearch = parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parent.children.some(child => child.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = !filterStatus || parent.status === filterStatus;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && parent.status === 'active') ||
                      (activeTab === 'engaged' && (parent.meetingsAttended / parent.totalMeetingsInvited) >= 0.7) ||
                      (activeTab === 'needs-attention' && parent.children.some(child => child.averageGrade < 80 || child.attendance < 85));
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'mother': return 'bg-pink-100 text-pink-800';
      case 'father': return 'bg-blue-100 text-blue-800';
      case 'guardian': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate engagement stats
  const totalChildren = parents.reduce((acc, parent) => acc + parent.children.length, 0);
  const averageEngagement = parents.reduce((acc, parent) => 
    acc + (parent.meetingsAttended / parent.totalMeetingsInvited), 0) / parents.length * 100;

  const communicationPreferenceData = [
    { label: 'Email', value: parents.filter(p => p.communicationPreference === 'email').length, color: '#3b82f6' },
    { label: 'SMS', value: parents.filter(p => p.communicationPreference === 'sms').length, color: '#10b981' },
    { label: 'App', value: parents.filter(p => p.communicationPreference === 'app').length, color: '#f59e0b' },
    { label: 'Phone Call', value: parents.filter(p => p.communicationPreference === 'call').length, color: '#8b5cf6' }
  ];

  const tableColumns = [
    { 
      key: 'name', 
      title: 'Parent/Guardian', 
      sortable: true,
      render: (parent: Parent) => (
        <div className="flex items-center space-x-3">
          <Avatar name={parent.name} src={parent.avatar} size="sm" />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{parent.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{parent.email}</div>
          </div>
        </div>
      )
    },
    { 
      key: 'relationship', 
      title: 'Relationship', 
      sortable: true,
      render: (parent: Parent) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getRelationshipColor(parent.relationship)}`}>
          {parent.relationship}
        </span>
      )
    },
    { 
      key: 'children', 
      title: 'Children', 
      render: (parent: Parent) => (
        <div>
          {parent.children.map((child, index) => (
            <div key={index} className="text-sm">
              <div className="font-medium text-gray-900 dark:text-white">{child.name}</div>
              <div className="text-gray-500 dark:text-gray-400">{child.grade}</div>
            </div>
          ))}
        </div>
      )
    },
    { 
      key: 'engagement', 
      title: 'Engagement', 
      sortable: true, 
      align: 'center' as const,
      render: (parent: Parent) => {
        const engagementRate = (parent.meetingsAttended / parent.totalMeetingsInvited) * 100;
        return (
          <div className="text-center">
            <div className="font-medium text-gray-900 dark:text-white">{Math.round(engagementRate)}%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {parent.meetingsAttended}/{parent.totalMeetingsInvited} meetings
            </div>
            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mx-auto mt-1">
              <div 
                className={`h-1.5 rounded-full ${engagementRate >= 80 ? 'bg-green-500' : 
                            engagementRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${engagementRate}%` }}
              />
            </div>
          </div>
        );
      }
    },
    { 
      key: 'communication', 
      title: 'Preference', 
      render: (parent: Parent) => (
        <div className="flex items-center space-x-2">
          {parent.communicationPreference === 'email' && <Icons.Mail className="w-4 h-4 text-blue-600" />}
          {parent.communicationPreference === 'sms' && <Icons.MessageSquare className="w-4 h-4 text-green-600" />}
          {parent.communicationPreference === 'app' && <Icons.Smartphone className="w-4 h-4 text-orange-600" />}
          {parent.communicationPreference === 'call' && <Icons.Phone className="w-4 h-4 text-purple-600" />}
          <span className="text-sm text-gray-900 dark:text-white capitalize">
            {parent.communicationPreference}
          </span>
        </div>
      )
    },
    { 
      key: 'status', 
      title: 'Status', 
      sortable: true,
      render: (parent: Parent) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(parent.status)}`}>
          {parent.status}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (parent: Parent) => (
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSelectedParent(parent)}
          >
            View
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setSelectedParent(parent);
              setShowMessageModal(true);
            }}
          >
            <Icons.MessageSquare className="w-4 h-4" />
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
              Parents & Guardians
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Connect with families and monitor student progress
            </p>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline"
              onClick={() => setShowMessageModal(true)}
              className="flex items-center space-x-2"
            >
              <Icons.MessageSquare className="w-5 h-5" />
              <span>Send Message</span>
            </Button>
            <Button 
              variant="primary" 
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2"
            >
              <Icons.UserPlus className="w-5 h-5" />
              <span>Add Parent</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Parents"
            value={parents.length.toString()}
            change={{ value: 3, type: 'increase', period: 'this month' }}
            icon="Heart"
            color="pink"
          />
          <StatCard
            title="Active Parents"
            value={parents.filter(p => p.status === 'active').length.toString()}
            change={{ value: 2, type: 'increase', period: 'this week' }}
            icon="CheckCircle"
            color="green"
          />
          <StatCard
            title="Total Children"
            value={totalChildren.toString()}
            change={{ value: 5, type: 'increase', period: 'this semester' }}
            icon="Users"
            color="blue"
          />
          <StatCard
            title="Avg Engagement"
            value={`${Math.round(averageEngagement)}%`}
            change={{ value: 8, type: 'increase', period: 'this quarter' }}
            icon="TrendingUp"
            color="purple"
          />
        </div>

        {/* Communication Preferences & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Communication Preferences
            </h2>
            <DonutChart data={communicationPreferenceData} />
            <div className="mt-4 space-y-2">
              {communicationPreferenceData.map((item, index) => (
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
              Engagement Metrics
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icons.Calendar className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">High Engagement</span>
                </div>
                <span className="text-lg font-bold text-green-600">
                  {parents.filter(p => (p.meetingsAttended / p.totalMeetingsInvited) >= 0.8).length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icons.AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Medium Engagement</span>
                </div>
                <span className="text-lg font-bold text-yellow-600">
                  {parents.filter(p => {
                    const rate = p.meetingsAttended / p.totalMeetingsInvited;
                    return rate >= 0.5 && rate < 0.8;
                  }).length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icons.AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Low Engagement</span>
                </div>
                <span className="text-lg font-bold text-red-600">
                  {parents.filter(p => (p.meetingsAttended / p.totalMeetingsInvited) < 0.5).length}
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Recent Activities
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <Icons.MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Parent-teacher conference scheduled
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                <Icons.CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Progress report sent to Mary Johnson
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                <Icons.AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Attendance alert sent to Sarah Brown
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                </div>
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
                { id: 'all', label: 'All Parents', badge: parents.length.toString() },
                { id: 'active', label: 'Active', badge: parents.filter(p => p.status === 'active').length.toString() },
                { id: 'engaged', label: 'Highly Engaged', badge: parents.filter(p => (p.meetingsAttended / p.totalMeetingsInvited) >= 0.7).length.toString() },
                { id: 'needs-attention', label: 'Needs Attention', badge: parents.filter(p => p.children.some(child => child.averageGrade < 80 || child.attendance < 85)).length.toString() }
              ]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search parents or children..."
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
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' }
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
              <Button variant="primary" className="flex items-center space-x-2">
                <Icons.Send className="w-4 h-4" />
                <span>Send Bulk Message</span>
              </Button>
            </div>
          </div>

          {/* Parents Table */}
          <div className="p-6">
            <DataTable
              data={filteredParents}
              columns={tableColumns}
              sortable
              pagination
              pageSize={10}
            />
          </div>
        </Card>

        {/* Add Parent Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New Parent/Guardian"
          size="lg"
          actions={
            <>
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button variant="primary">
                Add Parent
              </Button>
            </>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" placeholder="Enter parent/guardian name" required />
            <Input label="Email" type="email" placeholder="Enter email address" required />
            <Input label="Phone" type="tel" placeholder="Enter phone number" required />
            <Select
              label="Relationship"
              placeholder="Select relationship"
              required
              options={[
                { value: 'mother', label: 'Mother' },
                { value: 'father', label: 'Father' },
                { value: 'guardian', label: 'Guardian' }
              ]}
            />
            <Input label="Occupation" placeholder="Enter occupation" />
            <Input label="Emergency Contact" type="tel" placeholder="Emergency contact number" required />
            <div className="md:col-span-2">
              <Input label="Address" placeholder="Enter home address" required />
            </div>
            <Select
              label="Communication Preference"
              placeholder="Preferred communication method"
              required
              options={[
                { value: 'email', label: 'Email' },
                { value: 'sms', label: 'SMS' },
                { value: 'app', label: 'Mobile App' },
                { value: 'call', label: 'Phone Call' }
              ]}
            />
            <Select
              label="Status"
              placeholder="Select status"
              required
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' }
              ]}
            />
          </div>
        </Modal>

        {/* Parent Details Modal */}
        <Modal
          isOpen={!!selectedParent && !showMessageModal}
          onClose={() => setSelectedParent(null)}
          title={selectedParent ? `${selectedParent.name} - Parent Profile` : ''}
          size="xl"
        >
          {selectedParent && !showMessageModal && (
            <div className="space-y-6">
              {/* Parent Header */}
              <div className="flex items-center space-x-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                <Avatar name={selectedParent.name} src={selectedParent.avatar} size="xl" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedParent.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedParent.email}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getRelationshipColor(selectedParent.relationship)}`}>
                      {selectedParent.relationship}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(selectedParent.status)}`}>
                      {selectedParent.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.round((selectedParent.meetingsAttended / selectedParent.totalMeetingsInvited) * 100)}%
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Engagement Rate</p>
                </div>
              </div>

              {/* Parent Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Relationship:</span>
                      <span className="text-gray-900 dark:text-white capitalize">{selectedParent.relationship}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Occupation:</span>
                      <span className="text-gray-900 dark:text-white">{selectedParent.occupation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                      <span className="text-gray-900 dark:text-white">{selectedParent.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Emergency Contact:</span>
                      <span className="text-gray-900 dark:text-white">{selectedParent.emergencyContact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Communication:</span>
                      <span className="text-gray-900 dark:text-white capitalize">{selectedParent.communicationPreference}</span>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3 mt-6">Address</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedParent.address}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Engagement Statistics</h4>
                  <div className="space-y-4">
                    <div className="text-center">
                      <ProgressIndicator 
                        currentProgress={selectedParent.meetingsAttended} 
                        totalProgress={selectedParent.totalMeetingsInvited} 
                        variant="circular"
                        label="Meeting Attendance"
                      />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      Attended {selectedParent.meetingsAttended} out of {selectedParent.totalMeetingsInvited} meetings
                    </div>
                  </div>
                </div>
              </div>

              {/* Children Information */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Children</h4>
                <div className="space-y-4">
                  {selectedParent.children.map((child) => (
                    <div key={child.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">{child.name}</h5>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{child.grade}</p>
                        </div>
                        <GradeDisplay 
                          grade={{ percentage: child.averageGrade }} 
                          variant="detailed"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{child.attendance}%</div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Attendance</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{child.upcomingAssignments}</div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Upcoming Assignments</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{child.recentGrades.length}</div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Recent Grades</p>
                        </div>
                      </div>
                      
                      <div>
                        <h6 className="font-medium text-gray-900 dark:text-white mb-2">Recent Grades</h6>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {child.recentGrades.map((grade, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                              <span className="text-sm text-gray-600 dark:text-gray-400">{grade.subject}</span>
                              <span className="font-medium text-gray-900 dark:text-white">{grade.grade}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Message Modal */}
        <Modal
          isOpen={showMessageModal}
          onClose={() => {
            setShowMessageModal(false);
            setSelectedParent(null);
          }}
          title={selectedParent ? `Send Message to ${selectedParent.name}` : 'Send Message'}
          size="lg"
          actions={
            <>
              <Button variant="outline" onClick={() => {
                setShowMessageModal(false);
                setSelectedParent(null);
              }}>
                Cancel
              </Button>
              <Button variant="primary">
                Send Message
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <Select
              label="Message Type"
              placeholder="Select message type"
              options={[
                { value: 'general', label: 'General Update' },
                { value: 'academic', label: 'Academic Progress' },
                { value: 'behavioral', label: 'Behavioral Notice' },
                { value: 'attendance', label: 'Attendance Alert' },
                { value: 'meeting', label: 'Meeting Request' },
                { value: 'event', label: 'School Event' }
              ]}
              required
            />
            <Input
              label="Subject"
              placeholder="Enter message subject"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your message..."
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="sendCopy" className="rounded" />
              <label htmlFor="sendCopy" className="text-sm text-gray-600 dark:text-gray-400">
                Send a copy to my email
              </label>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ParentsPage;