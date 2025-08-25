import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = ({ showProfile, setShowProfile }) => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  if (!showProfile || !user) return null;

  const startEditing = () => {
    setEditData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      grade: user.grade || ''
    });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setEditData({});
    setIsEditing(false);
  };

  const saveProfile = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  const getProgressPercentage = (current, max) => {
    return Math.min((current / max) * 100, 100);
  };

  const getLevelProgress = () => {
    const currentLevelXP = user.progress.totalXP % 100;
    return (currentLevelXP / 100) * 100;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

  const getRecentAchievements = () => {
    return user.progress.achievements?.slice(-3) || [];
  };

  const avatarOptions = ['🧒', '👦', '👧', '🧑', '👨', '👩', '🤖', '🦸‍♂️', '🦸‍♀️', '🧙‍♂️', '🧙‍♀️', '🎭'];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        // Close modal when clicking on backdrop (not on the modal content)
        if (e.target === e.currentTarget) {
          setShowProfile(false);
        }
      }}
    >
      <div className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center space-x-4">
            <div className="text-6xl">{user.avatar}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-600 capitalize">
                {user.profileType} • Level {user.progress.level}
              </p>
              {user.grade && (
                <p className="text-sm text-gray-500">Grade {user.grade}</p>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            {!isEditing ? (
              <>
                <button
                  onClick={startEditing}
                  className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => setShowProfile(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-all"
                >
                  ✕ Close
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={saveProfile}
                  className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all"
                >
                  ✓ Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Edit Mode */}
        {isEditing && (
          <div className="bg-blue-50 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Edit Profile</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={editData.firstName}
                  onChange={(e) => setEditData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={editData.lastName}
                  onChange={(e) => setEditData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>

            {user.profileType === 'student' && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Grade</label>
                <select
                  value={editData.grade}
                  onChange={(e) => setEditData(prev => ({ ...prev, grade: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select grade</option>
                  <option value="K">Kindergarten</option>
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map(grade => (
                    <option key={grade} value={grade.toString()}>{grade}th Grade</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Avatar</label>
              <div className="grid grid-cols-6 gap-2">
                {avatarOptions.map(avatar => (
                  <button
                    key={avatar}
                    type="button"
                    onClick={() => setEditData(prev => ({ ...prev, avatar }))}
                    className={`text-3xl p-2 rounded-lg transition-all ${
                      editData.avatar === avatar 
                        ? 'bg-blue-200 border-2 border-blue-500' 
                        : 'bg-gray-100 border-2 border-transparent hover:bg-gray-200'
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Link 
            to="/adaptive-learning"
            className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl hover:from-blue-200 hover:to-blue-300 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            onClick={() => setShowProfile(false)}
          >
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-blue-800">{user.progress.totalXP}</div>
            <div className="text-sm text-blue-600">Total XP</div>
            <div className="text-xs text-blue-500 mt-1 opacity-75">Click to practice</div>
          </Link>
          
          <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl hover:from-green-200 hover:to-green-300 transition-all duration-300 transform hover:scale-105 cursor-pointer"
               onClick={() => {
                 const levelSection = document.querySelector('.level-progress-section');
                 if (levelSection) levelSection.scrollIntoView({ behavior: 'smooth' });
               }}>
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-green-800">{user.progress.level}</div>
            <div className="text-sm text-green-600">Current Level</div>
            <div className="text-xs text-green-500 mt-1 opacity-75">Click to view progress</div>
          </div>
          
          <Link 
            to="/adaptive-learning"
            className="bg-gradient-to-br from-orange-100 to-orange-200 p-6 rounded-2xl hover:from-orange-200 hover:to-orange-300 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            onClick={() => setShowProfile(false)}
          >
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-orange-800">{user.progress.streakDays}</div>
            <div className="text-sm text-orange-600">Day Streak</div>
            <div className="text-xs text-orange-500 mt-1 opacity-75">Click to continue streak</div>
          </Link>
          
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-2xl hover:from-purple-200 hover:to-purple-300 transition-all duration-300 transform hover:scale-105 cursor-pointer"
               onClick={() => {
                 const achievementsSection = document.querySelector('.achievements-section');
                 if (achievementsSection) achievementsSection.scrollIntoView({ behavior: 'smooth' });
               }}>
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-purple-800">{user.progress.badges?.length || 0}</div>
            <div className="text-sm text-purple-600">Badges Earned</div>
            <div className="text-xs text-purple-500 mt-1 opacity-75">Click to view badges</div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="level-progress-section bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 p-6 rounded-2xl mb-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-gray-800">Level {user.progress.level} Progress</h3>
            <span className="text-sm text-gray-600">{user.progress.totalXP % 100}/100 XP</span>
          </div>
          <div className="w-full bg-white rounded-full h-4 mb-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${getLevelProgress()}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            {100 - (user.progress.totalXP % 100)} XP until Level {user.progress.level + 1}!
          </p>
        </div>

        {/* Skills Progress */}
        {user.profileType === 'student' && (
          <div className="bg-gray-50 p-6 rounded-2xl mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📚 Skill Levels</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(user.progress.skillLevels || {}).map(([skill, level]) => (
                <Link 
                  key={skill}
                  to="/adaptive-learning"
                  className="bg-white p-4 rounded-xl hover:bg-blue-50 hover:border-blue-200 border-2 border-transparent transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => setShowProfile(false)}
                >
                  <div className="text-sm font-semibold text-gray-700 capitalize mb-1">{skill}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-lg font-bold text-blue-600">Level {level}</div>
                      <div className="ml-2 text-yellow-500">
                        {'⭐'.repeat(Math.min(level, 5))}
                      </div>
                    </div>
                    <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </div>
                  </div>
                  <div className="text-xs text-blue-500 mt-1 opacity-75">Click to practice</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recent Achievements */}
        {getRecentAchievements().length > 0 && (
          <div className="achievements-section bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🏆 Recent Achievements</h3>
            <div className="space-y-3">
              {getRecentAchievements().map((achievement, index) => (
                <Link
                  key={index}
                  to="/adaptive-learning"
                  className="bg-white p-4 rounded-xl flex items-center hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border-2 border-transparent hover:border-purple-200 transition-all duration-300 transform hover:scale-102 cursor-pointer"
                  onClick={() => setShowProfile(false)}
                >
                  <div className="text-2xl mr-3">🎉</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 capitalize">
                      {achievement.type.replace('_', ' ')}
                      {achievement.level && ` - Level ${achievement.level}`}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(achievement.timestamp)}
                    </div>
                    <div className="text-xs text-purple-500 mt-1 opacity-75">Click to continue learning</div>
                  </div>
                  <div className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Account Info */}
        <div className="bg-gray-100 p-6 rounded-2xl mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold text-gray-700">Username:</span> {user.username}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Email:</span> {user.email}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Member Since:</span> {formatDate(user.createdAt)}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Last Login:</span> {formatDate(user.progress.lastLoginDate)}
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="text-center">
          <button
            onClick={() => {
              logout();
              setShowProfile(false);
            }}
            className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;