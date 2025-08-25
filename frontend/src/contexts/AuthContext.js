import React, { createContext, useContext, useState, useEffect } from 'react';
import { createDemoUsers } from '../utils/createDemoUsers';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage and create demo users if needed
  useEffect(() => {
    try {
      // Create demo users if none exist
      const existingUsers = localStorage.getItem('edumaster_users');
      if (!existingUsers) {
        createDemoUsers();
      }

      // Load current user
      const savedUser = localStorage.getItem('edumaster_user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      localStorage.removeItem('edumaster_user');
    }
    setIsLoading(false);
  }, []);

  // Save user data to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('edumaster_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('edumaster_user');
    }
  }, [user]);


  const signup = async (userData) => {
    try {
      // Check if username already exists
      const existingUsers = getStoredUsers();
      if (existingUsers.find(u => u.username === userData.username)) {
        throw new Error('Username already exists');
      }

      // Create new user with default data
      const newUser = {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        password: userData.password, // In production, this should be hashed
        profileType: userData.profileType,
        grade: userData.grade || null,
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatar: userData.avatar || '🧒',
        students: userData.students || [], // For parent users
        createdAt: new Date().toISOString(),
        progress: {
          totalXP: 0,
          level: 1,
          badges: [],
          streakDays: 0,
          lastLoginDate: null,
          completedAssessments: {},
          skillLevels: {
            addition: 1,
            subtraction: 1,
            multiplication: 1,
            division: 1,
            fractions: 1,
            algebra: 1
          },
          activityHistory: [],
          achievements: []
        },
        preferences: {
          theme: 'default',
          soundEnabled: true,
          difficultyPreference: 'adaptive'
        }
      };

      // Save to stored users
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('edumaster_users', JSON.stringify(updatedUsers));

      // Set as current user (without password for security)
      const userForSession = { ...newUser };
      delete userForSession.password;
      setUser(userForSession);

      return { success: true, user: userForSession };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (credentials) => {
    try {
      const existingUsers = getStoredUsers();
      const foundUser = existingUsers.find(
        u => u.username === credentials.username && u.password === credentials.password
      );

      if (!foundUser) {
        throw new Error('Invalid username or password');
      }

      // Update last login
      foundUser.progress.lastLoginDate = new Date().toISOString();
      
      // Update streak days
      const today = new Date();
      const lastLogin = foundUser.progress.lastLoginDate ? new Date(foundUser.progress.lastLoginDate) : null;
      if (lastLogin) {
        const daysDiff = Math.floor((today - lastLogin) / (1000 * 60 * 60 * 24));
        if (daysDiff === 1) {
          foundUser.progress.streakDays += 1;
        } else if (daysDiff > 1) {
          foundUser.progress.streakDays = 1;
        }
      } else {
        foundUser.progress.streakDays = 1;
      }

      // Save updated user data
      const updatedUsers = existingUsers.map(u => u.id === foundUser.id ? foundUser : u);
      localStorage.setItem('edumaster_users', JSON.stringify(updatedUsers));

      // Set as current user (without password)
      const userForSession = { ...foundUser };
      delete userForSession.password;
      setUser(userForSession);

      return { success: true, user: userForSession };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProgress = (progressData) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      progress: {
        ...user.progress,
        ...progressData,
        lastActivityDate: new Date().toISOString()
      }
    };

    // Update in stored users
    const existingUsers = getStoredUsers();
    const updatedUsers = existingUsers.map(u => 
      u.id === user.id ? { ...updatedUser, password: u.password } : u
    );
    localStorage.setItem('edumaster_users', JSON.stringify(updatedUsers));

    // Update current user session
    setUser(updatedUser);
  };

  const saveAssessmentResult = (assessmentData) => {
    if (!user) return;

    const updatedProgress = {
      ...user.progress,
      completedAssessments: {
        ...user.progress.completedAssessments,
        [assessmentData.skill]: {
          score: assessmentData.score,
          level: assessmentData.level,
          completedAt: new Date().toISOString(),
          timeSpent: assessmentData.timeSpent,
          accuracy: assessmentData.accuracy
        }
      },
      activityHistory: [
        ...user.progress.activityHistory,
        {
          type: 'assessment',
          skill: assessmentData.skill,
          score: assessmentData.score,
          timestamp: new Date().toISOString()
        }
      ].slice(-50) // Keep last 50 activities
    };

    updateUserProgress(updatedProgress);
  };

  const addXP = (xpAmount, activity) => {
    if (!user) return;

    const newTotalXP = user.progress.totalXP + xpAmount;
    const newLevel = Math.floor(newTotalXP / 100) + 1; // Level up every 100 XP

    const updatedProgress = {
      totalXP: newTotalXP,
      level: newLevel,
      activityHistory: [
        ...user.progress.activityHistory,
        {
          type: 'xp_gain',
          amount: xpAmount,
          activity: activity,
          timestamp: new Date().toISOString()
        }
      ].slice(-50)
    };

    // Check for level up achievement
    if (newLevel > user.progress.level) {
      updatedProgress.achievements = [
        ...user.progress.achievements,
        {
          type: 'level_up',
          level: newLevel,
          timestamp: new Date().toISOString()
        }
      ];
    }

    updateUserProgress(updatedProgress);
  };

  const updateProfile = (profileData) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...profileData
    };

    // Update in stored users
    const existingUsers = getStoredUsers();
    const updatedUsers = existingUsers.map(u => 
      u.id === user.id ? { ...updatedUser, password: u.password } : u
    );
    localStorage.setItem('edumaster_users', JSON.stringify(updatedUsers));

    // Update current user session
    setUser(updatedUser);
  };

  const getStoredUsers = () => {
    try {
      const users = localStorage.getItem('edumaster_users');
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error reading stored users:', error);
      return [];
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signup,
    login,
    logout,
    updateUserProgress,
    saveAssessmentResult,
    addXP,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};