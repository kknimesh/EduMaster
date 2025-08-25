// Utility to create demo users for testing
export const createDemoUsers = () => {
  const demoUsers = [
    {
      id: 'demo_student_001',
      username: 'demo_student',
      email: 'student@demo.com',
      password: 'demo123',
      profileType: 'student',
      grade: '3',
      firstName: 'Alex',
      lastName: 'Student',
      avatar: '🧒',
      createdAt: new Date().toISOString(),
      progress: {
        totalXP: 150,
        level: 2,
        badges: ['first_login', 'math_beginner'],
        streakDays: 3,
        lastLoginDate: new Date().toISOString(),
        completedAssessments: {
          addition: {
            score: 85,
            level: 2,
            completedAt: new Date().toISOString(),
            timeSpent: 300000,
            accuracy: 85
          }
        },
        skillLevels: {
          addition: 2,
          subtraction: 1,
          multiplication: 1,
          division: 1,
          fractions: 1,
          algebra: 1
        },
        activityHistory: [
          {
            type: 'assessment',
            skill: 'addition',
            score: 85,
            timestamp: new Date().toISOString()
          }
        ],
        achievements: [
          {
            type: 'first_login',
            timestamp: new Date().toISOString()
          }
        ]
      },
      preferences: {
        theme: 'default',
        soundEnabled: true,
        difficultyPreference: 'adaptive'
      }
    },
    {
      id: 'demo_parent_001',
      username: 'demo_parent',
      email: 'parent@demo.com',
      password: 'demo123',
      profileType: 'parent',
      firstName: 'Sarah',
      lastName: 'Parent',
      avatar: '👩‍👧‍👦',
      createdAt: new Date().toISOString(),
      progress: {
        totalXP: 0,
        level: 1,
        badges: [],
        streakDays: 0,
        lastLoginDate: null,
        completedAssessments: {},
        skillLevels: {},
        activityHistory: [],
        achievements: []
      },
      preferences: {
        theme: 'default',
        soundEnabled: true,
        difficultyPreference: 'adaptive'
      }
    },
    {
      id: 'demo_teacher_001',
      username: 'demo_teacher',
      email: 'teacher@demo.com',
      password: 'demo123',
      profileType: 'teacher',
      firstName: 'Mike',
      lastName: 'Teacher',
      avatar: '👨‍🏫',
      createdAt: new Date().toISOString(),
      progress: {
        totalXP: 0,
        level: 1,
        badges: [],
        streakDays: 0,
        lastLoginDate: null,
        completedAssessments: {},
        skillLevels: {},
        activityHistory: [],
        achievements: []
      },
      preferences: {
        theme: 'default',
        soundEnabled: true,
        difficultyPreference: 'adaptive'
      }
    },
    {
      id: 'demo_student_002',
      username: 'emma_student',
      email: 'emma@demo.com',
      password: 'demo123',
      profileType: 'student',
      grade: '5',
      firstName: 'Emma',
      lastName: 'Wilson',
      avatar: '👧',
      createdAt: new Date().toISOString(),
      progress: {
        totalXP: 340,
        level: 4,
        badges: ['math_master', 'streak_champion', 'quick_learner'],
        streakDays: 7,
        lastLoginDate: new Date().toISOString(),
        completedAssessments: {
          addition: {
            score: 95,
            level: 3,
            completedAt: new Date().toISOString(),
            timeSpent: 240000,
            accuracy: 95
          },
          multiplication: {
            score: 88,
            level: 3,
            completedAt: new Date().toISOString(),
            timeSpent: 420000,
            accuracy: 88
          }
        },
        skillLevels: {
          addition: 3,
          subtraction: 3,
          multiplication: 3,
          division: 2,
          fractions: 2,
          algebra: 1
        },
        activityHistory: [
          {
            type: 'assessment',
            skill: 'addition',
            score: 95,
            timestamp: new Date().toISOString()
          },
          {
            type: 'xp_gain',
            amount: 50,
            activity: 'Completed multiplication activity',
            timestamp: new Date().toISOString()
          }
        ],
        achievements: [
          {
            type: 'level_up',
            level: 4,
            timestamp: new Date().toISOString()
          }
        ]
      },
      preferences: {
        theme: 'default',
        soundEnabled: true,
        difficultyPreference: 'adaptive'
      }
    }
  ];

  // Save demo users to localStorage
  localStorage.setItem('edumaster_users', JSON.stringify(demoUsers));
  console.log('Demo users created successfully!');
  
  return demoUsers;
};

// Function to reset demo users
export const resetDemoUsers = () => {
  localStorage.removeItem('edumaster_users');
  localStorage.removeItem('edumaster_user');
  return createDemoUsers();
};