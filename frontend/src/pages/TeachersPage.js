import React, { useState } from 'react';

const TeachersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const teachers = [
    { id: 1, name: 'Dr. Deepak Rayamajhi', department: 'Mathematics', email: 'deepak.rayamajhi@edumaster.com', subjects: ['Algebra', 'Calculus'], students: 25, rating: 4.8 },
    { id: 2, name: 'Dr. Akshay Niraula', department: 'Science', email: 'akshay.niraula@edumaster.com', subjects: ['Physics', 'Chemistry'], students: 18, rating: 4.6 },
    { id: 3, name: 'Dr. Rajesh Rajchal', department: 'English', email: 'rajesh.rajchal@edumaster.com', subjects: ['Literature', 'Writing'], students: 22, rating: 4.9 },
    { id: 4, name: 'Dr. Baburam Aryal', department: 'History', email: 'baburam.aryal@edumaster.com', subjects: ['World History', 'Geography'], students: 15, rating: 4.5 },
    { id: 5, name: 'Dr. Rabindra', department: 'Mathematics', email: 'rabindra@edumaster.com', subjects: ['Geometry', 'Statistics'], students: 20, rating: 4.7 },
    { id: 6, name: 'Dr. Satish Raj Upadhyaya', department: 'Science', email: 'satish.upadhyaya@edumaster.com', subjects: ['Biology', 'Environmental Science'], students: 19, rating: 4.8 },
    { id: 7, name: 'Dr. Uttam Adhikari', department: 'Computer Science', email: 'uttam.adhikari@edumaster.com', subjects: ['Programming', 'Data Structures'], students: 16, rating: 4.9 },
    { id: 8, name: 'Nimesh Kumar', department: 'Mathematics', email: 'nimesh.kumar@edumaster.com', subjects: ['Trigonometry', 'Pre-Calculus'], students: 21, rating: 4.7 },
  ];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDepartment === 'all' || teacher.department === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  return (
    <div 
      className="min-h-screen relative p-8"
      style={{
        background: `
          linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%),
          url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJ0ZWFjaGVycyIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPgogICAgICA8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0IiBmaWxsPSJyZ2JhKDM0LCAxOTcsIDk0LCAwLjE1KSIvPgogICAgICA8Y2lyY2xlIGN4PSI3MCIgY3k9IjcwIiByPSIzIiBmaWxsPSJyZ2JhKDU5LCAxMzAsIDI0NiwgMC4xNSkiLz4KICAgICAgPHRleHQgeD0iMTAiIHk9IjcwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9InJnYmEoMzQsIDE5NywgOTQsIDAuMSkiPvCfkak8L3RleHQ+CiAgICA8L3BhdHRlcm4+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjdGVhY2hlcnMpIi8+Cjwvc3ZnPg==') repeat
        `
      }}
    >
      {/* Floating teacher-themed icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 text-4xl opacity-15 animate-pulse">👩‍🏫</div>
        <div className="absolute top-40 left-10 text-5xl opacity-15 animate-bounce">📚</div>
        <div className="absolute bottom-40 right-10 text-4xl opacity-15 animate-pulse">🍎</div>
        <div className="absolute top-60 right-40 text-3xl opacity-15 animate-bounce">📝</div>
        <div className="absolute bottom-20 left-20 text-4xl opacity-15 animate-pulse">🏫</div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teachers Management</h1>
          <p className="mt-2 text-gray-600">Manage faculty members, assignments, and performance metrics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Teachers</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-green-600">4.7/5.0</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Student-Teacher Ratio</p>
                <p className="text-2xl font-bold text-yellow-600">1:1</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-purple-600">5</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search teachers by name or email..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
              <option value="Computer Science">Computer Science</option>
            </select>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              + Add Teacher
            </button>
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600">
                      {teacher.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{teacher.name}</h3>
                    <p className="text-sm text-gray-600">{teacher.department}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Email:</span>
                    <span className="text-gray-900">{teacher.email}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Students:</span>
                    <span className="text-gray-900">{teacher.students}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Rating:</span>
                    <span className="text-yellow-600 font-medium">★ {teacher.rating}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Subjects:</p>
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map((subject, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    View Profile
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300">
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeachersPage;