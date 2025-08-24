import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Tabs from '../components/navigation/Tabs';
import { BarChart, LineChart } from '../components/charts/AdvancedChart';
import ProgressIndicator from '../components/education/ProgressIndicator';
import MathQuizEngine from '../components/math/MathQuizEngine';
import MathAchievements, { sampleAchievements, sampleMathStats } from '../components/math/MathAchievements';
import { Icons } from '../assets/icons/index';

interface MathSkill {
  id: string;
  title: string;
  description: string;
  grade: string;
  category: 'algebra' | 'geometry' | 'arithmetic' | 'fractions' | 'decimals' | 'statistics';
  difficulty: 1 | 2 | 3 | 4 | 5;
  mastery: number;
  questionsAnswered: number;
  correctAnswers: number;
  streak: number;
  lastAttempt?: string;
  isLocked: boolean;
}

const MathLearningPage: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState('5');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeTab, setActiveTab] = useState('practice');
  const [activeSkill, setActiveSkill] = useState<MathSkill | null>(null);
  const [showQuizEngine, setShowQuizEngine] = useState(false);
  const [mathStats, setMathStats] = useState(sampleMathStats);

  // Sample math skills data inspired by IXL
  const mathSkills: MathSkill[] = [
    {
      id: 'add-subtract-decimals',
      title: 'Add and subtract decimals',
      description: 'Learn to add and subtract decimal numbers with precision',
      grade: '5',
      category: 'decimals',
      difficulty: 3,
      mastery: 85,
      questionsAnswered: 24,
      correctAnswers: 20,
      streak: 5,
      lastAttempt: '2024-03-15',
      isLocked: false
    },
    {
      id: 'multiply-decimals',
      title: 'Multiply decimals by whole numbers',
      description: 'Practice multiplying decimal numbers by whole numbers',
      grade: '5',
      category: 'decimals',
      difficulty: 4,
      mastery: 92,
      questionsAnswered: 18,
      correctAnswers: 17,
      streak: 8,
      lastAttempt: '2024-03-14',
      isLocked: false
    },
    {
      id: 'fraction-equivalents',
      title: 'Identify equivalent fractions',
      description: 'Find fractions that represent the same value',
      grade: '5',
      category: 'fractions',
      difficulty: 2,
      mastery: 78,
      questionsAnswered: 15,
      correctAnswers: 12,
      streak: 3,
      lastAttempt: '2024-03-13',
      isLocked: false
    },
    {
      id: 'area-rectangles',
      title: 'Area of rectangles and squares',
      description: 'Calculate the area of rectangular shapes',
      grade: '5',
      category: 'geometry',
      difficulty: 3,
      mastery: 65,
      questionsAnswered: 12,
      correctAnswers: 8,
      streak: 0,
      lastAttempt: '2024-03-12',
      isLocked: false
    },
    {
      id: 'linear-equations',
      title: 'Solve one-step linear equations',
      description: 'Solve equations with one variable using inverse operations',
      grade: '6',
      category: 'algebra',
      difficulty: 4,
      mastery: 45,
      questionsAnswered: 8,
      correctAnswers: 4,
      streak: 0,
      isLocked: false
    },
    {
      id: 'mean-median-mode',
      title: 'Mean, median, and mode',
      description: 'Find the mean, median, and mode of data sets',
      grade: '6',
      category: 'statistics',
      difficulty: 3,
      mastery: 88,
      questionsAnswered: 20,
      correctAnswers: 18,
      streak: 6,
      lastAttempt: '2024-03-16',
      isLocked: false
    }
  ];

  const filteredSkills = mathSkills.filter(skill => {
    const matchesGrade = selectedGrade === 'all' || skill.grade === selectedGrade;
    const matchesCategory = !selectedCategory || skill.category === selectedCategory;
    return matchesGrade && matchesCategory;
  });

  const startQuiz = (skill: MathSkill) => {
    setActiveSkill(skill);
    setShowQuizEngine(true);
  };

  const handleQuizComplete = (results: any) => {
    // Update math stats based on quiz results
    const newStats = {
      ...mathStats,
      totalProblemsCompleted: mathStats.totalProblemsCompleted + results.totalQuestions,
      totalXP: mathStats.totalXP + (results.score * 20),
      weeklyGoal: {
        ...mathStats.weeklyGoal,
        completed: mathStats.weeklyGoal.completed + results.totalQuestions
      }
    };
    setMathStats(newStats);
    setShowQuizEngine(false);
    setActiveSkill(null);
  };

  const handleQuizExit = () => {
    setShowQuizEngine(false);
    setActiveSkill(null);
  };

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 90) return 'text-green-600 bg-green-100';
    if (mastery >= 70) return 'text-blue-600 bg-blue-100';
    if (mastery >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const categoryData = [
    { label: 'Decimals', value: mathSkills.filter(s => s.category === 'decimals').length, color: '#3b82f6' },
    { label: 'Fractions', value: mathSkills.filter(s => s.category === 'fractions').length, color: '#10b981' },
    { label: 'Geometry', value: mathSkills.filter(s => s.category === 'geometry').length, color: '#f59e0b' },
    { label: 'Algebra', value: mathSkills.filter(s => s.category === 'algebra').length, color: '#8b5cf6' },
    { label: 'Statistics', value: mathSkills.filter(s => s.category === 'statistics').length, color: '#ef4444' }
  ];

  const progressData = [
    { date: new Date('2024-03-10'), value: 65 },
    { date: new Date('2024-03-11'), value: 70 },
    { date: new Date('2024-03-12'), value: 68 },
    { date: new Date('2024-03-13'), value: 75 },
    { date: new Date('2024-03-14'), value: 78 },
    { date: new Date('2024-03-15'), value: 82 },
    { date: new Date('2024-03-16'), value: 85 }
  ];

  // Show quiz engine when active
  if (showQuizEngine && activeSkill) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <MathQuizEngine
            problemType="mixed"
            difficulty={activeSkill.difficulty}
            problemCount={5}
            grade={parseInt(activeSkill.grade)}
            onComplete={handleQuizComplete}
            onExit={handleQuizExit}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🧮 EduMaster Math Learning
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Master math skills with personalized practice, instant feedback, and progress tracking - inspired by IXL Learning
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <Tabs
            tabs={[
              { id: 'practice', label: 'Practice Skills', icon: 'Calculator' },
              { id: 'progress', label: 'My Progress', icon: 'TrendingUp' },
              { id: 'achievements', label: 'Achievements', icon: 'Trophy' }
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'practice' && (
          <div className="space-y-8">
            {/* Quick Stats Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <Card>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Your Progress This Week
                  </h2>
                  <LineChart data={progressData} height={250} />
                </Card>
              </div>
              
              <Card>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Skills by Category
                </h2>
                <BarChart data={categoryData} />
              </Card>
            </div>

            {/* Filters */}
            <Card className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    options={[
                      { value: 'all', label: 'All Grades' },
                      { value: '3', label: 'Grade 3' },
                      { value: '4', label: 'Grade 4' },
                      { value: '5', label: 'Grade 5' },
                      { value: '6', label: 'Grade 6' },
                      { value: '7', label: 'Grade 7' },
                      { value: '8', label: 'Grade 8' }
                    ]}
                  />
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    options={[
                      { value: '', label: 'All Categories' },
                      { value: 'arithmetic', label: 'Arithmetic' },
                      { value: 'fractions', label: 'Fractions' },
                      { value: 'decimals', label: 'Decimals' },
                      { value: 'geometry', label: 'Geometry' },
                      { value: 'algebra', label: 'Algebra' },
                      { value: 'statistics', label: 'Statistics' }
                    ]}
                  />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredSkills.length} skills available
                </div>
              </div>
            </Card>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((skill) => (
                <Card key={skill.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          Grade {skill.grade}
                        </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full capitalize">
                          {skill.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {skill.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {skill.description}
                      </p>
                    </div>
                    
                    <div className="text-center ml-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getMasteryColor(skill.mastery)}`}>
                        {skill.mastery}% Mastery
                      </div>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="mb-4">
                    <ProgressIndicator 
                      currentProgress={skill.mastery} 
                      totalProgress={100} 
                      variant="linear"
                    />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <span>{skill.questionsAnswered} questions</span>
                      <span>•</span>
                      <span>{Math.round((skill.correctAnswers / skill.questionsAnswered) * 100)}% correct</span>
                    </div>
                    {skill.streak > 0 && (
                      <div className="flex items-center space-x-1 text-orange-600">
                        <Icons.Zap className="w-4 h-4" />
                        <span>{skill.streak} streak</span>
                      </div>
                    )}
                  </div>

                  {/* Difficulty Stars */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Icons.Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < skill.difficulty ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      Difficulty {skill.difficulty}/5
                    </span>
                  </div>

                  {/* Action Button */}
                  <Button 
                    variant="primary" 
                    onClick={() => startQuiz(skill)}
                    disabled={skill.isLocked}
                    className="w-full"
                  >
                    {skill.isLocked ? (
                      <>
                        <Icons.Lock className="w-4 h-4 mr-2" />
                        Locked
                      </>
                    ) : (
                      <>
                        <Icons.Play className="w-4 h-4 mr-2" />
                        Practice Now
                      </>
                    )}
                  </Button>
                  
                  {skill.lastAttempt && (
                    <p className="text-xs text-gray-400 mt-2 text-center">
                      Last attempt: {new Date(skill.lastAttempt).toLocaleDateString()}
                    </p>
                  )}
                </Card>
              ))}
            </div>

            {filteredSkills.length === 0 && (
              <div className="text-center py-12">
                <Icons.BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No skills found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your grade level or category filters.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-8">
            {/* Overall Progress */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <div className="p-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    Level {mathStats.currentLevel}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Math Master Level
                  </div>
                  <ProgressIndicator 
                    currentProgress={(mathStats.currentXP % 1000)}
                    totalProgress={1000}
                    variant="linear"
                  />
                  <div className="text-xs text-gray-500 mt-2">
                    {mathStats.currentXP % 1000} / 1000 XP to next level
                  </div>
                </div>
              </Card>

              <Card className="text-center">
                <div className="p-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {mathStats.averageAccuracy}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Average Accuracy
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    {mathStats.totalProblemsCompleted} problems completed
                  </div>
                </div>
              </Card>

              <Card className="text-center">
                <div className="p-6">
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    {mathStats.longestStreak}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Longest Streak
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    Current streak: {mathStats.currentStreak}
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
                      Complete {mathStats.weeklyGoal.target} problems this week
                    </p>
                  </div>
                </div>
                
                <ProgressIndicator 
                  currentProgress={mathStats.weeklyGoal.completed}
                  totalProgress={mathStats.weeklyGoal.target}
                  variant="linear"
                />
                
                <div className="flex items-center justify-between mt-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {mathStats.weeklyGoal.completed} / {mathStats.weeklyGoal.target} completed
                  </span>
                  <span className={`font-medium ${
                    mathStats.weeklyGoal.completed >= mathStats.weeklyGoal.target ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {mathStats.weeklyGoal.completed >= mathStats.weeklyGoal.target 
                      ? '🎉 Goal Achieved!' 
                      : `${mathStats.weeklyGoal.target - mathStats.weeklyGoal.completed} to go`}
                  </span>
                </div>
              </div>
            </Card>

            {/* Progress Chart */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Your Progress This Week
                </h3>
                <LineChart data={progressData} height={300} />
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'achievements' && (
          <MathAchievements 
            stats={mathStats}
            achievements={sampleAchievements}
            onSetWeeklyGoal={(goal) => {
              setMathStats({
                ...mathStats,
                weeklyGoal: { ...mathStats.weeklyGoal, target: goal }
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MathLearningPage;