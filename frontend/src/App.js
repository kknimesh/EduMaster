import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import StudentsPage from './pages/StudentsPage';
import TeachersPage from './pages/TeachersPage';
import ParentsPage from './pages/ParentsPage';
import CoursesPage from './pages/CoursesPage';
import AssignmentsPage from './pages/AssignmentsPage';
import MathLearningPage from './pages/MathLearningPage';
import AdaptiveLearningPage from './pages/AdaptiveLearningPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import UserProfile from './components/UserProfile';
import './App.css';


// EduMaster Landing Page
const SimpleDashboard = () => (
  <div 
    className="min-h-screen relative"
    style={{
      background: `
        linear-gradient(135deg, 
          rgba(59, 130, 246, 0.15) 0%, 
          rgba(147, 51, 234, 0.15) 25%, 
          rgba(236, 72, 153, 0.15) 50%, 
          rgba(34, 197, 94, 0.15) 75%, 
          rgba(251, 191, 36, 0.15) 100%
        ),
        radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
        url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJtYWdpYyIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPgogICAgICA8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSI4IiBmaWxsPSJyZ2JhKDU5LCAxMzAsIDI0NiwgMC4wNSkiLz4KICAgICAgPGNpcmNsZSBjeD0iODAiIGN5PSIzMCIgcj0iNiIgZmlsbD0icmdiYSgxNDcsIDUxLCAyMzQsIDAuMDUpIi8+CiAgICAgIDxjaXJjbGUgY3g9IjQwIiBjeT0iNzAiIHI9IjUiIGZpbGw9InJnYmEoMjM2LCA3MiwgMTUzLCAwLjA1KSIvPgogICAgICA8Y2lyY2xlIGN4PSI2MCIgY3k9IjUwIiByPSI0IiBmaWxsPSJyZ2JhKDM0LCAxOTcsIDk0LCAwLjA1KSIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI21hZ2ljKSIvPgo8L3N2Zz4=') repeat
      `
    }}
  >
    {/* Magical Floating Learning Elements - Hidden on mobile for better performance */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
      <div className="absolute top-20 left-10 text-4xl sm:text-6xl lg:text-7xl opacity-40" style={{animation: 'bounce 2s infinite'}}>📚</div>
      <div className="absolute top-40 right-20 text-3xl sm:text-5xl lg:text-6xl opacity-40" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}>✏️</div>
      <div className="absolute bottom-40 left-20 text-4xl sm:text-7xl lg:text-8xl opacity-40" style={{animation: 'bounce 2.5s infinite'}}>🧮</div>
      <div className="absolute top-60 left-1/2 text-3xl sm:text-5xl lg:text-6xl opacity-40" style={{animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}>🔍</div>
      <div className="absolute bottom-20 right-10 text-4xl sm:text-6xl lg:text-7xl opacity-40" style={{animation: 'bounce 1.8s infinite'}}>📖</div>
      <div className="absolute top-32 right-1/3 text-3xl sm:text-5xl lg:text-6xl opacity-40" style={{animation: 'pulse 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}>🧗‍♂️</div>
      <div className="absolute bottom-60 left-1/4 text-4xl sm:text-6xl lg:text-7xl opacity-40" style={{animation: 'bounce 2.3s infinite'}}>🌈</div>
      <div className="absolute top-80 right-1/2 text-3xl sm:text-4xl lg:text-5xl opacity-40" style={{animation: 'pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}>🎨</div>
      <div className="absolute bottom-32 right-1/4 text-4xl sm:text-7xl lg:text-8xl opacity-40" style={{animation: 'bounce 2.1s infinite'}}>🚀</div>
      <div className="absolute top-48 left-1/3 text-3xl sm:text-5xl lg:text-6xl opacity-40" style={{animation: 'pulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}>🎪</div>
      <div className="absolute top-16 left-1/2 text-3xl sm:text-4xl lg:text-5xl opacity-40" style={{animation: 'bounce 1.7s infinite'}}>🎭</div>
      <div className="absolute bottom-80 right-1/3 text-3xl sm:text-5xl lg:text-6xl opacity-40" style={{animation: 'pulse 2.1s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}>🔬</div>
      <div className="absolute top-72 left-20 text-4xl sm:text-6xl lg:text-7xl opacity-40" style={{animation: 'bounce 2.6s infinite'}}>💡</div>
      <div className="absolute bottom-16 left-1/3 text-3xl sm:text-4xl lg:text-5xl opacity-40" style={{animation: 'pulse 1.9s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}>🎓</div>
      <div className="absolute top-24 right-10 text-3xl sm:text-5xl lg:text-6xl opacity-40" style={{animation: 'bounce 2.2s infinite'}}>🛴</div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="mb-6 sm:mb-8 text-center">
          <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6">📚🎓</div>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-4 sm:mb-6 px-2">
            <span className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse">
              Hey Superstar!
            </span>
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-4 sm:mb-6 px-2">
            <span className="bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 text-transparent bg-clip-text">
              Welcome to EduMaster! 🎪
            </span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-3xl text-gray-800 font-black mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
            🌟 Ready for the most FUN learning adventure ever? 🚀
          </p>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-bold mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Play games, solve puzzles, and become the smartest kid in your class! 🧠✨
          </p>
          
          {/* Learning Activity Emojis */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
            <span className="text-3xl sm:text-4xl lg:text-5xl">📚</span>
            <span className="text-3xl sm:text-4xl lg:text-5xl">✏️</span>
            <span className="text-3xl sm:text-4xl lg:text-5xl">🧮</span>
            <span className="text-3xl sm:text-4xl lg:text-5xl">🔍</span>
            <span className="text-3xl sm:text-4xl lg:text-5xl">💡</span>
            <span className="text-3xl sm:text-4xl lg:text-5xl">🛴</span>
            <span className="text-3xl sm:text-4xl lg:text-5xl">🎭</span>
          </div>
          
          {/* Fun Callout Box */}
          <div className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-4 border-rainbow-gradient max-w-4xl mx-auto mb-6 sm:mb-8">
            <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">🎮🚀🎯</div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-purple-700 mb-3 sm:mb-4">Learning Through Epic Games! 🎮</h3>
            <p className="text-sm sm:text-lg lg:text-xl text-purple-600 font-bold">
              Race cars, solve mysteries, cook with fractions, and build towers! Math has never been this FUN! 🏁🕵️‍♂️👨‍🍳🏗️
            </p>
          </div>
        </div>

        {/* Fun Achievement Stats */}
        <div className="mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-center mb-6 sm:mb-8 px-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              🏆 Join Our Learning Community! 🎉
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl hover:scale-105 sm:hover:scale-110 transition-transform cursor-pointer">
              <div className="text-4xl sm:text-6xl lg:text-7xl mb-2 sm:mb-4">🎮</div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black mb-1 sm:mb-2">6</div>
              <div className="text-base sm:text-lg lg:text-xl font-bold">Epic Math Games!</div>
              <div className="text-xs sm:text-sm opacity-90 mt-1 sm:mt-2">Race, cook, build, and solve mysteries! 🏁🍕🏰</div>
            </div>
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl hover:scale-105 sm:hover:scale-110 transition-transform cursor-pointer">
              <div className="text-4xl sm:text-6xl lg:text-7xl mb-2 sm:mb-4">🚀</div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black mb-1 sm:mb-2">100+</div>
              <div className="text-base sm:text-lg lg:text-xl font-bold">Skills to Master!</div>
              <div className="text-xs sm:text-sm opacity-90 mt-1 sm:mt-2">From basic math to advanced algebra! 🏆✨</div>
            </div>
            <div className="bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl hover:scale-105 sm:hover:scale-110 transition-transform cursor-pointer">
              <div className="text-4xl sm:text-6xl lg:text-7xl mb-2 sm:mb-4">🎆</div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black mb-1 sm:mb-2">20+</div>
              <div className="text-base sm:text-lg lg:text-xl font-bold">Achievements to Earn!</div>
              <div className="text-xs sm:text-sm opacity-90 mt-1 sm:mt-2">Detective badges, chef hats, builder crowns! 🔍👨‍🍳👷</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Learning Areas */}
      <div className="mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center mb-3 sm:mb-4 px-4">
          <span className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-transparent bg-clip-text">
            📚 Choose Your Adventure! 🎮
          </span>
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-bold text-center mb-8 sm:mb-12 px-4">Pick any subject to start your learning journey!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <Link to="/adaptive" className="group block">
            <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border-3 border-pink-300 hover:border-pink-500 transform hover:scale-105 lg:hover:scale-110 transition-all duration-300 hover:rotate-1">
              <div className="text-4xl sm:text-6xl lg:text-7xl mb-3 sm:mb-4 text-center">🎯</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-pink-600 text-center mb-2 sm:mb-3">Smart Learning</h3>
              <p className="text-sm sm:text-base text-gray-700 text-center mb-3 sm:mb-4 font-semibold">AI finds your perfect level and creates a magical learning path just for you!</p>
              <div className="text-center">
                <span className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-3 sm:px-4 lg:px-5 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">🧠 AI Powered</span>
              </div>
            </div>
          </Link>
          
          <Link to="/math" className="group block">
            <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border-3 border-blue-300 hover:border-blue-500 transform hover:scale-105 lg:hover:scale-110 transition-all duration-300 hover:rotate-1">
              <div className="text-4xl sm:text-6xl lg:text-7xl mb-3 sm:mb-4 text-center">🧮</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-blue-600 text-center mb-2 sm:mb-3">Math Adventure</h3>
              <p className="text-sm sm:text-base text-gray-700 text-center mb-3 sm:mb-4 font-semibold">Solve puzzles, play number games, and become a math superhero!</p>
              <div className="text-center">
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-3 sm:px-4 lg:px-5 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">🏆 1,000+ Games</span>
              </div>
            </div>
          </Link>
          
          <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border-3 border-green-300 hover:border-green-500 transform hover:scale-105 lg:hover:scale-110 transition-all duration-300 cursor-pointer hover:rotate-1">
            <div className="text-4xl sm:text-6xl lg:text-7xl mb-3 sm:mb-4 text-center">📖</div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-green-600 text-center mb-2 sm:mb-3">Reading Quest</h3>
            <p className="text-sm sm:text-base text-gray-700 text-center mb-3 sm:mb-4 font-semibold">Join exciting stories, meet amazing characters, and unlock reading superpowers!</p>
            <div className="text-center">
              <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-3 sm:px-4 lg:px-5 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">🎨 Coming Soon</span>
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border-3 border-purple-300 hover:border-purple-500 transform hover:scale-105 lg:hover:scale-110 transition-all duration-300 cursor-pointer hover:rotate-1">
            <div className="text-4xl sm:text-6xl lg:text-7xl mb-3 sm:mb-4 text-center">🔬</div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-purple-600 text-center mb-2 sm:mb-3">Science Lab</h3>
            <p className="text-sm sm:text-base text-gray-700 text-center mb-3 sm:mb-4 font-semibold">Mix potions, explore space, and discover how the world works!</p>
            <div className="text-center">
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-3 sm:px-4 lg:px-5 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">🧪 Coming Soon</span>
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border-3 border-yellow-300 hover:border-yellow-500 transform hover:scale-105 lg:hover:scale-110 transition-all duration-300 cursor-pointer hover:rotate-1">
            <div className="text-4xl sm:text-6xl lg:text-7xl mb-3 sm:mb-4 text-center">🎨</div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-yellow-600 text-center mb-2 sm:mb-3">Art Studio</h3>
            <p className="text-sm sm:text-base text-gray-700 text-center mb-3 sm:mb-4 font-semibold">Paint masterpieces, create digital art, and express your creativity!</p>
            <div className="text-center">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 sm:px-4 lg:px-5 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">🌈 Coming Soon</span>
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border-3 border-indigo-300 hover:border-indigo-500 transform hover:scale-105 lg:hover:scale-110 transition-all duration-300 cursor-pointer hover:rotate-1">
            <div className="text-4xl sm:text-6xl lg:text-7xl mb-3 sm:mb-4 text-center">🕹️</div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-indigo-600 text-center mb-2 sm:mb-3">Coding Fun</h3>
            <p className="text-sm sm:text-base text-gray-700 text-center mb-3 sm:mb-4 font-semibold">Build games, create apps, and learn to speak computer language!</p>
            <div className="text-center">
              <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white px-3 sm:px-4 lg:px-5 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">🤖 Coming Soon</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Math Games Section */}
      <div className="mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center mb-3 sm:mb-4 px-4">
          <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-transparent bg-clip-text">
            🎮 Featured Math Games! 🎆
          </span>
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-bold text-center mb-8 sm:mb-12 px-4">
          Jump into exciting math adventures and level up your skills!
        </p>
        
        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {/* Number Race */}
          <div className="bg-gradient-to-br from-red-400 to-yellow-500 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl transform hover:scale-105 lg:hover:scale-110 transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div className="absolute top-2 right-2 text-2xl opacity-30">✨</div>
            <div className="text-5xl sm:text-6xl lg:text-7xl mb-3 sm:mb-4 text-center animate-bounce">🏁</div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-center mb-2 sm:mb-3">Number Race</h3>
            <p className="text-sm sm:text-base lg:text-lg text-center mb-3 sm:mb-4 opacity-90">
              Race against time! Solve math problems as fast as you can!
            </p>
            <div className="flex justify-center space-x-2 mb-3 sm:mb-4">
              <div className="bg-white/20 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">🎯 Easy</div>
              <div className="bg-white/20 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">⚡ Speed</div>
              <div className="bg-white/20 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">🏆 50 XP</div>
            </div>
            <div className="text-center">
              <span className="text-sm sm:text-base font-bold opacity-75">🏆 New & Exciting!</span>
            </div>
          </div>

          {/* Math Quest Adventure */}
          <div className="bg-gradient-to-br from-purple-400 to-blue-500 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl transform hover:scale-105 lg:hover:scale-110 transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div className="absolute top-2 right-2 text-2xl opacity-30">🎆</div>
            <div className="text-5xl sm:text-6xl lg:text-7xl mb-3 sm:mb-4 text-center animate-pulse">🗺️</div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-center mb-2 sm:mb-3">Math Quest</h3>
            <p className="text-sm sm:text-base lg:text-lg text-center mb-3 sm:mb-4 opacity-90">
              Epic adventure through magical lands solving puzzles!
            </p>
            <div className="flex justify-center space-x-2 mb-3 sm:mb-4">
              <div className="bg-white/20 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">🎯 Medium</div>
              <div className="bg-white/20 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">🗺️ Adventure</div>
              <div className="bg-white/20 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">🏆 75 XP</div>
            </div>
            <div className="text-center">
              <span className="text-sm sm:text-base font-bold opacity-75">🎆 Epic Adventure!</span>
            </div>
          </div>

          {/* Fraction Chef */}
          <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl transform hover:scale-105 lg:hover:scale-110 transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div className="absolute top-2 right-2 text-2xl opacity-30">🌟</div>
            <div className="text-5xl sm:text-6xl lg:text-7xl mb-3 sm:mb-4 text-center animate-bounce">🍕</div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-center mb-2 sm:mb-3">Fraction Chef</h3>
            <p className="text-sm sm:text-base lg:text-lg text-center mb-3 sm:mb-4 opacity-90">
              Cook delicious meals while mastering fractions!
            </p>
            <div className="flex justify-center space-x-2 mb-3 sm:mb-4">
              <div className="bg-white/20 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">🎯 Medium</div>
              <div className="bg-white/20 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">🍳 Cooking</div>
              <div className="bg-white/20 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">🏆 65 XP</div>
            </div>
            <div className="text-center">
              <span className="text-sm sm:text-base font-bold opacity-75">🍳 Deliciously Fun!</span>
            </div>
          </div>

          {/* Times Table Tower */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl transform hover:scale-105 lg:hover:scale-110 transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div className="absolute top-2 right-2 text-2xl opacity-30">✨</div>
            <div className="text-5xl sm:text-6xl lg:text-7xl mb-3 sm:mb-4 text-center animate-bounce">🏰</div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-center mb-2 sm:mb-3">Tower Builder</h3>
            <p className="text-sm sm:text-base lg:text-lg text-center mb-3 sm:mb-4 opacity-90">
              Build the tallest tower with multiplication magic!
            </p>
            <div className="flex justify-center space-x-2 mb-3 sm:mb-4">
              <div className="bg-white/20 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">🎯 Easy</div>
              <div className="bg-white/20 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">🏗️ Building</div>
              <div className="bg-white/20 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">🏆 45 XP</div>
            </div>
            <div className="text-center">
              <span className="text-sm sm:text-base font-bold opacity-75">🏰 Build & Learn!</span>
            </div>
          </div>

          {/* Geometry City Builder */}
          <div className="bg-gradient-to-br from-green-400 to-teal-500 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl transform hover:scale-105 lg:hover:scale-110 transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div className="absolute top-2 right-2 text-2xl opacity-30">🎆</div>
            <div className="text-5xl sm:text-6xl lg:text-7xl mb-3 sm:mb-4 text-center animate-pulse">🏗️</div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-center mb-2 sm:mb-3">City Builder</h3>
            <p className="text-sm sm:text-base lg:text-lg text-center mb-3 sm:mb-4 opacity-90">
              Design your dream city with geometric shapes!
            </p>
            <div className="flex justify-center space-x-2 mb-3 sm:mb-4">
              <div className="bg-white/20 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">🎯 Hard</div>
              <div className="bg-white/20 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">🏗️ Building</div>
              <div className="bg-white/20 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">🏆 100 XP</div>
            </div>
            <div className="text-center">
              <span className="text-sm sm:text-base font-bold opacity-75">🏙️ Creative Geometry!</span>
            </div>
          </div>

          {/* Algebra Detective */}
          <div className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl transform hover:scale-105 lg:hover:scale-110 transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div className="absolute top-2 right-2 text-2xl opacity-30">🌟</div>
            <div className="text-5xl sm:text-6xl lg:text-7xl mb-3 sm:mb-4 text-center animate-bounce">🔍</div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-center mb-2 sm:mb-3">Detective</h3>
            <p className="text-sm sm:text-base lg:text-lg text-center mb-3 sm:mb-4 opacity-90">
              Solve mysterious cases with algebraic clues!
            </p>
            <div className="flex justify-center space-x-2 mb-3 sm:mb-4">
              <div className="bg-white/20 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">🎯 Hard</div>
              <div className="bg-white/20 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">🕵️‍♂️ Mystery</div>
              <div className="bg-white/20 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">🏆 90 XP</div>
            </div>
            <div className="text-center">
              <span className="text-sm sm:text-base font-bold opacity-75">🔍 Solve Mysteries!</span>
            </div>
          </div>
        </div>

        {/* Play Now Button */}
        <div className="text-center">
          <Link 
            to="/adaptive" 
            className="inline-block bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-8 sm:px-12 lg:px-16 py-4 sm:py-6 lg:py-8 rounded-full text-xl sm:text-2xl lg:text-3xl font-black hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition-all transform hover:scale-110 shadow-2xl animate-pulse"
          >
            🎮 PLAY NOW! 🚀
          </Link>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-bold mt-3 sm:mt-4">
            🎆 Click to start your math gaming adventure!
          </p>
          <div className="flex justify-center space-x-2 sm:space-x-4 mt-2 sm:mt-3">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm font-bold">✅ Free Forever</span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs sm:text-sm font-bold">🏆 Earn XP & Badges</span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs sm:text-sm font-bold">🎮 6 Epic Games</span>
          </div>
        </div>
      </div>

      {/* Get Started Section */}
      <div className="bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-200 p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl shadow-2xl border-4 border-yellow-400">
        <div className="text-center">
          <div className="text-5xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6">📖✏️🏪</div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-4 sm:mb-6 px-2">
            <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
              Let's Start Your Adventure! 🚀
            </span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-800 font-black mb-6 sm:mb-8 lg:mb-10 px-4">Ready to become a learning champion? Pick your path!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-6 sm:mb-8 lg:mb-10">
            <div className="text-center bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-4 border-blue-300 hover:scale-105 lg:hover:scale-110 transition-transform shadow-2xl">
              <div className="text-5xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6">👦👧</div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3 sm:mb-4">I'm a Kid!</h3>
              <p className="text-sm sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6 opacity-90">I want to read amazing stories and write my own adventures!</p>
              <Link to="/adaptive" className="bg-white text-blue-600 px-6 sm:px-8 lg:px-10 py-2 sm:py-3 lg:py-4 rounded-full text-sm sm:text-lg lg:text-xl font-black hover:bg-blue-50 transition-all inline-block transform hover:scale-105 lg:hover:scale-110 shadow-lg">
                📖 Let's Read & Learn!
              </Link>
            </div>
            
            <div className="text-center bg-gradient-to-br from-green-400 to-teal-500 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-4 border-green-300 hover:scale-105 lg:hover:scale-110 transition-transform shadow-2xl">
              <div className="text-5xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6">👩‍🏫</div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3 sm:mb-4">I'm a Grown-Up!</h3>
              <p className="text-sm sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6 opacity-90">I want to help kids learn and track their amazing progress!</p>
              <Link to="/teachers" className="bg-white text-green-600 px-6 sm:px-8 lg:px-10 py-2 sm:py-3 lg:py-4 rounded-full text-sm sm:text-lg lg:text-xl font-black hover:bg-green-50 transition-all inline-block transform hover:scale-105 lg:hover:scale-110 shadow-lg">
                🏆 Help Kids Learn!
              </Link>
            </div>
          </div>
          
          {/* Super Fun Fact */}
          <div className="bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-4 border-purple-400 hover:scale-105 transition-transform">
            <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">🤩</div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-purple-700 mb-2 sm:mb-3">Secret Superpower! 🧿</h3>
            <p className="text-sm sm:text-lg lg:text-xl text-purple-600 font-black px-2">
              Kids who learn with EduMaster become 3x SMARTER and have 100% more FUN than boring old textbooks! 💪📚
            </p>
            <div className="mt-3 sm:mt-4 flex justify-center gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl">🧠</span>
              <span className="text-2xl sm:text-3xl">✨</span>
              <span className="text-2xl sm:text-3xl">🏆</span>
              <span className="text-2xl sm:text-3xl">🎉</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Enhanced header with mobile navigation and authentication
const SimpleHeader = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const [showSignup, setShowSignup] = React.useState(false);

  const switchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">📚✏️ EduMaster</Link>
              <nav className="hidden md:flex space-x-6 ml-10">
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-semibold rounded-full hover:bg-blue-50 transition-all">🏠 Home</Link>
                <Link to="/math" className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-semibold rounded-full hover:bg-purple-50 transition-all">🧮 Math Fun</Link>
                <Link to="/adaptive" className="text-gray-600 hover:text-pink-600 px-3 py-2 text-sm font-semibold rounded-full hover:bg-pink-50 transition-all">🎯 Smart Learning</Link>
                <Link to="/students" className="text-gray-600 hover:text-green-600 px-3 py-2 text-sm font-semibold rounded-full hover:bg-green-50 transition-all">👥 Students</Link>
                <Link to="/teachers" className="text-gray-600 hover:text-yellow-600 px-3 py-2 text-sm font-semibold rounded-full hover:bg-yellow-50 transition-all">👩‍🏫 Teachers</Link>
                <Link to="/parents" className="text-gray-600 hover:text-pink-600 px-3 py-2 text-sm font-semibold rounded-full hover:bg-pink-50 transition-all">👨‍👩‍👧‍👦 Parents</Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* User Profile/Login Section */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowProfile(true)}
                    className="flex items-center space-x-2 hover:bg-gray-100 rounded-full px-3 py-2 transition-all"
                  >
                    <div className="text-2xl">{user?.avatar || '🧒'}</div>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-semibold text-gray-700">{user?.firstName} {user?.lastName}</div>
                      <div className="text-xs text-gray-500 capitalize">
                        Level {user?.progress?.level || 1} • {user?.progress?.totalXP || 0} XP
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={logout}
                    className="text-sm text-gray-600 hover:text-red-600 px-3 py-1 rounded-full hover:bg-red-50 transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-md"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowSignup(true)}
                    className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-50 transition-all"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/dashboard" 
                className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-semibold rounded-md hover:bg-blue-50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                🏠 Home
              </Link>
              <Link 
                to="/math" 
                className="block text-gray-600 hover:text-purple-600 px-3 py-2 text-base font-semibold rounded-md hover:bg-purple-50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                🧮 Math Fun
              </Link>
              <Link 
                to="/adaptive" 
                className="block text-gray-600 hover:text-pink-600 px-3 py-2 text-base font-semibold rounded-md hover:bg-pink-50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                🎯 Smart Learning
              </Link>
              <Link 
                to="/students" 
                className="block text-gray-600 hover:text-green-600 px-3 py-2 text-base font-semibold rounded-md hover:bg-green-50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                👥 Students
              </Link>
              <Link 
                to="/teachers" 
                className="block text-gray-600 hover:text-yellow-600 px-3 py-2 text-base font-semibold rounded-md hover:bg-yellow-50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                👩‍🏫 Teachers
              </Link>
              <Link 
                to="/parents" 
                className="block text-gray-600 hover:text-pink-600 px-3 py-2 text-base font-semibold rounded-md hover:bg-pink-50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                👨‍👩‍👧‍👦 Parents
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>

    {/* Authentication Modals */}
    <LoginModal 
      showLogin={showLogin}
      setShowLogin={setShowLogin}
      switchToSignup={switchToSignup}
    />
    
    <SignupModal 
      showSignup={showSignup}
      setShowSignup={setShowSignup}
      switchToLogin={switchToLogin}
    />
    
    <UserProfile 
      showProfile={showProfile}
      setShowProfile={setShowProfile}
    />
  </>
  );
};

// Main App Component
const AppContent = () => {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <SimpleHeader />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<SimpleDashboard />} />
            <Route path="/dashboard" element={<SimpleDashboard />} />
            <Route path="/math" element={<MathLearningPage />} />
            <Route path="/adaptive" element={<AdaptiveLearningPage />} />
            <Route path="/verify-email" element={<EmailVerificationPage />} />
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
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;