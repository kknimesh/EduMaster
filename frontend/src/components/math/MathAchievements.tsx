import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressIndicator from '../education/ProgressIndicator';
import { Icons } from '../../assets/icons';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'mastery' | 'streak' | 'speed' | 'accuracy' | 'consistency' | 'exploration';
  rarity: 'bronze' | 'silver' | 'gold' | 'diamond';
  isUnlocked: boolean;
  unlockedDate?: string;
  progress?: {
    current: number;
    required: number;
  };
  xpReward: number;
}

interface MathStats {
  totalProblemsCompleted: number;
  totalXP: number;
  currentLevel: number;
  xpToNextLevel: number;
  currentXP: number;
  averageAccuracy: number;
  longestStreak: number;
  currentStreak: number;
  fastestTime: number;
  totalTimeSpent: number;
  skillsMastered: number;
  totalSkills: number;
  weeklyGoal: {
    target: number;
    completed: number;
  };
}

interface Props {
  stats: MathStats;
  achievements: Achievement[];
  onSetWeeklyGoal: (goal: number) => void;
}

const MathAchievements: React.FC<Props> = ({ stats, achievements, onSetWeeklyGoal }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'bronze': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'diamond': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mastery': return '🎯';
      case 'streak': return '🔥';
      case 'speed': return '⚡';
      case 'accuracy': return '🎪';
      case 'consistency': return '📈';
      case 'exploration': return '🗺️';
      default: return '⭐';
    }
  };

  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 1000) + 1;
  };

  const calculateXPForNextLevel = (currentLevel: number) => {
    return currentLevel * 1000;
  };

  const levelProgress = (stats.currentXP % 1000) / 1000 * 100;

  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const lockedAchievements = achievements.filter(a => !a.isUnlocked);

  const recentAchievements = unlockedAchievements
    .sort((a, b) => new Date(b.unlockedDate!).getTime() - new Date(a.unlockedDate!).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {stats.currentLevel}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Current Level
            </div>
            <ProgressIndicator 
              currentProgress={levelProgress}
              totalProgress={100}
              variant="linear"
            />
            <div className="text-xs text-gray-500 mt-2">
              {stats.currentXP % 1000} / 1000 XP to next level
            </div>
          </div>
        </Card>

        <Card className="text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {stats.averageAccuracy}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Average Accuracy
            </div>
            <div className="flex items-center justify-center mt-3">
              <Icons.Target className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-xs text-gray-500">
                {stats.totalProblemsCompleted} problems completed
              </span>
            </div>
          </div>
        </Card>

        <Card className="text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {stats.longestStreak}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Longest Streak
            </div>
            <div className="flex items-center justify-center mt-3">
              <Icons.Zap className="w-4 h-4 text-orange-600 mr-1" />
              <span className="text-xs text-gray-500">
                Current: {stats.currentStreak}
              </span>
            </div>
          </div>
        </Card>

        <Card className="text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {stats.skillsMastered}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Skills Mastered
            </div>
            <ProgressIndicator 
              currentProgress={stats.skillsMastered}
              totalProgress={stats.totalSkills}
              variant="linear"
            />
            <div className="text-xs text-gray-500 mt-2">
              {stats.skillsMastered} / {stats.totalSkills} skills
            </div>
          </div>
        </Card>
      </div>

      {/* Weekly Goal */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Weekly Goal 🎯
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Complete {stats.weeklyGoal.target} problems this week
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSetWeeklyGoal(stats.weeklyGoal.target)}
            >
              Adjust Goal
            </Button>
          </div>
          
          <ProgressIndicator 
            currentProgress={stats.weeklyGoal.completed}
            totalProgress={stats.weeklyGoal.target}
            variant="linear"
          />
          
          <div className="flex items-center justify-between mt-2 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {stats.weeklyGoal.completed} / {stats.weeklyGoal.target} completed
            </span>
            <span className={`font-medium ${
              stats.weeklyGoal.completed >= stats.weeklyGoal.target ? 'text-green-600' : 'text-gray-600'
            }`}>
              {stats.weeklyGoal.completed >= stats.weeklyGoal.target 
                ? '🎉 Goal Achieved!' 
                : `${stats.weeklyGoal.target - stats.weeklyGoal.completed} to go`}
            </span>
          </div>
        </div>
      </Card>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              🏆 Recent Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentAchievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 ${getRarityColor(achievement.rarity)}`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">
                      {getCategoryIcon(achievement.category)}
                    </div>
                    <h4 className="font-bold mb-1">{achievement.title}</h4>
                    <p className="text-xs opacity-80">{achievement.description}</p>
                    <div className="text-xs mt-2 opacity-70">
                      Unlocked: {new Date(achievement.unlockedDate!).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* All Achievements */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              🏅 All Achievements
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {unlockedAchievements.length} / {achievements.length} unlocked
            </div>
          </div>

          {/* Achievement Categories */}
          <div className="space-y-6">
            {['mastery', 'streak', 'accuracy', 'speed', 'consistency', 'exploration'].map((category) => {
              const categoryAchievements = achievements.filter(a => a.category === category);
              if (categoryAchievements.length === 0) return null;

              return (
                <div key={category}>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                    <span className="mr-2">{getCategoryIcon(category)}</span>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryAchievements.map((achievement) => (
                      <div 
                        key={achievement.id}
                        className={`relative p-4 rounded-lg border-2 transition-all ${
                          achievement.isUnlocked 
                            ? `${getRarityColor(achievement.rarity)} shadow-sm`
                            : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60'
                        }`}
                      >
                        {!achievement.isUnlocked && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 bg-opacity-90 rounded-lg">
                            <Icons.Lock className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        
                        <div className="text-center">
                          <div className="text-xl mb-2">
                            {getCategoryIcon(achievement.category)}
                          </div>
                          <h5 className="font-semibold text-sm mb-2">
                            {achievement.title}
                          </h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                            {achievement.description}
                          </p>
                          
                          {achievement.progress && !achievement.isUnlocked && (
                            <div className="mb-3">
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ 
                                    width: `${(achievement.progress.current / achievement.progress.required) * 100}%` 
                                  }}
                                />
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {achievement.progress.current} / {achievement.progress.required}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between text-xs">
                            <span className={`px-2 py-1 rounded-full ${getRarityColor(achievement.rarity).replace('text-', 'bg-').replace('bg-', 'text-')}`}>
                              {achievement.rarity}
                            </span>
                            <span className="text-blue-600 font-medium">
                              +{achievement.xpReward} XP
                            </span>
                          </div>
                          
                          {achievement.isUnlocked && achievement.unlockedDate && (
                            <div className="text-xs text-gray-500 mt-2">
                              {new Date(achievement.unlockedDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

// Sample achievements data inspired by IXL
export const sampleAchievements: Achievement[] = [
  {
    id: 'first-correct',
    title: 'First Success',
    description: 'Answer your first problem correctly',
    icon: '🌟',
    category: 'mastery',
    rarity: 'bronze',
    isUnlocked: true,
    unlockedDate: '2024-03-10',
    xpReward: 50
  },
  {
    id: 'streak-5',
    title: 'Hot Streak',
    description: 'Get 5 problems correct in a row',
    icon: '🔥',
    category: 'streak',
    rarity: 'bronze',
    isUnlocked: true,
    unlockedDate: '2024-03-12',
    xpReward: 100
  },
  {
    id: 'streak-10',
    title: 'Fire Fighter',
    description: 'Get 10 problems correct in a row',
    icon: '🔥',
    category: 'streak',
    rarity: 'silver',
    isUnlocked: false,
    progress: { current: 7, required: 10 },
    xpReward: 200
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Answer 10 problems in under 2 minutes',
    icon: '⚡',
    category: 'speed',
    rarity: 'gold',
    isUnlocked: false,
    progress: { current: 3, required: 10 },
    xpReward: 300
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Complete a quiz with 100% accuracy',
    icon: '🎯',
    category: 'accuracy',
    rarity: 'gold',
    isUnlocked: true,
    unlockedDate: '2024-03-15',
    xpReward: 250
  },
  {
    id: 'math-master',
    title: 'Math Master',
    description: 'Master 10 different skills',
    icon: '👑',
    category: 'mastery',
    rarity: 'diamond',
    isUnlocked: false,
    progress: { current: 6, required: 10 },
    xpReward: 500
  },
  {
    id: 'daily-grind',
    title: 'Daily Grind',
    description: 'Practice math 7 days in a row',
    icon: '📅',
    category: 'consistency',
    rarity: 'silver',
    isUnlocked: false,
    progress: { current: 4, required: 7 },
    xpReward: 200
  },
  {
    id: 'explorer',
    title: 'Subject Explorer',
    description: 'Try problems from 5 different categories',
    icon: '🗺️',
    category: 'exploration',
    rarity: 'bronze',
    isUnlocked: true,
    unlockedDate: '2024-03-14',
    xpReward: 150
  },
  {
    id: 'hundred-club',
    title: 'Century Club',
    description: 'Complete 100 problems total',
    icon: '💯',
    category: 'mastery',
    rarity: 'silver',
    isUnlocked: false,
    progress: { current: 67, required: 100 },
    xpReward: 300
  },
  {
    id: 'accuracy-expert',
    title: 'Accuracy Expert',
    description: 'Maintain 90% accuracy over 50 problems',
    icon: '🎪',
    category: 'accuracy',
    rarity: 'gold',
    isUnlocked: false,
    progress: { current: 32, required: 50 },
    xpReward: 400
  }
];

export const sampleMathStats: MathStats = {
  totalProblemsCompleted: 67,
  totalXP: 3450,
  currentLevel: 4,
  xpToNextLevel: 1000,
  currentXP: 3450,
  averageAccuracy: 87,
  longestStreak: 12,
  currentStreak: 3,
  fastestTime: 45, // seconds
  totalTimeSpent: 1800, // seconds
  skillsMastered: 6,
  totalSkills: 15,
  weeklyGoal: {
    target: 25,
    completed: 18
  }
};

export default MathAchievements;