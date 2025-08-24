import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Students</h3>
          <p className="text-3xl font-bold text-blue-600">1,247</p>
          <p className="text-sm text-green-600">↗ 12% this month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Active Courses</h3>
          <p className="text-3xl font-bold text-green-600">89</p>
          <p className="text-sm text-green-600">↗ 8% this week</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Assignments Due</h3>
          <p className="text-3xl font-bold text-yellow-600">23</p>
          <p className="text-sm text-red-600">↓ 5% today</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Average Grade</h3>
          <p className="text-3xl font-bold text-purple-600">87.5%</p>
          <p className="text-sm text-green-600">↗ 3% this term</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button 
            onClick={() => window.location.href = '/math'}
            className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 text-center"
          >
            <div className="text-2xl mb-2">🧮</div>
            <div className="text-sm">Practice Math</div>
          </button>
          <div className="bg-gray-100 text-gray-600 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">📚</div>
            <div className="text-sm">Create Course</div>
          </div>
          <div className="bg-gray-100 text-gray-600 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">📋</div>
            <div className="text-sm">New Assignment</div>
          </div>
          <div className="bg-gray-100 text-gray-600 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">👥</div>
            <div className="text-sm">Add Student</div>
          </div>
          <div className="bg-gray-100 text-gray-600 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">🎓</div>
            <div className="text-sm">Invite Teacher</div>
          </div>
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

// Simple header
const SimpleHeader = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600">🎓 EduMaster</h1>
          <nav className="hidden md:flex space-x-8 ml-10">
            <a href="/dashboard" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">Dashboard</a>
            <a href="/math" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">🧮 Math Learning</a>
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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;