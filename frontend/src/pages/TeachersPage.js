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
      {/* Floating teacher-themed icons with CSS animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 text-6xl opacity-30" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}>👩‍🏫</div>
        <div className="absolute top-40 left-10 text-7xl opacity-30" style={{animation: 'bounce 1s infinite'}}>📚</div>
        <div className="absolute bottom-40 right-10 text-6xl opacity-30" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}>🍎</div>
        <div className="absolute top-60 right-40 text-5xl opacity-30" style={{animation: 'bounce 1s infinite'}}>📝</div>
        <div className="absolute bottom-20 left-20 text-6xl opacity-30" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}>🏫</div>
        <div className="absolute top-80 left-1/3 text-7xl opacity-30" style={{animation: 'bounce 1s infinite'}}>🎓</div>
        <div className="absolute bottom-60 right-1/4 text-5xl opacity-30" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}>✨</div>
        <div className="absolute top-32 left-1/2 text-6xl opacity-30" style={{animation: 'bounce 1s infinite'}}>🎆</div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-6xl font-black mb-3">
            <span className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text animate-pulse">
              🎆 Amazing Teachers! 🎓
            </span>
          </h1>
          <p className="text-xl text-gray-700 font-semibold">Our superhero educators making learning magical every day!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-blue-200 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Teachers</p>
                <p className="text-3xl font-bold text-blue-600">8</p>
              </div>
              <div className="text-5xl">👩‍🏫</div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-green-200 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-3xl font-bold text-green-600">4.7 ⭐</p>
              </div>
              <div className="text-5xl">🌟</div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-yellow-200 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Student-Teacher Ratio</p>
                <p className="text-3xl font-bold text-yellow-600">1:1</p>
              </div>
              <div className="text-5xl">🤝</div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-purple-200 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-3xl font-bold text-purple-600">5</p>
              </div>
              <div className="text-5xl">🏫</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-orange-200 mb-8">
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
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg">
              🎆 Add Teacher
            </button>
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 border-2 border-purple-100">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center shadow-lg">
                    <span className="text-lg font-bold text-white">
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
                    <span className="text-yellow-500 font-bold text-lg">⭐ {teacher.rating}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Subjects:</p>
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map((subject, index) => (
                      <span key={index} className="px-3 py-1 text-xs bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-full font-bold shadow-md">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-full font-bold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-md">
                    👁️ Profile
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gradient-to-r from-green-400 to-blue-400 text-white text-sm rounded-full font-bold hover:from-green-500 hover:to-blue-500 transition-all transform hover:scale-105 shadow-md">
                    📅 Schedule
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