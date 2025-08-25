import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const StudentsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [animations, setAnimations] = useState({});

  // Get students data based on user role
  const getStudentsData = () => {
    if (!user) return [];

    if (user.profileType === 'teacher') {
      // Teachers see all students from localStorage
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
      return allUsers
        .filter(u => u.profileType === 'student')
        .map(student => ({
          id: student.id,
          name: `${student.firstName} ${student.lastName}`,
          grade: student.grade || 'N/A',
          email: student.email,
          avatar: student.avatar || '🧒',
          totalXP: student.progress?.totalXP || 0,
          level: student.progress?.level || 1,
          skillLevels: student.progress?.skillLevels || {
            addition: 1,
            subtraction: 1,
            multiplication: 1,
            division: 1,
            fractions: 1,
            algebra: 1
          },
          recentActivity: student.progress?.activityHistory?.length > 0 
            ? student.progress.activityHistory[student.progress.activityHistory.length - 1].activity || 'No recent activity'
            : 'Ready to start learning!',
          badges: student.progress?.badges || [],
          streakDays: student.progress?.streakDays || 0,
          completedLessons: Object.keys(student.progress?.completedAssessments || {}).length,
          timeSpent: `${Math.round((student.progress?.totalXP || 0) / 50)} hours`
        }));
    } else if (user.profileType === 'parent') {
      // Parents see their linked students
      return (user.students || []).map(student => ({
        id: `parent-${user.id}-${student.firstName}-${student.lastName}`,
        name: `${student.firstName} ${student.lastName}`,
        grade: student.grade || 'N/A',
        email: user.email, // Parent's email for contact
        avatar: student.avatar || '🧒',
        totalXP: 0, // Default values for parent-added students
        level: 1,
        skillLevels: {
          addition: 1,
          subtraction: 1,
          multiplication: 1,
          division: 1,
          fractions: 1,
          algebra: 1
        },
        recentActivity: 'Ready to start learning!',
        badges: [],
        streakDays: 0,
        completedLessons: 0,
        timeSpent: '0 hours'
      }));
    } else {
      // Students see only their own data
      return [{
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        grade: user.grade || 'N/A',
        email: user.email,
        avatar: user.avatar || '🧒',
        totalXP: user.progress?.totalXP || 0,
        level: user.progress?.level || 1,
        skillLevels: user.progress?.skillLevels || {
          addition: 1,
          subtraction: 1,
          multiplication: 1,
          division: 1,
          fractions: 1,
          algebra: 1
        },
        recentActivity: user.progress?.activityHistory?.length > 0 
          ? user.progress.activityHistory[user.progress.activityHistory.length - 1].activity || 'No recent activity'
          : 'Ready to start learning!',
        badges: user.progress?.badges || [],
        streakDays: user.progress?.streakDays || 0,
        completedLessons: Object.keys(user.progress?.completedAssessments || {}).length,
        timeSpent: `${Math.round((user.progress?.totalXP || 0) / 50)} hours`
      }];
    }
  };

  const students = getStudentsData();
  const student = students[0]; // For backward compatibility with single student view

  const getSkillColor = (skill) => {
    const colors = {
      addition: 'from-green-400 to-blue-500',
      subtraction: 'from-blue-400 to-purple-500',
      multiplication: 'from-purple-400 to-pink-500',
      division: 'from-pink-400 to-red-500',
      fractions: 'from-yellow-400 to-orange-500',
      algebra: 'from-indigo-400 to-purple-600'
    };
    return colors[skill] || 'from-gray-400 to-gray-500';
  };

  const getSkillIcon = (skill) => {
    const icons = {
      addition: '➕',
      subtraction: '➖',
      multiplication: '✖️',
      division: '➗',
      fractions: '🍰',
      algebra: '📊'
    };
    return icons[skill] || '📚';
  };

  const getLevelColor = (level) => {
    if (level >= 4) return 'text-green-600 bg-green-100';
    if (level >= 3) return 'text-blue-600 bg-blue-100';
    if (level >= 2) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const showAnimation = (studentId, type, data) => {
    const key = `${studentId}-${type}`;
    setAnimations(prev => ({ ...prev, [key]: { type, data, show: true } }));
    setTimeout(() => {
      setAnimations(prev => ({ ...prev, [key]: { ...prev[key], show: false } }));
    }, 3000);
  };

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-8 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl text-center max-w-2xl">
          <div className="text-8xl mb-6">🎓</div>
          <h1 className="text-4xl font-black mb-6 text-gray-800">Students Dashboard</h1>
          <p className="text-xl text-gray-600 mb-8">
            Please log in to access the interactive student dashboard and track learning progress!
          </p>
          <div className="text-6xl mb-4">👥📊</div>
          <p className="text-gray-500">
            View student progress, skill levels, and navigate to learning activities!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 sm:p-6 lg:p-8">
      {/* Floating learning icons - Hidden on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute top-20 right-20 text-4xl sm:text-5xl lg:text-6xl opacity-20" style={{animation: 'pulse 3s infinite'}}>🎯</div>
        <div className="absolute top-40 left-10 text-5xl sm:text-6xl lg:text-7xl opacity-20" style={{animation: 'bounce 2s infinite'}}>📚</div>
        <div className="absolute bottom-40 right-10 text-4xl sm:text-5xl lg:text-6xl opacity-20" style={{animation: 'pulse 2.5s infinite'}}>🏆</div>
        <div className="absolute bottom-20 left-40 text-3xl sm:text-4xl lg:text-5xl opacity-20" style={{animation: 'bounce 3s infinite'}}>⭐</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="text-5xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6">{user?.avatar || '🧒'}</div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-3 sm:mb-4 px-2">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
              Welcome Back, {user?.firstName}!
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-semibold px-4">Track your progress, explore skills, and continue your learning journey!</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1 sm:p-2 shadow-xl border-2 border-blue-200 w-full max-w-md">
            <div className="flex space-x-1 sm:space-x-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex-1 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm lg:text-base font-bold transition-all ${
                  activeTab === 'dashboard' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="hidden sm:inline">📊 Dashboard</span>
                <span className="sm:hidden">📊</span>
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`flex-1 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm lg:text-base font-bold transition-all ${
                  activeTab === 'skills' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="hidden sm:inline">🎯 Skills</span>
                <span className="sm:hidden">🎯</span>
              </button>
              <button
                onClick={() => setActiveTab('activities')}
                className={`flex-1 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm lg:text-base font-bold transition-all ${
                  activeTab === 'activities' 
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="hidden sm:inline">🎮 Activities</span>
                <span className="sm:hidden">🎮</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Role-specific header */}
            {user?.profileType === 'teacher' && (
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">👩‍🏫 Teacher Dashboard</h2>
                <p className="text-lg text-gray-600">Manage and monitor all student progress</p>
                <div className="mt-4 bg-blue-100 rounded-full px-6 py-2 inline-block">
                  <span className="text-blue-700 font-semibold">Viewing {students.length} Students</span>
                </div>
              </div>
            )}

            {user?.profileType === 'parent' && (
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">👨‍👩‍👧‍👦 Parent Dashboard</h2>
                <p className="text-lg text-gray-600">Track your children's learning progress</p>
                <div className="mt-4 bg-green-100 rounded-full px-6 py-2 inline-block">
                  <span className="text-green-700 font-semibold">Monitoring {students.length} Student{students.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            )}

            {/* Summary Stats for Teachers/Parents */}
            {(user?.profileType === 'teacher' || user?.profileType === 'parent') && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-blue-200">
                  <div className="text-center">
                    <div className="text-4xl mb-2">👥</div>
                    <div className="text-3xl font-bold text-blue-600">{students.length}</div>
                    <div className="text-sm text-gray-600">Total Students</div>
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-green-200">
                  <div className="text-center">
                    <div className="text-4xl mb-2">⭐</div>
                    <div className="text-3xl font-bold text-green-600">
                      {students.reduce((total, s) => total + s.totalXP, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Combined XP</div>
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-yellow-200">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏆</div>
                    <div className="text-3xl font-bold text-yellow-600">
                      {students.reduce((total, s) => total + s.badges.length, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Total Badges</div>
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-purple-200">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📚</div>
                    <div className="text-3xl font-bold text-purple-600">
                      {students.reduce((total, s) => total + s.completedLessons, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Total Lessons</div>
                  </div>
                </div>
              </div>
            )}

            {/* Student Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {students.map((student) => (
                <div key={student.id} className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all border-2 border-blue-100 overflow-hidden">
                  <div className="p-6">
                    {/* Student Header */}
                    <div className="flex items-center mb-6">
                      <div className="text-5xl mr-4">{student.avatar}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800">{student.name}</h3>
                        <p className="text-gray-600">Grade {student.grade} • Level {student.level}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                      <div 
                        className="text-right cursor-pointer hover:bg-blue-50 rounded-lg p-2 transition-all transform hover:scale-105"
                        onClick={() => showAnimation(student.id, 'xp', { xp: student.totalXP, name: student.name })}
                      >
                        <div className="text-3xl font-bold text-blue-600">{student.totalXP}</div>
                        <div className="text-xs text-gray-500">XP Points</div>
                      </div>
                    </div>

                    {/* Progress Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div 
                        className="text-center bg-green-50 rounded-xl p-3 hover:bg-green-100 transition-all cursor-pointer transform hover:scale-105"
                        onClick={() => showAnimation(student.id, 'streak', { days: student.streakDays, name: student.name })}
                      >
                        <div className="text-xl font-bold text-green-600">{student.streakDays}</div>
                        <div className="text-xs text-green-600">Day Streak</div>
                      </div>
                      <div 
                        className="text-center bg-blue-50 rounded-xl p-3 hover:bg-blue-100 transition-all cursor-pointer transform hover:scale-105"
                        onClick={() => showAnimation(student.id, 'assessments', { count: student.completedLessons, name: student.name })}
                      >
                        <div className="text-xl font-bold text-blue-600">{student.completedLessons}</div>
                        <div className="text-xs text-blue-600">Assessments</div>
                      </div>
                      <div 
                        className="text-center bg-purple-50 rounded-xl p-3 hover:bg-purple-100 transition-all cursor-pointer transform hover:scale-105"
                        onClick={() => showAnimation(student.id, 'badges', { count: student.badges.length, name: student.name })}
                      >
                        <div className="text-xl font-bold text-purple-600">{student.badges.length}</div>
                        <div className="text-xs text-purple-600">Badges</div>
                      </div>
                      <div 
                        className="text-center bg-orange-50 rounded-xl p-3 hover:bg-orange-100 transition-all cursor-pointer transform hover:scale-105"
                        onClick={() => showAnimation(student.id, 'time', { time: student.timeSpent, name: student.name })}
                      >
                        <div className="text-xl font-bold text-orange-600">{student.timeSpent}</div>
                        <div className="text-xs text-orange-600">Time</div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-yellow-50 rounded-xl p-3 mb-4">
                      <div className="text-xs text-yellow-700 mb-1">Recent Activity:</div>
                      <div className="text-sm font-semibold text-yellow-800 truncate">{student.recentActivity}</div>
                    </div>

                    {/* Quick Skills Overview */}
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Top Skills:</div>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(student.skillLevels)
                          .sort(([,a], [,b]) => b - a)
                          .slice(0, 3)
                          .map(([skill, level]) => (
                            <div key={skill} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                              {skill}: L{level}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Student-specific single view for students */}
            {user?.profileType === 'student' && student && (
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-blue-200 hover:scale-105 transition-transform cursor-pointer">
                    <div className="text-center">
                      <div className="text-4xl mb-2">⭐</div>
                      <div className="text-3xl font-bold text-blue-600">{student.totalXP}</div>
                      <div className="text-sm text-gray-600">Total XP</div>
                    </div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-green-200 hover:scale-105 transition-transform cursor-pointer">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🏆</div>
                      <div className="text-3xl font-bold text-green-600">{student.level}</div>
                      <div className="text-sm text-gray-600">Current Level</div>
                    </div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-yellow-200 hover:scale-105 transition-transform cursor-pointer">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🔥</div>
                      <div className="text-3xl font-bold text-yellow-600">{student.streakDays}</div>
                      <div className="text-sm text-gray-600">Day Streak</div>
                    </div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-purple-200 hover:scale-105 transition-transform cursor-pointer">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎖️</div>
                      <div className="text-3xl font-bold text-purple-600">{student.badges.length}</div>
                      <div className="text-sm text-gray-600">Badges Earned</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all border-2 border-blue-100 overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="text-6xl mr-6">{student.avatar}</div>
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold text-gray-800">{student.name}</h3>
                        <p className="text-lg text-gray-600">Grade {student.grade} • Level {student.level}</p>
                        <p className="text-gray-500">{student.email}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold text-blue-600">{student.totalXP}</div>
                        <div className="text-sm text-gray-500">XP Points</div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 rounded-xl p-4 mb-6">
                      <div className="text-sm text-yellow-700 mb-2">Recent Activity:</div>
                      <div className="text-lg font-semibold text-yellow-800">{student.recentActivity}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => setActiveTab('skills')}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-xl text-lg font-bold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105"
                      >
                        📊 View Skills
                      </button>
                      <Link 
                        to="/adaptive"
                        className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-xl text-lg font-bold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 text-center"
                      >
                        🎯 Smart Learning
                      </Link>
                      <Link 
                        to="/math"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl text-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 text-center"
                      >
                        🧮 Math Adventure
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && student && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">🎯 Your Skills Dashboard</h2>
              <p className="text-lg text-gray-600">Click on any skill to navigate to targeted learning activities!</p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-purple-100">
              {/* Student Info */}
              <div className="flex items-center mb-6">
                <div className="text-5xl mr-4">{student.avatar}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{student.name}</h3>
                  <p className="text-gray-600">Grade {student.grade} • Total XP: {student.totalXP}</p>
                </div>
              </div>

              {/* Interactive Skill Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(student.skillLevels).map(([skill, level]) => (
                  <Link
                    key={skill}
                    to="/adaptive"
                    className={`bg-gradient-to-r ${getSkillColor(skill)} text-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110 cursor-pointer border-2 border-white hover:border-yellow-300`}
                  >
                    <div className="text-4xl mb-2">{getSkillIcon(skill)}</div>
                    <h4 className="font-bold text-lg capitalize mb-2">{skill.replace('-', ' ')}</h4>
                    <div className="text-2xl font-black mb-2">Level {level}/5</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < level ? '⭐' : '☆'}`}>
                          {i < level ? '⭐' : '☆'}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs opacity-90 font-semibold">
                      Click to Practice!
                    </div>
                  </Link>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="mt-6 flex justify-center space-x-4">
                <Link 
                  to="/math"
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  🧮 Math Adventure
                </Link>
                <Link 
                  to="/adaptive"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  🎯 Smart Learning
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">🎮 Learning Activities</h2>
              <p className="text-lg text-gray-600">Choose from interactive learning experiences!</p>
            </div>

            {/* Activity Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link 
                to="/math"
                className="group bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105 p-8 text-center border-2 border-blue-200 hover:border-blue-400"
              >
                <div className="text-6xl mb-4 group-hover:animate-bounce">🧮</div>
                <h3 className="text-2xl font-bold text-blue-600 mb-2">Math Adventure</h3>
                <p className="text-gray-600 mb-4">Practice arithmetic skills with fun, interactive problems</p>
                <div className="bg-blue-100 rounded-full px-4 py-2 text-blue-700 font-semibold text-sm">
                  Interactive Math Practice
                </div>
              </Link>

              <Link 
                to="/adaptive"
                className="group bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105 p-8 text-center border-2 border-purple-200 hover:border-purple-400"
              >
                <div className="text-6xl mb-4 group-hover:animate-bounce">🎯</div>
                <h3 className="text-2xl font-bold text-purple-600 mb-2">Smart Learning</h3>
                <p className="text-gray-600 mb-4">AI-powered adaptive learning tailored to each student</p>
                <div className="bg-purple-100 rounded-full px-4 py-2 text-purple-700 font-semibold text-sm">
                  Personalized Experience
                </div>
              </Link>

              <div className="group bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105 p-8 text-center border-2 border-green-200 hover:border-green-400 cursor-pointer">
                <div className="text-6xl mb-4 group-hover:animate-bounce">📚</div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Reading Quest</h3>
                <p className="text-gray-600 mb-4">Build reading comprehension with engaging stories</p>
                <div className="bg-gray-100 rounded-full px-4 py-2 text-gray-600 font-semibold text-sm">
                  Coming Soon
                </div>
              </div>

              <div className="group bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105 p-8 text-center border-2 border-yellow-200 hover:border-yellow-400 cursor-pointer">
                <div className="text-6xl mb-4 group-hover:animate-bounce">🔬</div>
                <h3 className="text-2xl font-bold text-yellow-600 mb-2">Science Lab</h3>
                <p className="text-gray-600 mb-4">Explore scientific concepts through virtual experiments</p>
                <div className="bg-gray-100 rounded-full px-4 py-2 text-gray-600 font-semibold text-sm">
                  Coming Soon
                </div>
              </div>

              <div className="group bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105 p-8 text-center border-2 border-pink-200 hover:border-pink-400 cursor-pointer">
                <div className="text-6xl mb-4 group-hover:animate-bounce">🎨</div>
                <h3 className="text-2xl font-bold text-pink-600 mb-2">Art Studio</h3>
                <p className="text-gray-600 mb-4">Creative expression through digital art and design</p>
                <div className="bg-gray-100 rounded-full px-4 py-2 text-gray-600 font-semibold text-sm">
                  Coming Soon
                </div>
              </div>

              <div className="group bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105 p-8 text-center border-2 border-indigo-200 hover:border-indigo-400 cursor-pointer">
                <div className="text-6xl mb-4 group-hover:animate-bounce">💻</div>
                <h3 className="text-2xl font-bold text-indigo-600 mb-2">Coding Fun</h3>
                <p className="text-gray-600 mb-4">Learn programming concepts through interactive games</p>
                <div className="bg-gray-100 rounded-full px-4 py-2 text-gray-600 font-semibold text-sm">
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animation Popups */}
      {Object.entries(animations).map(([key, animation]) => 
        animation.show && (
          <div key={key} className="fixed inset-0 pointer-events-none flex items-center justify-center z-[60]">
            {animation.type === 'xp' && (
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-3xl shadow-2xl transform animate-bounce">
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-pulse">⭐✨🎉</div>
                  <h2 className="text-4xl font-bold mb-2">{animation.data.name}'s XP!</h2>
                  <p className="text-2xl font-semibold">{animation.data.xp} Experience Points!</p>
                  <div className="text-lg mt-2 opacity-90">What an amazing learner! 🌟</div>
                </div>
              </div>
            )}
            
            {animation.type === 'streak' && (
              <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 rounded-3xl shadow-2xl transform animate-bounce">
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-pulse">🔥💪⚡</div>
                  <h2 className="text-4xl font-bold mb-2">{animation.data.name}'s Streak!</h2>
                  <p className="text-2xl font-semibold">{animation.data.days} Days of Learning!</p>
                  <div className="text-lg mt-2 opacity-90">Consistency champion! 🏆</div>
                </div>
              </div>
            )}
            
            {animation.type === 'badges' && (
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-8 rounded-3xl shadow-2xl transform animate-bounce">
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-pulse">🎯🏅🎊</div>
                  <h2 className="text-4xl font-bold mb-2">{animation.data.name}'s Badges!</h2>
                  <p className="text-2xl font-semibold">{animation.data.count} Amazing Achievements!</p>
                  <div className="text-lg mt-2 opacity-90">Badge collection superstar! 🌟</div>
                </div>
              </div>
            )}
            
            {animation.type === 'assessments' && (
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-8 rounded-3xl shadow-2xl transform animate-bounce">
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-pulse">📚🎓✏️</div>
                  <h2 className="text-4xl font-bold mb-2">{animation.data.name}'s Progress!</h2>
                  <p className="text-2xl font-semibold">{animation.data.count} Assessments Completed!</p>
                  <div className="text-lg mt-2 opacity-90">Learning machine! 🚀</div>
                </div>
              </div>
            )}
            
            {animation.type === 'time' && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-3xl shadow-2xl transform animate-bounce">
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-pulse">⏰💎🌟</div>
                  <h2 className="text-4xl font-bold mb-2">{animation.data.name}'s Journey!</h2>
                  <p className="text-2xl font-semibold">{animation.data.time} of Learning Time!</p>
                  <div className="text-lg mt-2 opacity-90">Time well invested! 💪</div>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default StudentsPage;