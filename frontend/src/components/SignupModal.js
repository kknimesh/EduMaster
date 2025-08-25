import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';

const SignupModal = ({ showSignup, setShowSignup, switchToLogin }) => {
  const { signup, signupWithGoogle } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    profileType: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    grade: '',
    avatar: '🧒',
    parentEmail: '',
    students: []
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const avatarOptions = ['🧒', '👦', '👧', '🧑', '👨', '👩', '🤖', '🦸‍♂️', '🦸‍♀️', '🧙‍♂️', '🧙‍♀️', '🎭'];

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.profileType) newErrors.profileType = 'Please select a profile type';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (formData.profileType === 'student' && !formData.grade) {
      newErrors.grade = 'Please select your grade level';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStudentDetails = () => {
    const newErrors = {};
    if (formData.students.length === 0) {
      newErrors.students = 'Please add at least one student';
    }
    
    formData.students.forEach((student, index) => {
      if (!student.firstName.trim()) {
        newErrors[`student${index}FirstName`] = 'Student first name is required';
      }
      if (!student.lastName.trim()) {
        newErrors[`student${index}LastName`] = 'Student last name is required';
      }
      if (!student.grade) {
        newErrors[`student${index}Grade`] = 'Student grade is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addStudent = () => {
    setFormData(prev => ({
      ...prev,
      students: [...prev.students, {
        firstName: '',
        lastName: '',
        grade: '',
        avatar: '🧒'
      }]
    }));
  };

  const removeStudent = (index) => {
    setFormData(prev => ({
      ...prev,
      students: prev.students.filter((_, i) => i !== index)
    }));
  };

  const updateStudent = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      students: prev.students.map((student, i) => 
        i === index ? { ...student, [field]: value } : student
      )
    }));
    // Clear errors for this field
    const errorKey = `student${index}${field.charAt(0).toUpperCase() + field.slice(1)}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      if (formData.profileType === 'parent') {
        if (formData.students.length === 0) {
          addStudent(); // Add initial student for parent
        }
        setCurrentStep(3); // Go to student details step for parents
      } else {
        setCurrentStep(2); // Go to account details for students/teachers
      }
    } else if (currentStep === 3 && validateStudentDetails()) {
      setCurrentStep(2); // Go to account details after student details
    }
  };

  const handleBack = () => {
    if (currentStep === 3) {
      setCurrentStep(1); // Go back to basic info from student details
    } else if (currentStep === 2) {
      if (formData.profileType === 'parent') {
        setCurrentStep(3); // Go back to student details for parents
      } else {
        setCurrentStep(1); // Go back to basic info for students/teachers
      }
    }
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;

    setIsLoading(true);
    const result = await signup(formData);
    
    if (result.success) {
      setShowSignup(false);
      setCurrentStep(1);
      setFormData({
        profileType: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        grade: '',
        avatar: '🧒',
        parentEmail: '',
        students: []
      });
    } else {
      setErrors({ submit: result.error });
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        // Fetch user info from Google
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userData = await userInfo.json();
        
        const result = await signupWithGoogle({
          email: userData.email,
          firstName: userData.given_name,
          lastName: userData.family_name,
          avatar: '🧒', // Default avatar for Google users
          profileType: 'student' // Default to student, can be changed later
        });
        
        if (result.success) {
          setShowSignup(false);
          setCurrentStep(1);
        } else {
          setErrors({ submit: result.error });
        }
      } catch (error) {
        setErrors({ submit: 'Google sign up failed. Please try again.' });
      }
      setIsLoading(false);
    },
    onError: () => {
      setErrors({ submit: 'Google sign up failed. Please try again.' });
    },
  });

  if (!showSignup) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        // Close modal when clicking on backdrop (not on the modal content)
        if (e.target === e.currentTarget) {
          setShowSignup(false);
        }
      }}
    >
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Step 1: Profile Type & Basic Info */}
        {currentStep === 1 && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Join EduMaster! 🚀</h2>
              <p className="text-gray-600">Let's create your learning profile</p>
            </div>

            {/* Google Sign Up Button */}
            <div className="mb-6">
              <button
                onClick={() => googleLogin()}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                <div className="w-5 h-5">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                {isLoading ? 'Signing up...' : 'Continue with Google'}
              </button>
            </div>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-4 text-gray-500 text-sm font-medium">OR</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div className="space-y-6">
              {/* Profile Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">I am a:</label>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={() => handleInputChange('profileType', 'student')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.profileType === 'student' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🧒</span>
                      <div>
                        <div className="font-bold text-blue-600">Student</div>
                        <div className="text-sm text-gray-600">I want to learn and have fun!</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleInputChange('profileType', 'parent')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.profileType === 'parent' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">👨‍👩‍👧‍👦</span>
                      <div>
                        <div className="font-bold text-green-600">Parent/Guardian</div>
                        <div className="text-sm text-gray-600">I want to track my child's progress</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleInputChange('profileType', 'teacher')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.profileType === 'teacher' 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-300 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">👩‍🏫</span>
                      <div>
                        <div className="font-bold text-purple-600">Teacher</div>
                        <div className="text-sm text-gray-600">I want to manage my students</div>
                      </div>
                    </div>
                  </button>
                </div>
                {errors.profileType && <p className="text-red-500 text-sm mt-1">{errors.profileType}</p>}
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="First name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Grade Selection for Students */}
              {formData.profileType === 'student' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Grade Level</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => handleInputChange('grade', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select your grade</option>
                    <option value="K">Kindergarten</option>
                    <option value="1">1st Grade</option>
                    <option value="2">2nd Grade</option>
                    <option value="3">3rd Grade</option>
                    <option value="4">4th Grade</option>
                    <option value="5">5th Grade</option>
                    <option value="6">6th Grade</option>
                    <option value="7">7th Grade</option>
                    <option value="8">8th Grade</option>
                    <option value="9">9th Grade</option>
                    <option value="10">10th Grade</option>
                    <option value="11">11th Grade</option>
                    <option value="12">12th Grade</option>
                  </select>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSignup(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-md"
                >
                  Next Step →
                </button>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Student Details (Parents Only) */}
        {currentStep === 3 && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Student Information 👨‍👩‍👧‍👦</h2>
              <p className="text-gray-600">Tell us about your student(s)</p>
            </div>

            <div className="space-y-6">
              {formData.students.map((student, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      Student {index + 1}
                    </h3>
                    {formData.students.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStudent(index)}
                        className="text-red-500 hover:text-red-700 font-semibold text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={student.firstName}
                        onChange={(e) => updateStudent(index, 'firstName', e.target.value)}
                        className={`w-full px-3 py-2 border-2 rounded-xl focus:outline-none transition-all ${
                          errors[`student${index}FirstName`] ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                        placeholder="Student's first name"
                      />
                      {errors[`student${index}FirstName`] && 
                        <p className="text-red-500 text-xs mt-1">{errors[`student${index}FirstName`]}</p>
                      }
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={student.lastName}
                        onChange={(e) => updateStudent(index, 'lastName', e.target.value)}
                        className={`w-full px-3 py-2 border-2 rounded-xl focus:outline-none transition-all ${
                          errors[`student${index}LastName`] ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                        placeholder="Student's last name"
                      />
                      {errors[`student${index}LastName`] && 
                        <p className="text-red-500 text-xs mt-1">{errors[`student${index}LastName`]}</p>
                      }
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Grade Level</label>
                      <select
                        value={student.grade}
                        onChange={(e) => updateStudent(index, 'grade', e.target.value)}
                        className={`w-full px-3 py-2 border-2 rounded-xl focus:outline-none transition-all ${
                          errors[`student${index}Grade`] ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                      >
                        <option value="">Select grade</option>
                        <option value="K">Kindergarten</option>
                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(grade => (
                          <option key={grade} value={grade.toString()}>{grade}th Grade</option>
                        ))}
                      </select>
                      {errors[`student${index}Grade`] && 
                        <p className="text-red-500 text-xs mt-1">{errors[`student${index}Grade`]}</p>
                      }
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Avatar</label>
                      <div className="grid grid-cols-4 gap-1">
                        {avatarOptions.slice(0, 8).map(avatar => (
                          <button
                            key={avatar}
                            type="button"
                            onClick={() => updateStudent(index, 'avatar', avatar)}
                            className={`text-lg p-1 rounded-lg transition-all ${
                              student.avatar === avatar 
                                ? 'bg-blue-200 border-2 border-blue-500' 
                                : 'bg-white border-2 border-transparent hover:bg-gray-100'
                            }`}
                          >
                            {avatar}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {errors.students && <p className="text-red-500 text-sm">{errors.students}</p>}

              <div className="text-center">
                <button
                  type="button"
                  onClick={addStudent}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-xl border-2 border-green-300 hover:bg-green-200 transition-all font-semibold"
                >
                  + Add Another Student
                </button>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-md"
                >
                  Next Step →
                </button>
              </div>
            </div>
          </>
        )}

        {/* Step 2: Account Details */}
        {currentStep === 2 && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Account Details ⚡</h2>
              <p className="text-gray-600">Choose your login credentials</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Avatar Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Choose Your Avatar</label>
                <div className="grid grid-cols-6 gap-2 mb-2">
                  {avatarOptions.map(avatar => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => handleInputChange('avatar', avatar)}
                      className={`text-2xl p-2 rounded-lg transition-all ${
                        formData.avatar === avatar 
                          ? 'bg-blue-100 border-2 border-blue-500' 
                          : 'bg-gray-100 border-2 border-transparent hover:bg-gray-200'
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                    errors.username ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Choose a unique username"
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Create a secure password"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-red-600 text-sm">{errors.submit}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-md disabled:opacity-50"
                >
                  {isLoading ? 'Creating...' : 'Create Account 🎉'}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={switchToLogin}
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Sign In
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupModal;