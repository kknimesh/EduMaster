import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentsPage from './pages/StudentsPage';
import TeachersPage from './pages/TeachersPage';
import ParentsPage from './pages/ParentsPage';
import CoursesPage from './pages/CoursesPage';
import AssignmentsPage from './pages/AssignmentsPage';
import MathLearningPage from './pages/MathLearningPage';
import './App.css';

// EduMaster Landing Page
const SimpleDashboard = () => (
  <div 
    className="min-h-screen relative"
    style={{
      background: `
        linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%),
        url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJjbG91ZCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPgogICAgICA8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSI4IiBmaWxsPSJyZ2JhKDU5LCAxMzAsIDI0NiwgMC4xKSIvPgogICAgICA8Y2lyY2xlIGN4PSI4MCIgY3k9IjMwIiByPSI2IiBmaWxsPSJyZ2JhKDE0NywgNTEsIDIzNCwgMC4xKSIvPgogICAgICA8Y2lyY2xlIGN4PSI0MCIgY3k9IjcwIiByPSI1IiBmaWxsPSJyZ2JhKDIzNiwgNzIsIDE1MywgMC4xKSIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2Nsb3VkKSIvPgo8L3N2Zz4=') repeat
      `
    }}
  >
    {/* Floating Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">📚</div>
      <div className="absolute top-40 right-20 text-5xl opacity-20 animate-pulse">✨</div>
      <div className="absolute bottom-40 left-20 text-7xl opacity-20 animate-bounce">🎯</div>
      <div className="absolute top-60 left-1/2 text-5xl opacity-20 animate-pulse">🌟</div>
      <div className="absolute bottom-20 right-10 text-6xl opacity-20 animate-bounce">🎉</div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Welcome to EduMaster! 🎓
          </h1>
          <p className="text-2xl text-gray-700 mb-6 max-w-3xl mx-auto">
            Where learning becomes an adventure! Join thousands of students on their educational journey.
          </p>
        </div>

        {/* Fun Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-200">
            <div className="text-5xl mb-4">👨‍👩‍👧‍👦</div>
            <div className="text-3xl font-bold text-blue-600">12</div>
            <div className="text-gray-600 font-semibold">Happy Families</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-200">
            <div className="text-5xl mb-4">🧠</div>
            <div className="text-3xl font-bold text-purple-600">247</div>
            <div className="text-gray-600 font-semibold">Problems Solved</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200">
            <div className="text-5xl mb-4">🏆</div>
            <div className="text-3xl font-bold text-pink-600">89</div>
            <div className="text-gray-600 font-semibold">Achievements Earned</div>
          </div>
        </div>
      </div>
      
      {/* Learning Areas */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Explore Learning Adventures!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/math" className="group block">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-2 border-blue-200 hover:border-blue-400 transform hover:scale-105 transition-all duration-300">
              <div className="text-6xl mb-4 text-center group-hover:animate-bounce">🧮</div>
              <h3 className="text-2xl font-bold text-blue-600 text-center mb-3">Math Adventure</h3>
              <p className="text-gray-600 text-center mb-4">Explore numbers, solve puzzles, and discover the magic of mathematics!</p>
              <div className="text-center">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">1,089+ Skills</span>
              </div>
            </div>
          </Link>
          
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-2 border-green-200 hover:border-green-400 transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="text-6xl mb-4 text-center">📖</div>
            <h3 className="text-2xl font-bold text-green-600 text-center mb-3">Reading Quest</h3>
            <p className="text-gray-600 text-center mb-4">Dive into stories, build vocabulary, and master language arts!</p>
            <div className="text-center">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">Coming Soon</span>
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-2 border-purple-200 hover:border-purple-400 transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="text-6xl mb-4 text-center">🔬</div>
            <h3 className="text-2xl font-bold text-purple-600 text-center mb-3">Science Lab</h3>
            <p className="text-gray-600 text-center mb-4">Experiment, discover, and explore the wonders of science!</p>
            <div className="text-center">
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>

      {/* Get Started Section */}
      <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border-2 border-yellow-200">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-600 mb-8">Choose your path and begin your educational adventure today!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <div className="text-8xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-blue-600 mb-3">For Students</h3>
              <p className="text-gray-600 mb-4">Jump into interactive lessons, practice problems, and track your progress!</p>
              <Link to="/math" className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors inline-block">
                Start Learning →
              </Link>
            </div>
            
            <div className="text-center">
              <div className="text-8xl mb-4">👩‍🏫</div>
              <h3 className="text-2xl font-bold text-purple-600 mb-3">For Educators</h3>
              <p className="text-gray-600 mb-4">Access teaching tools, track student progress, and manage your classroom!</p>
              <Link to="/teachers" className="bg-purple-500 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-600 transition-colors inline-block">
                Get Started →
              </Link>
            </div>
          </div>
          
          {/* Fun fact */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 border-2 border-yellow-300">
            <div className="text-4xl mb-2">💡</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Did You Know?</h3>
            <p className="text-gray-700">Students who practice regularly improve their skills 3x faster than traditional methods!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Enhanced header with mobile navigation and login
const SimpleHeader = ({ showLogin, setShowLogin, isLoggedIn, user, handleLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">🎓 EduMaster</Link>
            <nav className="hidden md:flex space-x-6 ml-10">
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-semibold rounded-full hover:bg-blue-50 transition-all">🏠 Home</Link>
              <Link to="/math" className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-semibold rounded-full hover:bg-purple-50 transition-all">🧮 Math Fun</Link>
              <Link to="/students" className="text-gray-600 hover:text-green-600 px-3 py-2 text-sm font-semibold rounded-full hover:bg-green-50 transition-all">👥 Students</Link>
              <Link to="/teachers" className="text-gray-600 hover:text-yellow-600 px-3 py-2 text-sm font-semibold rounded-full hover:bg-yellow-50 transition-all">👩‍🏫 Teachers</Link>
              <Link to="/parents" className="text-gray-600 hover:text-pink-600 px-3 py-2 text-sm font-semibold rounded-full hover:bg-pink-50 transition-all">👨‍👩‍👧‍👦 Parents</Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* User Login/Profile Section */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{user?.username?.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="hidden md:block">
                    <span className="text-sm font-semibold text-gray-700">{user?.username}</span>
                    <div className="text-xs text-gray-500">{user?.type}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-red-600 px-3 py-1 rounded-full hover:bg-red-50 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-md"
              >
                Login
              </button>
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
  );
};

// Login Modal Component
const LoginModal = ({ showLogin, setShowLogin, handleLogin, loginData, setLoginData }) => (
  showLogin && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to EduMaster! 🎓</h2>
          <p className="text-gray-600">Sign in to continue your learning journey</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={loginData.username}
              onChange={(e) => setLoginData({...loginData, username: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowLogin(false)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-md"
            >
              Sign In
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo: Use any username and password to login</p>
        </div>
      </div>
    </div>
  )
);

function App() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [loginData, setLoginData] = React.useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username && loginData.password) {
      setUser({ username: loginData.username, type: 'Student' });
      setIsLoggedIn(true);
      setShowLogin(false);
      setLoginData({ username: '', password: '' });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <SimpleHeader 
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          isLoggedIn={isLoggedIn}
          user={user}
          handleLogout={handleLogout}
        />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<SimpleDashboard />} />
            <Route path="/dashboard" element={<SimpleDashboard />} />
            <Route path="/math" element={<MathLearningPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/parents" element={<ParentsPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
          </Routes>
        </main>
        
        <LoginModal 
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          handleLogin={handleLogin}
          loginData={loginData}
          setLoginData={setLoginData}
        />
      </div>
    </Router>
  );
}

export default App;