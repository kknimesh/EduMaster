import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdaptiveActivity from '../components/AdaptiveActivity';
import { gradeAssessments } from '../utils/gradeAssessments';

const AdaptiveLearningPage = () => {
  const { user, isAuthenticated, saveAssessmentResult, addXP } = useAuth();
  const [currentStep, setCurrentStep] = useState('welcome'); // welcome, assessment, learning, results
  const [activeActivity, setActiveActivity] = useState(null);
  const [currentGrade, setCurrentGrade] = useState(user?.grade || 'K-1');
  const [studentProfile, setStudentProfile] = useState(user);
  const [assessmentProgress, setAssessmentProgress] = useState(0);
  const [currentAssessmentQuestion, setCurrentAssessmentQuestion] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [skillLevels, setSkillLevels] = useState(user?.progress?.skillLevels || {});
  const [learningPath, setLearningPath] = useState([]);
  const [streakCount, setStreakCount] = useState(user?.progress?.streakDays || 0);
  const [totalXP, setTotalXP] = useState(user?.progress?.totalXP || 0);
  const [badges, setBadges] = useState(user?.progress?.badges || []);

  // Comprehensive assessment questions across different skill areas
  const assessmentQuestions = [
    // Basic Addition (Kindergarten-1st grade)
    { question: "3 + 2 = ?", answer: 5, skill: 'addition', level: 1, visual: "🍎🍎🍎 + 🍎🍎 = ?" },
    { question: "5 + 4 = ?", answer: 9, skill: 'addition', level: 1, visual: "✋ + 4️⃣ = ?" },
    
    // Basic Subtraction
    { question: "8 - 3 = ?", answer: 5, skill: 'subtraction', level: 1, visual: "🍪🍪🍪🍪🍪🍪🍪🍪 take away 3 = ?" },
    { question: "10 - 6 = ?", answer: 4, skill: 'subtraction', level: 1, visual: "🔟 - 6️⃣ = ?" },
    
    // Multiplication (2nd-3rd grade)
    { question: "4 × 3 = ?", answer: 12, skill: 'multiplication', level: 2, visual: "4 groups of 3 🍭🍭🍭" },
    { question: "6 × 2 = ?", answer: 12, skill: 'multiplication', level: 2, visual: "6 pairs 👫👫👫👫👫👫" },
    
    // Division
    { question: "12 ÷ 3 = ?", answer: 4, skill: 'division', level: 2, visual: "12 🍰 shared among 3 kids" },
    { question: "15 ÷ 5 = ?", answer: 3, skill: 'division', level: 2, visual: "15 ⚽ in 5 equal groups" },
    
    // Fractions (3rd-4th grade)
    { question: "What is 1/2 of 8?", answer: 4, skill: 'fractions', level: 3, visual: "🍕 cut in half, 8 pieces total" },
    { question: "2/4 = ?/8", answer: 4, skill: 'fractions', level: 3, visual: "📊 equivalent fractions" },
    
    // Place Value
    { question: "What is the tens digit in 347?", answer: 4, skill: 'place-value', level: 2, visual: "3️⃣4️⃣7️⃣ hundreds-tens-ones" },
    { question: "Round 67 to the nearest 10", answer: 70, skill: 'place-value', level: 2, visual: "6️⃣7️⃣ → 7️⃣0️⃣" },
    
    // Word Problems (4th-5th grade)
    { question: "Sarah has 25 stickers. She gives 8 to Tom. How many does she have left?", answer: 17, skill: 'word-problems', level: 3, visual: "👧 25 ⭐ - 8 ⭐ → 👦" },
    { question: "A box has 6 rows of 4 chocolates. How many chocolates total?", answer: 24, skill: 'word-problems', level: 3, visual: "📦 6 rows × 4 🍫" },
    
    // Decimals (4th-5th grade)  
    { question: "0.5 + 0.3 = ?", answer: 0.8, skill: 'decimals', level: 4, visual: "5️⃣/10 + 3️⃣/10 = ?" },
    { question: "2.7 - 1.2 = ?", answer: 1.5, skill: 'decimals', level: 4, visual: "🔢.🔢 subtraction" },
    
    // Basic Algebra (6th grade+)
    { question: "If x + 5 = 12, what is x?", answer: 7, skill: 'algebra', level: 5, visual: "❓ + 5 = 12" },
    { question: "2y = 14, find y", answer: 7, skill: 'algebra', level: 5, visual: "2 × ❓ = 14" }
  ];

  // Adaptive Learning Path based on assessment
  const generateLearningPath = (skillResults) => {
    const path = [];
    const skillOrder = ['addition', 'subtraction', 'multiplication', 'division', 'fractions', 'decimals', 'algebra'];
    
    skillOrder.forEach(skill => {
      const level = skillResults[skill] || 1;
      if (level < 5) { // If not mastered, add to learning path
        path.push({
          skill: skill,
          currentLevel: level,
          targetLevel: Math.min(level + 1, 5),
          activities: generateActivities(skill, level),
          icon: getSkillIcon(skill),
          color: getSkillColor(skill)
        });
      }
    });
    
    return path;
  };

  const generateActivities = (skill, level) => {
    const activities = {
      addition: [
        { name: "Number Line Adventures", type: "interactive", difficulty: level },
        { name: "Apple Counting Game", type: "visual", difficulty: level },
        { name: "Rocket Math Race", type: "timed", difficulty: level }
      ],
      subtraction: [
        { name: "Cookie Monster Subtraction", type: "interactive", difficulty: level },
        { name: "Treasure Hunt Minus", type: "game", difficulty: level },
        { name: "Balloon Pop Subtraction", type: "visual", difficulty: level }
      ],
      multiplication: [
        { name: "Times Table Tower", type: "building", difficulty: level },
        { name: "Garden Grid Game", type: "visual", difficulty: level },
        { name: "Space Multiplication", type: "adventure", difficulty: level }
      ],
      division: [
        { name: "Pizza Party Sharing", type: "visual", difficulty: level },
        { name: "Division Detective", type: "mystery", difficulty: level },
        { name: "Equal Groups Challenge", type: "puzzle", difficulty: level }
      ],
      fractions: [
        { name: "Fraction Pizza Chef", type: "cooking", difficulty: level },
        { name: "Pattern Block Fractions", type: "visual", difficulty: level },
        { name: "Fraction Number Line", type: "interactive", difficulty: level }
      ]
    };
    return activities[skill] || [];
  };

  const getSkillIcon = (skill) => {
    const icons = {
      addition: '➕',
      subtraction: '➖', 
      multiplication: '✖️',
      division: '➗',
      fractions: '🍕',
      decimals: '🔢',
      'place-value': '📍',
      'word-problems': '📖',
      algebra: '🔍'
    };
    return icons[skill] || '📚';
  };

  const getSkillColor = (skill) => {
    const colors = {
      addition: 'from-green-400 to-blue-500',
      subtraction: 'from-red-400 to-pink-500',
      multiplication: 'from-purple-400 to-indigo-500',
      division: 'from-yellow-400 to-orange-500',
      fractions: 'from-pink-400 to-red-500',
      decimals: 'from-blue-400 to-cyan-500',
      'place-value': 'from-indigo-400 to-purple-500',
      'word-problems': 'from-green-400 to-teal-500',
      algebra: 'from-gray-400 to-gray-600'
    };
    return colors[skill] || 'from-gray-400 to-gray-500';
  };

  // Assessment Logic
  const startAssessment = (profile) => {
    setStudentProfile(profile);
    setCurrentGrade(profile.grade);
    setCurrentStep('assessment');
    setCurrentAssessmentQuestion(0);
    setAssessmentAnswers([]);
    setAssessmentProgress(0);
  };

  const submitAssessmentAnswer = () => {
    const questions = gradeAssessments[currentGrade] || gradeAssessments['K-1'];
    const currentQ = questions[currentAssessmentQuestion];
    const isCorrect = parseFloat(userAnswer) === currentQ.answer;
    
    const newAnswer = {
      question: currentQ,
      userAnswer: userAnswer,
      correct: isCorrect,
      skill: currentQ.skill,
      level: currentQ.level
    };
    
    setAssessmentAnswers([...assessmentAnswers, newAnswer]);
    setShowFeedback(true);
    
    setTimeout(() => {
      const questions = gradeAssessments[currentGrade] || gradeAssessments['K-1'];
      if (currentAssessmentQuestion < questions.length - 1) {
        setCurrentAssessmentQuestion(currentAssessmentQuestion + 1);
        setUserAnswer('');
        setShowFeedback(false);
        setAssessmentProgress(((currentAssessmentQuestion + 2) / questions.length) * 100);
      } else {
        completeAssessment([...assessmentAnswers, newAnswer]);
      }
    }, 2000);
  };

  const completeAssessment = (answers) => {
    // Analyze results to determine skill levels
    const skillResults = {};
    
    answers.forEach(answer => {
      if (!skillResults[answer.skill]) {
        skillResults[answer.skill] = { correct: 0, total: 0, maxLevel: 1 };
      }
      skillResults[answer.skill].total++;
      if (answer.correct) {
        skillResults[answer.skill].correct++;
        skillResults[answer.skill].maxLevel = Math.max(skillResults[answer.skill].maxLevel, answer.level);
      }
    });
    
    // Convert to skill levels (1-5 scale)
    const finalSkillLevels = {};
    Object.keys(skillResults).forEach(skill => {
      const accuracy = skillResults[skill].correct / skillResults[skill].total;
      const baseLevel = skillResults[skill].maxLevel;
      finalSkillLevels[skill] = Math.max(1, Math.min(5, Math.floor(baseLevel * accuracy * 1.5)));
    });
    
    setSkillLevels(finalSkillLevels);
    setLearningPath(generateLearningPath(finalSkillLevels));
    setCurrentStep('results');
  };

  // Welcome Component
  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center p-8">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 max-w-4xl mx-auto text-center shadow-2xl">
        <div className="text-8xl mb-6 animate-bounce">🚀</div>
        <h1 className="text-6xl font-black mb-6">
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-transparent bg-clip-text">
            Math Adventure Starts Here!
          </span>
        </h1>
        <p className="text-2xl text-gray-700 font-bold mb-4">
          Let's discover your math superpowers and create a personalized learning journey just for you! 🌟
        </p>
        
        {!isAuthenticated && (
          <div className="bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 rounded-2xl p-4 mb-8 border-2 border-green-300">
            <div className="text-3xl mb-2">👋</div>
            <p className="text-green-700 font-bold text-lg mb-2">Try Our Smart Learning - Free Demo!</p>
            <p className="text-green-600 text-sm">
              No signup required to try our adaptive learning system. Create an account later to save your progress!
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
            <div className="text-5xl mb-3">🎯</div>
            <h3 className="text-xl font-black text-blue-600 mb-2">Smart Assessment</h3>
            <p className="text-blue-700">We'll find your perfect starting point</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
            <div className="text-5xl mb-3">🎮</div>
            <h3 className="text-xl font-black text-green-600 mb-2">Fun Games</h3>
            <p className="text-green-700">Learn through exciting adventures</p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
            <div className="text-5xl mb-3">📈</div>
            <h3 className="text-xl font-black text-purple-600 mb-2">Track Progress</h3>
            <p className="text-purple-700">Watch yourself grow stronger</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Tell us about yourself:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { grade: "K-1", emoji: "🐣", age: "5-6 years" },
              { grade: "2-3", emoji: "🌱", age: "7-8 years" },
              { grade: "4-5", emoji: "🌟", age: "9-10 years" },
              { grade: "6+", emoji: "🚀", age: "11+ years" }
            ].map((level) => (
              <button
                key={level.grade}
                onClick={() => startAssessment({ grade: level.grade, age: level.age })}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all shadow-lg"
              >
                <div className="text-4xl mb-2">{level.emoji}</div>
                <div>Grade {level.grade}</div>
                <div className="text-sm opacity-90">{level.age}</div>
                <div className="text-xs mt-1 opacity-75">
                  {level.grade === 'K-1' && 'Counting, shapes, +/-'}
                  {level.grade === '2-3' && 'Times tables, place value'}
                  {level.grade === '4-5' && 'Fractions, decimals'}
                  {level.grade === '6+' && 'Algebra, percentages'}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Assessment Component  
  const AssessmentScreen = () => {
    const questions = gradeAssessments[currentGrade] || gradeAssessments['K-1'];
    if (questions.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center">
          <div className="text-white text-2xl">Loading assessment...</div>
        </div>
      );
    }
    const currentQ = questions[currentAssessmentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="bg-white/90 rounded-2xl p-4 mb-6 shadow-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-bold text-gray-700">Math Assessment</span>
              <span className="text-sm text-gray-600">
                Question {currentAssessmentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${assessmentProgress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Question Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 text-center shadow-2xl">
            <div className="text-6xl mb-6">{getSkillIcon(currentQ.skill)}</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{currentQ.question}</h2>
            
            {/* Visual Aid */}
            <div className="text-3xl mb-8 bg-yellow-100 rounded-2xl p-6 border-2 border-yellow-300">
              {currentQ.visual}
            </div>
            
            {!showFeedback ? (
              <div className="space-y-6">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="text-3xl text-center border-4 border-blue-300 rounded-2xl p-6 w-48 focus:border-purple-500 focus:outline-none shadow-lg font-bold bg-blue-50"
                  placeholder="?"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && userAnswer && submitAssessmentAnswer()}
                />
                <br />
                <button
                  onClick={submitAssessmentAnswer}
                  disabled={!userAnswer}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-12 py-4 rounded-full text-2xl font-bold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Check Answer! ✨
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {assessmentAnswers[assessmentAnswers.length - 1]?.correct ? (
                  <div className="bg-green-100 border-4 border-green-300 rounded-3xl p-8">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-3xl font-bold text-green-700 mb-3">Awesome!</h3>
                    <p className="text-green-600 text-xl">You got it right! Great job! 🌟</p>
                  </div>
                ) : (
                  <div className="bg-blue-100 border-4 border-blue-300 rounded-3xl p-8">
                    <div className="text-6xl mb-4">💡</div>
                    <h3 className="text-3xl font-bold text-blue-700 mb-3">Good try!</h3>
                    <p className="text-blue-600 text-xl">The answer is <strong>{currentQ.answer}</strong>. You're learning! 🚀</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Results & Learning Path Component
  const ResultsScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
          <div className="text-center mb-12">
            <div className="text-8xl mb-6 animate-bounce">🎯</div>
            <h1 className="text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
                Your Math Profile is Ready! 
              </span>
            </h1>
            <p className="text-2xl text-gray-700 font-bold">
              Here's your personalized learning adventure path! 🗺️
            </p>
          </div>
          
          {/* Skill Level Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {Object.entries(skillLevels).map(([skill, level]) => (
              <div key={skill} className={`bg-gradient-to-r ${getSkillColor(skill)} text-white rounded-2xl p-6 text-center shadow-lg hover:scale-105 transition-transform`}>
                <div className="text-4xl mb-2">{getSkillIcon(skill)}</div>
                <h3 className="font-bold text-lg capitalize mb-1">{skill.replace('-', ' ')}</h3>
                <div className="text-2xl font-black">Level {level}/5</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < level ? '⭐' : '☆'}`}>
                      {i < level ? '⭐' : '☆'}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Learning Path */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-center mb-8">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                🌟 Your Learning Adventures 🌟
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningPath.map((pathItem, index) => (
                <div key={pathItem.skill} className={`bg-gradient-to-r ${pathItem.color} text-white rounded-3xl p-8 shadow-xl hover:scale-105 transition-transform cursor-pointer`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-5xl">{pathItem.icon}</div>
                    <div className="text-right">
                      <div className="text-sm opacity-90">Next Level</div>
                      <div className="text-2xl font-black">{pathItem.currentLevel} → {pathItem.targetLevel}</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black mb-3 capitalize">{pathItem.skill.replace('-', ' ')}</h3>
                  <div className="space-y-2">
                    {pathItem.activities.slice(0, 3).map((activity, i) => (
                      <div key={i} className="bg-white/20 rounded-full px-4 py-2 text-sm font-bold">
                        🎮 {activity.name}
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setActiveActivity(pathItem)}
                    className="w-full mt-4 bg-white/20 hover:bg-white/30 rounded-full py-3 font-bold transition-colors"
                  >
                    Start Adventure! 🚀
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => setCurrentStep('learning')}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-12 py-4 rounded-full text-2xl font-bold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Begin Learning Journey! 🌟
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Activity completion handler
  const handleActivityComplete = (results) => {
    console.log('Activity completed:', results);
    
    // Update skill levels based on performance
    const newSkillLevels = { ...skillLevels };
    if (results.accuracy > 80) {
      newSkillLevels[results.skill] = Math.min(5, newSkillLevels[results.skill] + 1);
    }
    
    setSkillLevels(newSkillLevels);
    setTotalXP(totalXP + results.totalXP);
    
    // Save progress if user is authenticated
    if (isAuthenticated && results.totalXP > 0) {
      addXP(results.totalXP, `Completed ${results.skill} activity`);
      
      // Save assessment result
      saveAssessmentResult({
        skill: results.skill,
        score: results.totalXP,
        level: results.finalDifficulty || 1,
        timeSpent: Date.now(), // You could track actual time
        accuracy: results.accuracy
      });
    }
    
    // Update learning path
    const updatedPath = generateLearningPath(newSkillLevels);
    setLearningPath(updatedPath);
    
    // Close activity
    setActiveActivity(null);
    
    // Show success message or next activity suggestion
    if (results.accuracy > 80) {
      setBadges([...badges, `${results.skill}-level-${results.finalDifficulty}`]);
    }
  };

  // Progress Dashboard Component
  const ProgressDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
          <div className="text-center mb-12">
            <div className="text-8xl mb-6 animate-bounce">📊</div>
            <h1 className="text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
                {isAuthenticated ? 'Your Learning Journey!' : 'Try Our Smart Learning!'} 
              </span>
            </h1>
            {isAuthenticated ? (
              <div className="flex justify-center space-x-8 mb-8">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-bold text-xl">
                  🏆 Total XP: {totalXP}
                </div>
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-3 rounded-full font-bold text-xl">
                  🎖️ Badges: {badges.length}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-2xl p-6 mb-8 border-4 border-blue-300">
                <div className="text-4xl mb-3">🎮</div>
                <h3 className="text-2xl font-bold text-purple-700 mb-2">Demo Mode</h3>
                <p className="text-purple-600 mb-4">You're trying our smart learning system! Sign up to save your progress and unlock more features.</p>
                <div className="flex justify-center space-x-4 text-sm">
                  <div className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full">🏆 Demo XP: {totalXP}</div>
                  <div className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full">🎖️ Demo Badges: {badges.length}</div>
                </div>
              </div>
            )}
          </div>
          
          {/* Current Skill Levels */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {Object.entries(skillLevels).map(([skill, level]) => (
              <div key={skill} className={`bg-gradient-to-r ${getSkillColor(skill)} text-white rounded-2xl p-6 text-center shadow-lg hover:scale-105 transition-transform`}>
                <div className="text-4xl mb-2">{getSkillIcon(skill)}</div>
                <h3 className="font-bold text-lg capitalize mb-1">{skill.replace('-', ' ')}</h3>
                <div className="text-2xl font-black">Level {level}/5</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < level ? '⭐' : '☆'}`}>
                      {i < level ? '⭐' : '☆'}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Learning Path Activities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPath.map((pathItem, index) => (
              <div key={pathItem.skill} className={`bg-gradient-to-r ${pathItem.color} text-white rounded-3xl p-8 shadow-xl hover:scale-105 transition-transform cursor-pointer`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-5xl">{pathItem.icon}</div>
                  <div className="text-right">
                    <div className="text-sm opacity-90">Next Level</div>
                    <div className="text-2xl font-black">{pathItem.currentLevel} → {pathItem.targetLevel}</div>
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-3 capitalize">{pathItem.skill.replace('-', ' ')}</h3>
                <div className="space-y-2 mb-4">
                  {pathItem.activities.slice(0, 2).map((activity, i) => (
                    <div key={i} className="bg-white/20 rounded-full px-4 py-2 text-sm font-bold">
                      🎮 {activity.name}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setActiveActivity(pathItem)}
                  className="w-full bg-white/20 hover:bg-white/30 rounded-full py-3 font-bold transition-colors"
                >
                  Continue Learning! 🚀
                </button>
              </div>
            ))}
          </div>
          
          {/* Sign up encouragement for non-authenticated users */}
          {!isAuthenticated && (
            <div className="bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 rounded-2xl p-8 mb-8 border-4 border-yellow-400">
              <div className="text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-3xl font-bold text-orange-700 mb-4">Ready to Save Your Progress?</h3>
                <p className="text-orange-600 mb-6 text-lg">
                  Create a free account to save your learning progress, earn badges, and unlock personalized learning paths!
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <div className="bg-white/70 rounded-full px-4 py-2 text-sm font-bold text-orange-800">🏆 Save Your XP</div>
                  <div className="bg-white/70 rounded-full px-4 py-2 text-sm font-bold text-orange-800">🎖️ Earn Badges</div>
                  <div className="bg-white/70 rounded-full px-4 py-2 text-sm font-bold text-orange-800">📊 Track Progress</div>
                  <div className="bg-white/70 rounded-full px-4 py-2 text-sm font-bold text-orange-800">🎮 Unlock Activities</div>
                </div>
                <div className="space-y-3">
                  <p className="text-orange-700 font-bold">Join thousands of students already learning with EduMaster!</p>
                  <p className="text-sm text-orange-600">Quick signup with Google or create your own account</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentStep('welcome')}
              className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-full font-bold hover:from-gray-600 hover:to-gray-700 transition-all"
            >
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Initialize default values for non-authenticated users
  if (!isAuthenticated && (!skillLevels || Object.keys(skillLevels).length === 0)) {
    // Set default skill levels for demo mode
    setSkillLevels({
      addition: 1,
      subtraction: 1,
      multiplication: 1,
      division: 1,
      fractions: 1,
      algebra: 1
    });
  }

  // Main render
  return (
    <div className="min-h-screen">
      {currentStep === 'welcome' && <WelcomeScreen />}
      {currentStep === 'assessment' && <AssessmentScreen />}
      {currentStep === 'results' && <ResultsScreen />}
      {currentStep === 'learning' && <ProgressDashboard />}
      
      {/* Active Learning Activity */}
      {activeActivity && (
        <AdaptiveActivity
          skill={activeActivity.skill}
          level={activeActivity.currentLevel}
          onComplete={handleActivityComplete}
        />
      )}
    </div>
  );
};

export default AdaptiveLearningPage;