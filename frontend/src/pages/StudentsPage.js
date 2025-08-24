import React, { useState } from 'react';

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');

  const students = [
    { id: 1, name: 'Vaani Karn', grade: 10, email: 'vaani.karn@edumaster.com', gpa: 3.8, attendance: '95%', status: 'active' },
    { id: 2, name: 'Viaan Karn', grade: 11, email: 'viaan.karn@edumaster.com', gpa: 3.5, attendance: '92%', status: 'active' },
    { id: 3, name: 'Ram Acharya', grade: 9, email: 'ram.acharya@edumaster.com', gpa: 3.9, attendance: '98%', status: 'active' },
    { id: 4, name: 'Sita Gurung', grade: 12, email: 'sita.gurung@edumaster.com', gpa: 3.7, attendance: '90%', status: 'active' },
    { id: 5, name: 'Hari Rai', grade: 10, email: 'hari.rai@edumaster.com', gpa: 4.0, attendance: '99%', status: 'active' },
    { id: 6, name: 'Geeta Majhi', grade: 11, email: 'geeta.majhi@edumaster.com', gpa: 3.3, attendance: '88%', status: 'active' },
    { id: 7, name: 'Mohan Shrestha', grade: 9, email: 'mohan.shrestha@edumaster.com', gpa: 3.6, attendance: '94%', status: 'active' },
    { id: 8, name: 'Laxmi Pandey', grade: 12, email: 'laxmi.pandey@edumaster.com', gpa: 3.9, attendance: '96%', status: 'active' },
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.grade.toString() === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div 
      className="min-h-screen relative p-8"
      style={{
        background: `
          linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%),
          url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJzdHVkZW50cyIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPgogICAgICA8Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSI0IiBmaWxsPSJyZ2JhKDM0LCAxOTcsIDk0LCAwLjEpIi8+CiAgICAgIDxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9IjMiIGZpbGw9InJnYmEoNTksIDEzMCwgMjQ2LCAwLjEpIi8+CiAgICA8L3BhdHRlcm4+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjc3R1ZGVudHMpIi8+Cjwvc3ZnPg==') repeat
        `
      }}
    >
      {/* Floating student-themed icons with CSS animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 text-6xl opacity-30" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}>📚</div>
        <div className="absolute top-40 left-10 text-7xl opacity-30" style={{animation: 'bounce 1s infinite'}}>🎒</div>
        <div className="absolute bottom-40 right-10 text-6xl opacity-30" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}>✏️</div>
        <div className="absolute top-60 right-40 text-5xl opacity-30" style={{animation: 'bounce 1s infinite'}}>📝</div>
        <div className="absolute bottom-20 left-40 text-6xl opacity-30" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}>🎨</div>
        <div className="absolute top-32 left-1/2 text-5xl opacity-30" style={{animation: 'bounce 1s infinite'}}>🌟</div>
        <div className="absolute bottom-60 right-1/3 text-7xl opacity-30" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}>🚀</div>
        <div className="absolute top-80 left-20 text-5xl opacity-30" style={{animation: 'bounce 1s infinite'}}>🎯</div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-6xl font-black mb-3">
            <span className="inline-block bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-transparent bg-clip-text animate-pulse">
              🌈 Student Superstars! 🌟
            </span>
          </h1>
          <p className="text-xl text-gray-700 font-semibold">Track progress, celebrate achievements, and watch students shine!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-blue-200 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-blue-600">8</p>
              </div>
              <div className="text-5xl">👥</div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-green-200 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average GPA</p>
                <p className="text-3xl font-bold text-green-600">3.65</p>
              </div>
              <div className="text-5xl">🏆</div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-yellow-200 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-3xl font-bold text-yellow-600">94.2%</p>
              </div>
              <div className="text-5xl">📅</div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-purple-200 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New This Month</p>
                <p className="text-3xl font-bold text-purple-600">2</p>
              </div>
              <div className="text-5xl">🎉</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-indigo-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search students by name or email..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="all">All Grades</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg">
              ✨ Add Student
            </button>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GPA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center shadow-md">
                          <span className="text-sm font-bold text-white">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">Grade {student.grade}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      student.gpa >= 3.7 ? 'text-green-600' : 
                      student.gpa >= 3.0 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {student.gpa.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{student.attendance}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-gradient-to-r from-green-400 to-blue-400 text-white shadow-md">
                      ⭐ Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3 font-bold hover:scale-110 transition-transform">👁️ View</button>
                    <button className="text-purple-600 hover:text-purple-900 font-bold hover:scale-110 transition-transform">✏️ Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;