import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentsPage from './pages/StudentsPage';
import TeachersPage from './pages/TeachersPage';
import ParentsPage from './pages/ParentsPage';
import CoursesPage from './pages/CoursesPage';
import AssignmentsPage from './pages/AssignmentsPage';
import './App.css';

// Simple dashboard component for deployment
const SimpleDashboard = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to EduMaster! 🎓
        </h1>
        <p className="mt-2 text-gray-600">
          Your comprehensive education management platform is now live!
        </p>
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border-2 border-blue-300 text-blue-800 rounded-2xl">
          <strong>🌟 Math Adventure Zone v2.0</strong> | Focus on Math Skills for Grades 1-12!
        </div>
      </div>
      
      {/* Math Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Math Students</h3>
            <span className="text-3xl">👥</span>
          </div>
          <p className="text-3xl font-bold text-blue-600">1,247</p>
          <p className="text-sm text-green-600 font-medium">🌟 Growing every day!</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Math Skills</h3>
            <span className="text-3xl">🧮</span>
          </div>
          <p className="text-3xl font-bold text-green-600">1,089</p>
          <p className="text-sm text-green-600 font-medium">📚 Across all grades!</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Problems Solved</h3>
            <span className="text-3xl">🎯</span>
          </div>
          <p className="text-3xl font-bold text-yellow-600">45,823</p>
          <p className="text-sm text-yellow-600 font-medium">🚀 This week!</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Success Rate</h3>
            <span className="text-3xl">⭐</span>
          </div>
          <p className="text-3xl font-bold text-purple-600">92%</p>
          <p className="text-sm text-purple-600 font-medium">🏆 Amazing work!</p>
        </div>
      </div>

      {/* Math Adventure Actions */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-8 rounded-3xl shadow-lg border-2 border-blue-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">🌟 Start Your Math Adventure! 🌟</h2>
        <p className="text-center text-gray-600 mb-8">Choose what you want to explore today!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => window.location.href = '/math'}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-2xl hover:from-blue-500 hover:to-blue-700 text-center transform hover:scale-105 transition-all shadow-lg"
          >
            <div className="text-4xl mb-3">🎯</div>
            <div className="text-xl font-bold mb-2">Practice Math</div>
            <div className="text-sm opacity-90">Jump into fun math problems!</div>
          </button>
          <button className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-2xl hover:from-green-500 hover:to-green-700 text-center transform hover:scale-105 transition-all shadow-lg">
            <div className="text-4xl mb-3">📊</div>
            <div className="text-xl font-bold mb-2">My Progress</div>
            <div className="text-sm opacity-90">See how awesome you're doing!</div>
          </button>
          <button className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-2xl hover:from-purple-500 hover:to-purple-700 text-center transform hover:scale-105 transition-all shadow-lg">
            <div className="text-4xl mb-3">🏆</div>
            <div className="text-xl font-bold mb-2">Achievements</div>
            <div className="text-sm opacity-90">Collect stars and trophies!</div>
          </button>
        </div>
        
        {/* Fun math fact */}
        <div className="mt-8 text-center bg-white rounded-2xl p-6 shadow-md border-2 border-yellow-200">
          <div className="text-3xl mb-2">🤓</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Fun Math Fact!</h3>
          <p className="text-gray-600">Did you know? The word "mathematics" comes from the Greek word "mathema," which means "knowledge" or "learning"! 🧠✨</p>
        </div>
      </div>
    </div>
  </div>
);

// Simple math learning component
const SimpleMathLearning = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Math Learning Center 🧮
        </h1>
        <p className="mt-2 text-gray-600">
          IXL-inspired adaptive math practice system
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Addition</h3>
          <p className="text-gray-600 mb-4">Basic addition problems</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">Grade 1-3</span>
            <button className="text-blue-600 hover:text-blue-800">Start Practice →</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Subtraction</h3>
          <p className="text-gray-600 mb-4">Subtraction with regrouping</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">Grade 2-4</span>
            <button className="text-blue-600 hover:text-blue-800">Start Practice →</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Multiplication</h3>
          <p className="text-gray-600 mb-4">Times tables and beyond</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">Grade 3-6</span>
            <button className="text-blue-600 hover:text-blue-800">Start Practice →</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Fractions</h3>
          <p className="text-gray-600 mb-4">Understanding fractions</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded">Grade 4-7</span>
            <button className="text-blue-600 hover:text-blue-800">Start Practice →</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Decimals</h3>
          <p className="text-gray-600 mb-4">Decimal operations</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded">Grade 5-8</span>
            <button className="text-blue-600 hover:text-blue-800">Start Practice →</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Algebra</h3>
          <p className="text-gray-600 mb-4">Solving equations</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-indigo-600 bg-indigo-100 px-2 py-1 rounded">Grade 6-12</span>
            <button className="text-blue-600 hover:text-blue-800">Start Practice →</button>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">Level 12</div>
            <div className="text-sm text-gray-600">Current Level</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">245 XP</div>
            <div className="text-sm text-gray-600">Total Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">7 days</div>
            <div className="text-sm text-gray-600">Current Streak</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Enhanced header with all navigation
const SimpleHeader = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">🌟 Math Adventure Zone</Link>
          <nav className="hidden md:flex space-x-6 ml-10">
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-semibold rounded-full hover:bg-blue-50 transition-all">🏠 Home</Link>
            <Link to="/math" className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-semibold rounded-full hover:bg-purple-50 transition-all">🧮 Math Fun</Link>
            <Link to="/students" className="text-gray-600 hover:text-green-600 px-3 py-2 text-sm font-semibold rounded-full hover:bg-green-50 transition-all">👥 Students</Link>
            <Link to="/teachers" className="text-gray-600 hover:text-yellow-600 px-3 py-2 text-sm font-semibold rounded-full hover:bg-yellow-50 transition-all">👩‍🏫 Teachers</Link>
            <Link to="/parents" className="text-gray-600 hover:text-pink-600 px-3 py-2 text-sm font-semibold rounded-full hover:bg-pink-50 transition-all">👨‍👩‍👧‍👦 Parents</Link>
          </nav>
        </div>
      </div>
    </div>
  </header>
);

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <SimpleHeader />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<SimpleDashboard />} />
            <Route path="/dashboard" element={<SimpleDashboard />} />
            <Route path="/math" element={<SimpleMathLearning />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/parents" element={<ParentsPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;