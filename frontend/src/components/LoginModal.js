import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginModal = ({ showLogin, setShowLogin, switchToSignup }) => {
  const { login, resendVerification } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!credentials.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!credentials.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    const result = await login(credentials);
    
    if (result.success) {
      setShowLogin(false);
      setCredentials({ username: '', password: '' });
      setErrors({});
    } else {
      setErrors({ submit: result.error });
      // Show resend verification button if error is about email verification
      if (result.error.includes('verify your email')) {
        setShowResendVerification(true);
      }
    }
    
    setIsLoading(false);
  };

  const handleResendVerification = async () => {
    // We need to find the user's email from their username
    const users = JSON.parse(localStorage.getItem('edumaster_users') || '[]');
    const user = users.find(u => u.username === credentials.username);
    
    if (user) {
      const result = await resendVerification(user.email);
      if (result.success) {
        setErrors({ 
          submit: '', 
          verification: result.message 
        });
        setShowResendVerification(false);
      } else {
        setErrors({ submit: result.error });
      }
    }
  };


  if (!showLogin) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        // Close modal when clicking on backdrop (not on the modal content)
        if (e.target === e.currentTarget) {
          setShowLogin(false);
        }
      }}
    >
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back! 🎓</h2>
          <p className="text-gray-600">Sign in to continue your learning journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                errors.username ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
              }`}
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                errors.password ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
              }`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-red-600 text-sm">{errors.submit}</p>
              {showResendVerification && (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-semibold underline"
                >
                  Resend Verification Email
                </button>
              )}
            </div>
          )}

          {errors.verification && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
              <p className="text-green-600 text-sm">{errors.verification}</p>
            </div>
          )}
          
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
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-md disabled:opacity-50"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={switchToSignup}
              className="text-blue-600 font-semibold hover:text-blue-700"
            >
              Sign Up Free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;