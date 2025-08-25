import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdaptiveActivity from '../components/AdaptiveActivity';
import { gradeAssessments } from '../utils/gradeAssessments';

const AdaptiveLearningPage = () => {
  const { user, isAuthenticated, saveAssessmentResult, addXP } = useAuth();
  const [currentStep, setCurrentStep] = useState('welcome'); // welcome, assessment, learning, results, games, progress
  const [activeActivity, setActiveActivity] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);
  const [gameState, setGameState] = useState({});
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
          <div 
            className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:bg-blue-100"
            onClick={() => {
              // Start assessment directly
              startAssessment({ grade: isAuthenticated ? (user?.grade || 'K-1') : 'K-1', age: '5-6 years' });
            }}
          >
            <div className="text-5xl mb-3 animate-bounce">🎯</div>
            <h3 className="text-xl font-black text-blue-600 mb-2">Smart Assessment</h3>
            <p className="text-blue-700 mb-3">We'll find your perfect starting point</p>
            <div className="bg-blue-200 rounded-full px-4 py-2 text-center">
              <span className="text-blue-800 font-bold text-sm">Click to Start! →</span>
            </div>
          </div>
          <div 
            className="bg-green-50 rounded-2xl p-6 border-2 border-green-200 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:bg-green-100"
            onClick={() => {
              // Navigate directly to fun games section
              setCurrentStep('games');
            }}
          >
            <div className="text-5xl mb-3 animate-pulse">🎮</div>
            <h3 className="text-xl font-black text-green-600 mb-2">Fun Games</h3>
            <p className="text-green-700 mb-3">Learn through exciting adventures</p>
            <div className="bg-green-200 rounded-full px-4 py-2 text-center">
              <span className="text-green-800 font-bold text-sm">Play Now! →</span>
            </div>
          </div>
          <div 
            className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:bg-purple-100"
            onClick={() => {
              // Show progress dashboard
              setCurrentStep('progress');
            }}
          >
            <div className="text-5xl mb-3 animate-bounce">📈</div>
            <h3 className="text-xl font-black text-purple-600 mb-2">Track Progress</h3>
            <p className="text-purple-700 mb-3">Watch yourself grow stronger</p>
            <div className="bg-purple-200 rounded-full px-4 py-2 text-center">
              <span className="text-purple-800 font-bold text-sm">View Stats! →</span>
            </div>
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

  // Fun Games Screen Component
  const FunGamesScreen = () => {
    const mathGames = [
      {
        id: 'number-race',
        title: 'Number Race',
        icon: '🏁',
        description: 'Race against time to solve math problems!',
        color: 'from-red-400 to-pink-500',
        difficulty: 'Easy',
        xp: 50,
        players: '1,234',
        category: 'Speed'
      },
      {
        id: 'math-quest',
        title: 'Math Quest Adventure',
        icon: '🗺️',
        description: 'Explore magical lands while solving puzzles!',
        color: 'from-purple-400 to-blue-500',
        difficulty: 'Medium',
        xp: 75,
        players: '2,156',
        category: 'Adventure'
      },
      {
        id: 'fraction-chef',
        title: 'Fraction Chef',
        icon: '🍕',
        description: 'Cook delicious meals with fraction recipes!',
        color: 'from-orange-400 to-red-500',
        difficulty: 'Medium',
        xp: 65,
        players: '987',
        category: 'Cooking'
      },
      {
        id: 'geometry-builder',
        title: 'Geometry City Builder',
        icon: '🏗️',
        description: 'Build your dream city with geometric shapes!',
        color: 'from-green-400 to-teal-500',
        difficulty: 'Hard',
        xp: 100,
        players: '1,543',
        category: 'Building'
      },
      {
        id: 'algebra-detective',
        title: 'Algebra Detective',
        icon: '🔍',
        description: 'Solve mysteries using algebraic equations!',
        color: 'from-indigo-400 to-purple-500',
        difficulty: 'Hard',
        xp: 90,
        players: '756',
        category: 'Mystery'
      },
      {
        id: 'times-table-tower',
        title: 'Times Table Tower',
        icon: '🏰',
        description: 'Build the tallest tower with multiplication!',
        color: 'from-yellow-400 to-orange-500',
        difficulty: 'Easy',
        xp: 45,
        players: '3,421',
        category: 'Building'
      }
    ];

    const startGame = (game) => {
      setCurrentGame(game.id);
      // Initialize game state based on game type
      const initialState = {
        score: 0,
        level: 1,
        timeLeft: game.id === 'number-race' ? 60 : null,
        currentQuestion: 0,
        questions: [],
        userAnswer: '',
        showFeedback: false,
        isCorrect: false,
        gameStarted: false,
        gameCompleted: false,
        // Game-specific states
        racePosition: 0,
        questProgress: 0,
        ingredientsCollected: [],
        cityBuildings: [],
        cluesFound: [],
        towerHeight: 0,
        lives: 3,
        streak: 0
      };
      setGameState(initialState);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="text-8xl mb-6 animate-bounce">🎮</div>
              <h1 className="text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
                  Fun Math Games!
                </span>
              </h1>
              <p className="text-2xl text-gray-700 font-bold mb-6">
                Learn math through exciting games and adventures! 🎆
              </p>
              <div className="flex justify-center space-x-4">
                <div className="bg-green-100 rounded-full px-6 py-3 shadow-lg border-2 border-green-300">
                  <span className="text-2xl">🏆</span>
                  <span className="ml-2 font-bold text-green-600">Your XP: {totalXP}</span>
                </div>
                <button
                  onClick={() => setCurrentStep('welcome')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-full font-bold transition-all"
                >
                  ← Back to Home
                </button>
              </div>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mathGames.map((game) => (
                <div
                  key={game.id}
                  className={`bg-gradient-to-r ${game.color} rounded-3xl p-8 text-white shadow-xl hover:scale-105 transform transition-all duration-300 cursor-pointer relative overflow-hidden`}
                  onClick={() => startGame(game)}
                >
                  {/* Background decorative elements */}
                  <div className="absolute top-2 right-2 text-2xl opacity-30">✨</div>
                  <div className="absolute bottom-2 left-2 text-xl opacity-20">🎆</div>
                  
                  {/* Game Icon */}
                  <div className="text-6xl mb-4 text-center animate-bounce">{game.icon}</div>
                  
                  {/* Game Info */}
                  <h3 className="text-2xl font-black mb-3 text-center">{game.title}</h3>
                  <p className="text-sm opacity-90 mb-4 text-center">{game.description}</p>
                  
                  {/* Game Stats */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <div className="bg-white/20 rounded-full px-3 py-1 text-sm font-bold">
                        🎯 {game.difficulty}
                      </div>
                      <div className="bg-white/20 rounded-full px-3 py-1 text-sm font-bold">
                        🏆 {game.xp} XP
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="bg-white/20 rounded-full px-3 py-1 text-sm font-bold">
                        📊 {game.category}
                      </div>
                      <div className="bg-white/20 rounded-full px-3 py-1 text-sm font-bold">
                        👥 {game.players}
                      </div>
                    </div>
                  </div>
                  
                  {/* Play Button */}
                  <button className="w-full bg-white/20 hover:bg-white/30 rounded-full py-3 font-bold text-lg transition-all">
                    Play Now! 🚀
                  </button>
                </div>
              ))}
            </div>

            {/* Coming Soon Section */}
            <div className="mt-12 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 border-4 border-yellow-300">
              <div className="text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-3xl font-bold text-orange-700 mb-4">More Games Coming Soon!</h3>
                <p className="text-orange-600 text-lg mb-6">
                  We're working on even more exciting math games! Here's what's coming:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white/70 rounded-xl p-4">
                    <div className="text-3xl mb-2">🧮</div>
                    <h4 className="font-bold text-orange-800">Math Puzzles</h4>
                    <p className="text-sm text-orange-700">Brain-teasing challenges</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-4">
                    <div className="text-3xl mb-2">🌌</div>
                    <h4 className="font-bold text-orange-800">Math Universe</h4>
                    <p className="text-sm text-orange-700">Explore space with math</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-4">
                    <div className="text-3xl mb-2">🎨</div>
                    <h4 className="font-bold text-orange-800">Art & Math</h4>
                    <p className="text-sm text-orange-700">Create art with numbers</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-4">
                    <div className="text-3xl mb-2">🎵</div>
                    <h4 className="font-bold text-orange-800">Music Math</h4>
                    <p className="text-sm text-orange-700">Learn rhythms and patterns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Progress Tracking Screen Component
  const ProgressTrackingScreen = () => {
    const progressStats = {
      totalProblems: Math.floor(totalXP / 10) + 47,
      correctAnswers: Math.floor((totalXP / 10 + 47) * 0.85),
      accuracy: Math.floor(((Math.floor((totalXP / 10 + 47) * 0.85) / (Math.floor(totalXP / 10) + 47)) * 100)),
      timeSpent: Math.floor(totalXP / 5) + 120, // minutes
      streak: streakCount || Math.floor(Math.random() * 7) + 1,
      level: Math.floor(totalXP / 100) + 1,
      nextLevelXP: ((Math.floor(totalXP / 100) + 1) * 100) - totalXP
    };

    const achievements = [
      { id: 'first-steps', name: 'First Steps', icon: '👣', earned: totalXP >= 10, desc: 'Solve your first problem' },
      { id: 'quick-learner', name: 'Quick Learner', icon: '⚡', earned: totalXP >= 50, desc: 'Earn 50 XP' },
      { id: 'math-explorer', name: 'Math Explorer', icon: '🗺️', earned: totalXP >= 100, desc: 'Earn 100 XP' },
      { id: 'streak-master', name: 'Streak Master', icon: '🔥', earned: streakCount >= 5, desc: '5-day streak' },
      { id: 'problem-solver', name: 'Problem Solver', icon: '🧩', earned: progressStats.totalProblems >= 50, desc: 'Solve 50 problems' },
      { id: 'accuracy-ace', name: 'Accuracy Ace', icon: '🎯', earned: progressStats.accuracy >= 90, desc: '90% accuracy' },
    ];

    const weeklyProgress = [
      { day: 'Mon', xp: Math.floor(Math.random() * 30) + 10, problems: Math.floor(Math.random() * 8) + 2 },
      { day: 'Tue', xp: Math.floor(Math.random() * 30) + 10, problems: Math.floor(Math.random() * 8) + 2 },
      { day: 'Wed', xp: Math.floor(Math.random() * 30) + 10, problems: Math.floor(Math.random() * 8) + 2 },
      { day: 'Thu', xp: Math.floor(Math.random() * 30) + 10, problems: Math.floor(Math.random() * 8) + 2 },
      { day: 'Fri', xp: Math.floor(Math.random() * 30) + 10, problems: Math.floor(Math.random() * 8) + 2 },
      { day: 'Sat', xp: Math.floor(Math.random() * 20) + 5, problems: Math.floor(Math.random() * 5) + 1 },
      { day: 'Sun', xp: Math.floor(Math.random() * 25) + 8, problems: Math.floor(Math.random() * 6) + 1 },
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="text-8xl mb-6 animate-bounce">📈</div>
              <h1 className="text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                  Your Learning Progress!
                </span>
              </h1>
              <p className="text-2xl text-gray-700 font-bold mb-6">
                {isAuthenticated ? 'See how amazing you\'re doing!' : 'Demo progress - sign up to save!'} 🎆
              </p>
              <div className="flex justify-center space-x-4">
                <div className="bg-purple-100 rounded-full px-6 py-3 shadow-lg border-2 border-purple-300">
                  <span className="text-2xl">🏆</span>
                  <span className="ml-2 font-bold text-purple-600">Level {progressStats.level}</span>
                </div>
                <div className="bg-pink-100 rounded-full px-6 py-3 shadow-lg border-2 border-pink-300">
                  <span className="text-2xl">✨</span>
                  <span className="ml-2 font-bold text-pink-600">{totalXP} XP</span>
                </div>
                <button
                  onClick={() => setCurrentStep('welcome')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-full font-bold transition-all"
                >
                  ← Back to Home
                </button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-gradient-to-r from-green-400 to-green-500 text-white rounded-2xl p-6 shadow-lg">
                <div className="text-4xl mb-2">📊</div>
                <h3 className="text-xl font-bold mb-1">Problems Solved</h3>
                <div className="text-3xl font-black">{progressStats.totalProblems}</div>
              </div>
              <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-2xl p-6 shadow-lg">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="text-xl font-bold mb-1">Accuracy</h3>
                <div className="text-3xl font-black">{progressStats.accuracy}%</div>
              </div>
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-2xl p-6 shadow-lg">
                <div className="text-4xl mb-2">🔥</div>
                <h3 className="text-xl font-bold mb-1">Current Streak</h3>
                <div className="text-3xl font-black">{progressStats.streak} days</div>
              </div>
              <div className="bg-gradient-to-r from-purple-400 to-purple-500 text-white rounded-2xl p-6 shadow-lg">
                <div className="text-4xl mb-2">⏰</div>
                <h3 className="text-xl font-bold mb-1">Time Spent</h3>
                <div className="text-3xl font-black">{progressStats.timeSpent}m</div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 mb-12 border-4 border-yellow-300">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-orange-700 mb-2">🏆 Level Progress</h3>
                <p className="text-orange-600">You're on Level {progressStats.level}! Only {progressStats.nextLevelXP} XP to Level {progressStats.level + 1}!</p>
              </div>
              <div className="w-full bg-white rounded-full h-6 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-orange-400 to-red-500 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-4"
                  style={{ width: `${((totalXP % 100) / 100) * 100}%` }}
                >
                  <span className="text-white font-bold text-sm">{totalXP % 100}/100</span>
                </div>
              </div>
            </div>

            {/* Weekly Progress Chart */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">📈 This Week's Activity</h3>
              <div className="grid grid-cols-7 gap-4">
                {weeklyProgress.map((day, index) => (
                  <div key={day.day} className="text-center">
                    <div className="bg-gradient-to-t from-blue-400 to-purple-500 rounded-t-xl text-white p-4 mb-2 relative">
                      <div className="text-2xl font-bold">{day.xp}</div>
                      <div className="text-xs opacity-90">XP</div>
                      <div 
                        className="bg-gradient-to-t from-blue-300 to-purple-400 rounded-t-xl absolute bottom-0 left-0 right-0 transition-all"
                        style={{ height: `${(day.xp / 40) * 100}%`, minHeight: '20%' }}
                      ></div>
                    </div>
                    <div className="font-bold text-gray-700">{day.day}</div>
                    <div className="text-sm text-gray-600">{day.problems} problems</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">🏆 Your Achievements</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`text-center p-6 rounded-2xl border-4 transition-all transform hover:scale-105 ${
                      achievement.earned 
                        ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-400 shadow-lg' 
                        : 'bg-gray-100 border-gray-300 opacity-60'
                    }`}
                  >
                    <div className={`text-4xl mb-3 ${achievement.earned ? 'animate-bounce' : ''}`}>
                      {achievement.earned ? achievement.icon : '🔒'}
                    </div>
                    <h4 className={`font-bold mb-2 ${achievement.earned ? 'text-orange-800' : 'text-gray-600'}`}>
                      {achievement.name}
                    </h4>
                    <p className={`text-sm ${achievement.earned ? 'text-orange-700' : 'text-gray-500'}`}>
                      {achievement.desc}
                    </p>
                    {achievement.earned && (
                      <div className="mt-2 bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">
                        EARNED! ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Current Skills */}
              <div className="bg-blue-50 rounded-3xl p-8 border-4 border-blue-200">
                <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">📚 Your Math Skills</h3>
                <div className="space-y-4">
                  {Object.entries(skillLevels).map(([skill, level]) => (
                    <div key={skill} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{getSkillIcon(skill)}</span>
                        <span className="font-bold capitalize text-gray-700">{skill.replace('-', ' ')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-lg ${i < level ? 'text-yellow-400' : 'text-gray-300'}`}>
                              {i < level ? '⭐' : '☆'}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm font-bold text-blue-600">Level {level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Goals */}
              <div className="bg-green-50 rounded-3xl p-8 border-4 border-green-200">
                <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">🎯 Next Goals</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 border-2 border-green-300">
                    <h4 className="font-bold text-green-700 mb-2">🏆 Reach Level {progressStats.level + 1}</h4>
                    <p className="text-sm text-green-600">Earn {progressStats.nextLevelXP} more XP</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full"
                        style={{ width: `${((totalXP % 100) / 100) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-green-300">
                    <h4 className="font-bold text-green-700 mb-2">🔥 7-Day Streak</h4>
                    <p className="text-sm text-green-600">Practice {7 - progressStats.streak} more days</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-green-300">
                    <h4 className="font-bold text-green-700 mb-2">🧩 100 Problems</h4>
                    <p className="text-sm text-green-600">Solve {Math.max(0, 100 - progressStats.totalProblems)} more problems</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Encouragement */}
            <div className="mt-12 text-center bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-3xl p-8 border-4 border-pink-300">
              <div className="text-6xl mb-4">🎆</div>
              <h3 className="text-3xl font-bold text-purple-700 mb-4">You're doing amazing!</h3>
              <p className="text-purple-600 text-lg mb-6">
                Every problem you solve makes you stronger at math. Keep up the fantastic work!
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setCurrentStep('games')}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full font-bold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  🎮 Play Games
                </button>
                <button
                  onClick={() => setCurrentStep('assessment')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  🎯 Take Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Game: Number Race - Speed-based math challenges
  const NumberRaceGame = () => {
    const [timer, setTimer] = useState(null);

    useEffect(() => {
      if (currentGame === 'number-race' && !gameState.gameStarted) {
        // Initialize race questions
        const questions = [];
        for (let i = 0; i < 50; i++) {
          const operations = ['+', '-', '×', '÷'];
          const op = operations[Math.floor(Math.random() * operations.length)];
          let a, b, answer;
          
          if (op === '+') {
            a = Math.floor(Math.random() * 50) + 1;
            b = Math.floor(Math.random() * 50) + 1;
            answer = a + b;
          } else if (op === '-') {
            a = Math.floor(Math.random() * 50) + 25;
            b = Math.floor(Math.random() * 24) + 1;
            answer = a - b;
          } else if (op === '×') {
            a = Math.floor(Math.random() * 12) + 1;
            b = Math.floor(Math.random() * 12) + 1;
            answer = a * b;
          } else {
            b = Math.floor(Math.random() * 12) + 1;
            answer = Math.floor(Math.random() * 12) + 1;
            a = b * answer;
          }
          
          questions.push({ question: `${a} ${op} ${b}`, answer, op });
        }
        
        setGameState(prev => ({ ...prev, questions }));
      }
    }, [currentGame, gameState.gameStarted]);

    const startRace = () => {
      setGameState(prev => ({ ...prev, gameStarted: true, timeLeft: 60 }));
      const gameTimer = setInterval(() => {
        setGameState(prev => {
          if (prev.timeLeft <= 1) {
            clearInterval(gameTimer);
            return { ...prev, timeLeft: 0, gameCompleted: true };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
      setTimer(gameTimer);
    };

    const checkAnswer = () => {
      const userNum = parseFloat(gameState.userAnswer);
      const correct = Math.abs(userNum - gameState.questions[gameState.currentQuestion].answer) < 0.01;
      
      setGameState(prev => ({
        ...prev,
        isCorrect: correct,
        showFeedback: true,
        score: correct ? prev.score + 1 : prev.score,
        streak: correct ? prev.streak + 1 : 0,
        racePosition: correct ? Math.min(100, prev.racePosition + 2) : prev.racePosition
      }));

      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          currentQuestion: Math.min(prev.currentQuestion + 1, prev.questions.length - 1),
          userAnswer: '',
          showFeedback: false,
          isCorrect: false
        }));
      }, 1000);
    };

    const exitGame = () => {
      if (timer) clearInterval(timer);
      const earnedXP = gameState.score * 10 + gameState.streak * 5;
      setTotalXP(totalXP + earnedXP);
      setCurrentGame(null);
      setGameState({});
    };

    if (!gameState.questions || gameState.questions.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-400 to-yellow-500 flex items-center justify-center">
          <div className="text-white text-3xl">🏁 Loading Number Race...</div>
        </div>
      );
    }

    if (!gameState.gameStarted) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-400 to-yellow-500 flex items-center justify-center p-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 max-w-2xl text-center shadow-2xl">
            <div className="text-8xl mb-6 animate-bounce">🏁</div>
            <h1 className="text-5xl font-black mb-6 text-red-600">Number Race!</h1>
            <p className="text-xl text-gray-700 mb-8">
              Race against time! Solve as many math problems as you can in 60 seconds.
              Each correct answer moves you closer to the finish line! 🏆
            </p>
            <div className="bg-yellow-100 rounded-2xl p-6 mb-8 border-4 border-yellow-300">
              <h3 className="text-lg font-bold text-yellow-800 mb-4">🎯 Game Rules:</h3>
              <div className="text-left space-y-2 text-yellow-700">
                <p>• ⏰ You have 60 seconds</p>
                <p>• ✅ Each correct answer = 10 XP + 2 steps forward</p>
                <p>• 🔥 Build streaks for bonus XP</p>
                <p>• 🏆 Reach 100 steps to win the race!</p>
              </div>
            </div>
            <button
              onClick={startRace}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-12 py-4 rounded-full text-2xl font-bold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Start Race!
            </button>
            <br /><br />
            <button
              onClick={exitGame}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-bold transition-all"
            >
              ← Back to Games
            </button>
          </div>
        </div>
      );
    }

    if (gameState.gameCompleted) {
      const earnedXP = gameState.score * 10 + gameState.streak * 5;
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 max-w-2xl text-center shadow-2xl">
            <div className="text-8xl mb-6">{gameState.racePosition >= 100 ? '🏆' : '🏁'}</div>
            <h1 className="text-5xl font-black mb-6">
              {gameState.racePosition >= 100 ? 'You Won the Race!' : 'Race Finished!'}
            </h1>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-100 rounded-2xl p-6">
                <div className="text-4xl font-black text-blue-600">{gameState.score}</div>
                <div className="text-blue-800 font-bold">Problems Solved</div>
              </div>
              <div className="bg-green-100 rounded-2xl p-6">
                <div className="text-4xl font-black text-green-600">{earnedXP}</div>
                <div className="text-green-800 font-bold">XP Earned</div>
              </div>
            </div>
            <div className="bg-yellow-100 rounded-2xl p-6 mb-8">
              <div className="text-2xl font-bold text-yellow-800 mb-2">🏃‍♂️ Race Progress: {gameState.racePosition}/100</div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all"
                  style={{ width: `${gameState.racePosition}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => {
                  setGameState({ ...gameState, gameStarted: false, gameCompleted: false, score: 0, currentQuestion: 0, racePosition: 0, timeLeft: 60 });
                }}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full text-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg mr-4"
              >
                🔄 Play Again
              </button>
              <button
                onClick={exitGame}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-full font-bold hover:from-gray-600 hover:to-gray-700 transition-all"
              >
                ← Back to Games
              </button>
            </div>
          </div>
        </div>
      );
    }

    const currentQ = gameState.questions[gameState.currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-yellow-500 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Game Header */}
          <div className="bg-white/90 rounded-2xl p-6 mb-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div className="text-3xl font-black text-red-600">🏁 Number Race</div>
              <button
                onClick={exitGame}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-bold"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-black text-red-600">{gameState.timeLeft}</div>
                <div className="text-sm text-gray-600">⏰ Seconds</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-blue-600">{gameState.score}</div>
                <div className="text-sm text-gray-600">✅ Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-green-600">{gameState.streak}</div>
                <div className="text-sm text-gray-600">🔥 Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-purple-600">{gameState.racePosition}/100</div>
                <div className="text-sm text-gray-600">🏃‍♂️ Position</div>
              </div>
            </div>
            
            {/* Race Track */}
            <div className="mt-4 bg-green-100 rounded-full h-8 relative border-4 border-green-300">
              <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 to-green-500 rounded-full transition-all duration-300" style={{ width: `${gameState.racePosition}%` }}></div>
              <div className="absolute right-2 top-1 text-2xl">🏁</div>
              <div 
                className="absolute top-0 text-2xl transition-all duration-300 transform -translate-y-1"
                style={{ left: `${Math.max(0, gameState.racePosition - 2)}%` }}
              >
                🏃‍♂️
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 text-center shadow-2xl">
            <div className="text-6xl mb-6">{currentQ?.op === '+' ? '➕' : currentQ?.op === '-' ? '➖' : currentQ?.op === '×' ? '✖️' : '➗'}</div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6">{currentQ?.question} = ?</h2>
            
            {!gameState.showFeedback ? (
              <div className="space-y-6">
                <input
                  type="text"
                  value={gameState.userAnswer}
                  onChange={(e) => setGameState(prev => ({ ...prev, userAnswer: e.target.value }))}
                  className="text-4xl text-center border-4 border-red-400 rounded-2xl p-6 w-64 focus:border-yellow-500 focus:outline-none shadow-lg font-bold bg-yellow-50"
                  placeholder="?"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && gameState.userAnswer && checkAnswer()}
                />
                <br />
                <button
                  onClick={checkAnswer}
                  disabled={!gameState.userAnswer}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🏃‍♂️ Go!
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {gameState.isCorrect ? (
                  <div className="bg-green-100 border-4 border-green-300 rounded-3xl p-8">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-3xl font-bold text-green-700 mb-3">Correct!</h3>
                    <p className="text-green-600 text-xl">+10 XP • +2 Steps • Streak: {gameState.streak}! 🔥</p>
                  </div>
                ) : (
                  <div className="bg-red-100 border-4 border-red-300 rounded-3xl p-8">
                    <div className="text-6xl mb-4">⚡</div>
                    <h3 className="text-3xl font-bold text-red-700 mb-3">Keep Going!</h3>
                    <p className="text-red-600 text-xl">Answer: {currentQ?.answer} • Streak Reset 🔥</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Game: Math Quest Adventure - Exploration with puzzles
  const MathQuestGame = () => {
    const questStages = [
      {
        id: 1,
        title: 'The Enchanted Forest',
        scene: '🌲🌳🎄 A mystical forest blocks your path. Solve the riddle to continue!',
        icon: '🌲',
        background: 'from-green-400 to-teal-500',
        problem: 'A tree has 24 apples. Birds eat 1/3 of them. How many apples are left?',
        answer: 16,
        hint: 'Find 1/3 of 24, then subtract from 24',
        reward: 'You found a Magic Compass! 🧭'
      },
      {
        id: 2,
        title: 'The Crystal Cave',
        scene: '🕸️✨📎 A glittering cave filled with crystal formations. Count carefully!',
        icon: '📎',
        background: 'from-purple-400 to-blue-500',
        problem: 'You see 5 groups of crystals. Each group has 7 crystals. How many crystals total?',
        answer: 35,
        hint: 'Multiply the number of groups by crystals per group',
        reward: 'Crystal of Wisdom obtained! 🔮'
      },
      {
        id: 3,
        title: 'The Dragon\'s Bridge',
        scene: '🌉🐲 A dragon guards the ancient bridge. Answer its challenge!',
        icon: '🐲',
        background: 'from-red-400 to-orange-500',
        problem: 'The dragon is 156 years old. The bridge is 3 times older. How old is the bridge?',
        answer: 468,
        hint: 'Multiply the dragon\'s age by 3',
        reward: 'Dragon\'s Blessing received! 🐲✨'
      },
      {
        id: 4,
        title: 'The Wizard\'s Tower',
        scene: '🏰✨🧙‍♂️ The wise wizard tests your mathematical knowledge!',
        icon: '🧙‍♂️',
        background: 'from-indigo-400 to-purple-500',
        problem: 'A spell requires ingredients in ratio 2:3. If you have 8 rare herbs, how many common herbs do you need?',
        answer: 12,
        hint: 'If 2 parts = 8 herbs, then 1 part = 4 herbs. You need 3 parts of common herbs.',
        reward: 'Wizard\'s Staff of Mathematics! 🪄'
      },
      {
        id: 5,
        title: 'The Treasure Chamber',
        scene: '🏰💰🗝️ The final treasure awaits! Solve the ultimate puzzle!',
        icon: '💰',
        background: 'from-yellow-400 to-orange-500',
        problem: 'The treasure chest has a 3-digit combination. The hundreds digit is 4, tens digit is twice the hundreds, ones digit is the sum of the first two. What\'s the combination?',
        answer: 484,
        hint: 'Hundreds = 4, Tens = 2 × 4 = 8, Ones = 4 + 8 = 12 (use the ones digit only)',
        reward: 'THE GOLDEN TREASURE OF KNOWLEDGE! 🏆💰'
      }
    ];

    const currentStage = questStages[gameState.questProgress] || questStages[0];

    useEffect(() => {
      if (currentGame === 'math-quest' && !gameState.gameStarted) {
        setGameState(prev => ({ 
          ...prev, 
          gameStarted: true,
          questProgress: 0,
          cluesFound: [],
          lives: 3
        }));
      }
    }, [currentGame, gameState.gameStarted]);

    const checkQuestAnswer = () => {
      const userNum = parseFloat(gameState.userAnswer);
      const correct = Math.abs(userNum - currentStage.answer) < 0.01;
      
      setGameState(prev => ({
        ...prev,
        isCorrect: correct,
        showFeedback: true,
        score: correct ? prev.score + 20 : prev.score,
        lives: correct ? prev.lives : Math.max(0, prev.lives - 1)
      }));

      setTimeout(() => {
        if (correct) {
          if (gameState.questProgress < questStages.length - 1) {
            setGameState(prev => ({
              ...prev,
              questProgress: prev.questProgress + 1,
              userAnswer: '',
              showFeedback: false,
              isCorrect: false,
              cluesFound: [...prev.cluesFound, currentStage.reward]
            }));
          } else {
            setGameState(prev => ({ ...prev, gameCompleted: true }));
          }
        } else {
          if (gameState.lives <= 1) {
            setGameState(prev => ({ ...prev, gameCompleted: true }));
          } else {
            setGameState(prev => ({
              ...prev,
              userAnswer: '',
              showFeedback: false,
              isCorrect: false
            }));
          }
        }
      }, 3000);
    };

    const useHint = () => {
      alert(`💡 Hint: ${currentStage.hint}`);
    };

    const exitGame = () => {
      const earnedXP = gameState.score + (gameState.questProgress * 15);
      setTotalXP(totalXP + earnedXP);
      setCurrentGame(null);
      setGameState({});
    };

    if (gameState.gameCompleted) {
      const earnedXP = gameState.score + (gameState.questProgress * 15);
      const completed = gameState.questProgress >= questStages.length - 1;
      
      return (
        <div className={`min-h-screen bg-gradient-to-br ${completed ? 'from-yellow-400 to-orange-500' : 'from-red-400 to-gray-500'} flex items-center justify-center p-8`}>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 max-w-3xl text-center shadow-2xl">
            <div className="text-8xl mb-6">{completed ? '🏆' : '☠️'}</div>
            <h1 className="text-5xl font-black mb-6">
              {completed ? 'Quest Completed!' : 'Quest Failed!'}
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              {completed 
                ? 'You have conquered the Math Quest and found the legendary treasure!'
                : `You made it to stage ${gameState.questProgress + 1} of ${questStages.length}. Try again to continue your adventure!`
              }
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-100 rounded-2xl p-6">
                <div className="text-4xl font-black text-blue-600">{gameState.questProgress + 1}</div>
                <div className="text-blue-800 font-bold">Stages Completed</div>
              </div>
              <div className="bg-green-100 rounded-2xl p-6">
                <div className="text-4xl font-black text-green-600">{earnedXP}</div>
                <div className="text-green-800 font-bold">XP Earned</div>
              </div>
              <div className="bg-purple-100 rounded-2xl p-6">
                <div className="text-4xl font-black text-purple-600">{gameState.cluesFound.length}</div>
                <div className="text-purple-800 font-bold">Treasures Found</div>
              </div>
            </div>

            {gameState.cluesFound.length > 0 && (
              <div className="bg-yellow-100 rounded-2xl p-6 mb-8 border-4 border-yellow-300">
                <h3 className="text-xl font-bold text-yellow-800 mb-4">📜 Your Collected Treasures:</h3>
                <div className="space-y-2">
                  {gameState.cluesFound.map((clue, i) => (
                    <div key={i} className="text-yellow-700 font-medium">• {clue}</div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={() => {
                  setGameState({
                    ...gameState,
                    gameCompleted: false,
                    questProgress: 0,
                    score: 0,
                    lives: 3,
                    cluesFound: [],
                    userAnswer: '',
                    showFeedback: false
                  });
                }}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full text-xl font-bold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg mr-4"
              >
                🔄 New Quest
              </button>
              <button
                onClick={exitGame}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-full font-bold hover:from-gray-600 hover:to-gray-700 transition-all"
              >
                ← Back to Games
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`min-h-screen bg-gradient-to-br ${currentStage.background} p-8`}>
        <div className="max-w-5xl mx-auto">
          {/* Game Header */}
          <div className="bg-white/90 rounded-2xl p-6 mb-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div className="text-3xl font-black text-purple-600">🗺️ Math Quest Adventure</div>
              <button
                onClick={exitGame}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-bold"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-black text-purple-600">{gameState.questProgress + 1}/5</div>
                <div className="text-sm text-gray-600">🗺️ Stage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-green-600">{gameState.score}</div>
                <div className="text-sm text-gray-600">💰 Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-red-600">{gameState.lives}</div>
                <div className="text-sm text-gray-600">❤️ Lives</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-blue-600">{gameState.cluesFound?.length || 0}</div>
                <div className="text-sm text-gray-600">📜 Treasures</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-purple-400 to-pink-500 h-4 rounded-full transition-all"
                  style={{ width: `${((gameState.questProgress + 1) / questStages.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quest Scene */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">{currentStage.icon}</div>
              <h2 className="text-4xl font-black mb-4 text-gray-800">{currentStage.title}</h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                {currentStage.scene}
              </p>
            </div>

            {/* Problem */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 mb-8 border-4 border-yellow-300">
              <h3 className="text-2xl font-bold text-orange-800 mb-4 text-center">🧩 The Challenge:</h3>
              <p className="text-xl text-orange-700 text-center font-medium">
                {currentStage.problem}
              </p>
            </div>

            {!gameState.showFeedback ? (
              <div className="text-center space-y-6">
                <input
                  type="text"
                  value={gameState.userAnswer}
                  onChange={(e) => setGameState(prev => ({ ...prev, userAnswer: e.target.value }))}
                  className="text-4xl text-center border-4 border-purple-400 rounded-2xl p-6 w-64 focus:border-pink-500 focus:outline-none shadow-lg font-bold bg-purple-50"
                  placeholder="?"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && gameState.userAnswer && checkQuestAnswer()}
                />
                <br />
                <div className="space-x-4">
                  <button
                    onClick={checkQuestAnswer}
                    disabled={!gameState.userAnswer}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ⚔️ Face the Challenge!
                  </button>
                  <button
                    onClick={useHint}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-4 rounded-full font-bold hover:from-yellow-600 hover:to-orange-600 transition-all"
                  >
                    💡 Use Hint
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-center">
                {gameState.isCorrect ? (
                  <div className="bg-green-100 border-4 border-green-300 rounded-3xl p-8">
                    <div className="text-6xl mb-4">✨</div>
                    <h3 className="text-3xl font-bold text-green-700 mb-3">Well Done, Adventurer!</h3>
                    <p className="text-green-600 text-xl mb-4">You solved the challenge! +20 XP</p>
                    <div className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-4">
                      <p className="text-yellow-800 font-bold">{currentStage.reward}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-100 border-4 border-red-300 rounded-3xl p-8">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h3 className="text-3xl font-bold text-red-700 mb-3">Not Quite Right!</h3>
                    <p className="text-red-600 text-xl mb-4">
                      The answer was {currentStage.answer}. You lost a life! ❤️
                    </p>
                    <p className="text-red-600">
                      {gameState.lives > 1 ? 'Try the next challenge!' : 'Game Over! Your quest ends here.'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Game: Fraction Chef - Cooking with fractions
  const FractionChefGame = () => {
    const recipes = [
      {
        id: 1,
        name: 'Magic Pizza',
        icon: '🍕',
        background: 'from-red-400 to-orange-500',
        ingredients: [
          { name: 'Cheese', fraction: '1/2', visual: '🧀' },
          { name: 'Tomato', fraction: '1/4', visual: '🍅' },
          { name: 'Pepperoni', fraction: '1/8', visual: '🌶️' }
        ],
        question: 'What fraction of the pizza is covered with toppings in total?',
        answer: '7/8',
        decimalAnswer: 0.875,
        hint: 'Add all the fractions: 1/2 + 1/4 + 1/8. Find common denominator 8.'
      },
      {
        id: 2,
        name: 'Chocolate Cake',
        icon: '🍰',
        background: 'from-amber-400 to-yellow-500',
        ingredients: [
          { name: 'Flour', fraction: '2/3', visual: '🌾' },
          { name: 'Sugar', fraction: '1/2', visual: '🍯' },
          { name: 'Cocoa', fraction: '1/6', visual: '🍫' }
        ],
        question: 'If the recipe serves 6 people, how much flour does each person get? (Answer as decimal)',
        answer: '1/9',
        decimalAnswer: 0.111,
        hint: 'Divide the flour fraction (2/3) by 6 people. That\'s (2/3) ÷ 6 = (2/3) × (1/6)'
      },
      {
        id: 3,
        name: 'Fruit Smoothie',
        icon: '🥤',
        background: 'from-pink-400 to-purple-500',
        ingredients: [
          { name: 'Banana', fraction: '3/4', visual: '🍌' },
          { name: 'Strawberry', fraction: '1/2', visual: '🍓' },
          { name: 'Blueberry', fraction: '1/4', visual: '🫐' }
        ],
        question: 'How much more banana than blueberry is in the smoothie? (Answer as decimal)',
        answer: '1/2',
        decimalAnswer: 0.5,
        hint: 'Subtract: 3/4 - 1/4 = 2/4 = 1/2 = 0.5'
      },
      {
        id: 4,
        name: 'Trail Mix',
        icon: '🥜',
        background: 'from-green-400 to-teal-500',
        ingredients: [
          { name: 'Nuts', fraction: '2/5', visual: '🥜' },
          { name: 'Raisins', fraction: '1/3', visual: '🍇' },
          { name: 'Chocolate', fraction: '1/15', visual: '🍫' }
        ],
        question: 'What fraction of the trail mix is nuts and raisins combined? (Answer as decimal)',
        answer: '11/15',
        decimalAnswer: 0.733,
        hint: 'Add 2/5 + 1/3. Find common denominator 15: 6/15 + 5/15 = 11/15'
      },
      {
        id: 5,
        name: 'Rainbow Sundae',
        icon: '🍨',
        background: 'from-blue-400 to-indigo-500',
        ingredients: [
          { name: 'Vanilla', fraction: '3/8', visual: '🍦' },
          { name: 'Chocolate', fraction: '1/4', visual: '🍫' },
          { name: 'Sprinkles', fraction: '1/8', visual: '✨' }
        ],
        question: 'If you double the recipe, what fraction will be vanilla ice cream? (Answer as decimal)',
        answer: '3/4',
        decimalAnswer: 0.75,
        hint: 'Double means multiply by 2: (3/8) × 2 = 6/8 = 3/4 = 0.75'
      }
    ];

    const currentRecipe = recipes[gameState.currentQuestion] || recipes[0];

    useEffect(() => {
      if (currentGame === 'fraction-chef' && !gameState.gameStarted) {
        setGameState(prev => ({ 
          ...prev, 
          gameStarted: true,
          currentQuestion: 0,
          ingredientsCollected: [],
          score: 0,
          streak: 0
        }));
      }
    }, [currentGame, gameState.gameStarted]);

    const checkRecipeAnswer = () => {
      const userNum = parseFloat(gameState.userAnswer);
      const correct = Math.abs(userNum - currentRecipe.decimalAnswer) < 0.01 || 
                     gameState.userAnswer.trim() === currentRecipe.answer;
      
      setGameState(prev => ({
        ...prev,
        isCorrect: correct,
        showFeedback: true,
        score: correct ? prev.score + 25 : prev.score,
        streak: correct ? prev.streak + 1 : 0,
        ingredientsCollected: correct 
          ? [...prev.ingredientsCollected, currentRecipe.name]
          : prev.ingredientsCollected
      }));

      setTimeout(() => {
        if (gameState.currentQuestion < recipes.length - 1) {
          setGameState(prev => ({
            ...prev,
            currentQuestion: prev.currentQuestion + 1,
            userAnswer: '',
            showFeedback: false,
            isCorrect: false
          }));
        } else {
          setGameState(prev => ({ ...prev, gameCompleted: true }));
        }
      }, 3000);
    };

    const useHint = () => {
      alert(`👩‍🍳 Chef's Tip: ${currentRecipe.hint}`);
    };

    const exitGame = () => {
      const earnedXP = gameState.score + (gameState.ingredientsCollected?.length || 0) * 10;
      setTotalXP(totalXP + earnedXP);
      setCurrentGame(null);
      setGameState({});
    };

    if (!gameState.gameStarted) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center p-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 max-w-2xl text-center shadow-2xl">
            <div className="text-8xl mb-6 animate-bounce">🍕</div>
            <h1 className="text-5xl font-black mb-6 text-orange-600">Fraction Chef!</h1>
            <p className="text-xl text-gray-700 mb-8">
              Welcome to the kitchen! Help Chef Fraction create delicious recipes by solving fraction problems.
              Each correct answer earns you a completed dish! 👩‍🍳
            </p>
            <div className="bg-yellow-100 rounded-2xl p-6 mb-8 border-4 border-yellow-300">
              <h3 className="text-lg font-bold text-yellow-800 mb-4">🍳 Kitchen Rules:</h3>
              <div className="text-left space-y-2 text-yellow-700">
                <p>• 🍕 Cook 5 different recipes</p>
                <p>• 🥚 Each correct answer = 25 XP + bonus ingredients</p>
                <p>• 📊 Answer as decimal (like 0.5) or fraction (like 1/2)</p>
                <p>• 💡 Use hints if you get stuck!</p>
              </div>
            </div>
            <button
              onClick={() => setGameState(prev => ({ ...prev, gameStarted: true }))}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-12 py-4 rounded-full text-2xl font-bold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
            >
              👩‍🍳 Start Cooking!
            </button>
            <br /><br />
            <button
              onClick={exitGame}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-bold transition-all"
            >
              ← Back to Games
            </button>
          </div>
        </div>
      );
    }

    if (gameState.gameCompleted) {
      const earnedXP = gameState.score + (gameState.ingredientsCollected?.length || 0) * 10;
      
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 max-w-3xl text-center shadow-2xl">
            <div className="text-8xl mb-6">🎆</div>
            <h1 className="text-5xl font-black mb-6">Cooking Complete!</h1>
            <p className="text-xl text-gray-700 mb-8">
              Congratulations, Chef! You've mastered the art of fraction cooking!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-100 rounded-2xl p-6">
                <div className="text-4xl font-black text-blue-600">{gameState.ingredientsCollected?.length || 0}/5</div>
                <div className="text-blue-800 font-bold">Recipes Completed</div>
              </div>
              <div className="bg-green-100 rounded-2xl p-6">
                <div className="text-4xl font-black text-green-600">{earnedXP}</div>
                <div className="text-green-800 font-bold">XP Earned</div>
              </div>
              <div className="bg-orange-100 rounded-2xl p-6">
                <div className="text-4xl font-black text-orange-600">{gameState.streak}</div>
                <div className="text-orange-800 font-bold">Best Streak</div>
              </div>
            </div>

            {gameState.ingredientsCollected && gameState.ingredientsCollected.length > 0 && (
              <div className="bg-yellow-100 rounded-2xl p-6 mb-8 border-4 border-yellow-300">
                <h3 className="text-xl font-bold text-yellow-800 mb-4">🍳 Your Culinary Creations:</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {gameState.ingredientsCollected.map((recipe, i) => (
                    <div key={i} className="bg-white/70 rounded-full px-4 py-2 text-sm font-bold text-yellow-700">
                      {recipes.find(r => r.name === recipe)?.icon} {recipe}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={() => {
                  setGameState({
                    ...gameState,
                    gameCompleted: false,
                    currentQuestion: 0,
                    score: 0,
                    streak: 0,
                    ingredientsCollected: [],
                    userAnswer: '',
                    showFeedback: false
                  });
                }}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full text-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg mr-4"
              >
                🔄 Cook Again
              </button>
              <button
                onClick={exitGame}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-full font-bold hover:from-gray-600 hover:to-gray-700 transition-all"
              >
                ← Back to Games
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`min-h-screen bg-gradient-to-br ${currentRecipe.background} p-8`}>
        <div className="max-w-5xl mx-auto">
          {/* Game Header */}
          <div className="bg-white/90 rounded-2xl p-6 mb-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div className="text-3xl font-black text-orange-600">🍕 Fraction Chef</div>
              <button
                onClick={exitGame}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-bold"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-black text-orange-600">{gameState.currentQuestion + 1}/5</div>
                <div className="text-sm text-gray-600">🍳 Recipe</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-green-600">{gameState.score}</div>
                <div className="text-sm text-gray-600">⭐ Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-blue-600">{gameState.streak}</div>
                <div className="text-sm text-gray-600">🔥 Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-purple-600">{gameState.ingredientsCollected?.length || 0}</div>
                <div className="text-sm text-gray-600">🍕 Dishes</div>
              </div>
            </div>
            
            {/* Progress */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-orange-400 to-red-500 h-4 rounded-full transition-all"
                  style={{ width: `${((gameState.currentQuestion + 1) / recipes.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Recipe Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">{currentRecipe.icon}</div>
              <h2 className="text-4xl font-black mb-4 text-gray-800">{currentRecipe.name}</h2>
              <p className="text-xl text-gray-600 mb-8">Let's cook this delicious recipe together!</p>
            </div>

            {/* Ingredients */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 mb-8 border-4 border-blue-200">
              <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">🥚 Recipe Ingredients:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentRecipe.ingredients.map((ingredient, i) => (
                  <div key={i} className="text-center bg-white rounded-2xl p-4 shadow-md">
                    <div className="text-4xl mb-2">{ingredient.visual}</div>
                    <div className="text-lg font-bold text-gray-700">{ingredient.name}</div>
                    <div className="text-2xl font-black text-blue-600">{ingredient.fraction}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Question */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 mb-8 border-4 border-yellow-300">
              <h3 className="text-2xl font-bold text-orange-800 mb-4 text-center">❓ Cooking Challenge:</h3>
              <p className="text-xl text-orange-700 text-center font-medium">
                {currentRecipe.question}
              </p>
            </div>

            {!gameState.showFeedback ? (
              <div className="text-center space-y-6">
                <input
                  type="text"
                  value={gameState.userAnswer}
                  onChange={(e) => setGameState(prev => ({ ...prev, userAnswer: e.target.value }))}
                  className="text-4xl text-center border-4 border-orange-400 rounded-2xl p-6 w-64 focus:border-red-500 focus:outline-none shadow-lg font-bold bg-orange-50"
                  placeholder="0.5 or 1/2"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && gameState.userAnswer && checkRecipeAnswer()}
                />
                <br />
                <div className="space-x-4">
                  <button
                    onClick={checkRecipeAnswer}
                    disabled={!gameState.userAnswer}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🍳 Cook It!
                  </button>
                  <button
                    onClick={useHint}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-4 rounded-full font-bold hover:from-yellow-600 hover:to-orange-600 transition-all"
                  >
                    💡 Chef's Tip
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-center">
                {gameState.isCorrect ? (
                  <div className="bg-green-100 border-4 border-green-300 rounded-3xl p-8">
                    <div className="text-6xl mb-4">🎆</div>
                    <h3 className="text-3xl font-bold text-green-700 mb-3">Perfect Recipe!</h3>
                    <p className="text-green-600 text-xl mb-4">
                      Delicious! You earned 25 XP and completed {currentRecipe.name}! 🍳
                    </p>
                    <div className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-4">
                      <div className="text-4xl mb-2">{currentRecipe.icon}</div>
                      <p className="text-yellow-800 font-bold">{currentRecipe.name} added to your cookbook!</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-100 border-4 border-red-300 rounded-3xl p-8">
                    <div className="text-6xl mb-4">😅</div>
                    <h3 className="text-3xl font-bold text-red-700 mb-3">Oops! Recipe Failed!</h3>
                    <p className="text-red-600 text-xl mb-4">
                      The correct answer was {currentRecipe.answer} ({currentRecipe.decimalAnswer}). 
                      Let's try the next recipe!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Game: Geometry City Builder - Building with shapes
  const GeometryCityBuilderGame = () => {
    const buildings = [
      {
        id: 1,
        name: 'Triangle Tower',
        shape: 'triangle',
        icon: '🔺',
        question: 'A triangle has angles of 60°, 60°, and ?°. What is the missing angle?',
        answer: 60,
        hint: 'All angles in a triangle add up to 180°',
        cost: 100,
        reward: 'Triangle Tower built! +50 XP',
        visual: '▲'
      },
      {
        id: 2,
        name: 'Square Mall',
        shape: 'square',
        icon: '🟦',
        question: 'A square has a perimeter of 20 units. What is the length of one side?',
        answer: 5,
        hint: 'Perimeter = 4 × side length. So side = perimeter ÷ 4',
        cost: 150,
        reward: 'Square Mall constructed! +75 XP',
        visual: '■'
      },
      {
        id: 3,
        name: 'Circle Park',
        shape: 'circle',
        icon: '🟢',
        question: 'A circle has a radius of 4 units. What is its diameter?',
        answer: 8,
        hint: 'Diameter = 2 × radius',
        cost: 200,
        reward: 'Circle Park opened! +100 XP',
        visual: '●'
      },
      {
        id: 4,
        name: 'Rectangle Stadium',
        shape: 'rectangle',
        icon: '🟪',
        question: 'A rectangle has length 8 and width 3. What is its area?',
        answer: 24,
        hint: 'Area = length × width',
        cost: 250,
        reward: 'Rectangle Stadium built! +125 XP',
        visual: '▬'
      },
      {
        id: 5,
        name: 'Pentagon Plaza',
        shape: 'pentagon',
        icon: '⬟',
        question: 'How many sides does a pentagon have?',
        answer: 5,
        hint: 'Penta means five in Greek',
        cost: 300,
        reward: 'Pentagon Plaza completed! +150 XP',
        visual: '⬟'
      },
      {
        id: 6,
        name: 'Hexagon Hotel',
        shape: 'hexagon',
        icon: '⬡',
        question: 'A regular hexagon has all sides equal to 6 units. What is its perimeter?',
        answer: 36,
        hint: 'Perimeter = number of sides × side length',
        cost: 350,
        reward: 'Hexagon Hotel opened! +175 XP',
        visual: '⬡'
      }
    ];

    const currentBuilding = buildings[gameState.currentQuestion] || buildings[0];
    const totalCost = buildings.reduce((sum, b) => sum + b.cost, 0);
    const earnedMoney = gameState.score * 50;

    useEffect(() => {
      if (currentGame === 'geometry-builder' && !gameState.gameStarted) {
        setGameState(prev => ({ 
          ...prev, 
          gameStarted: true,
          currentQuestion: 0,
          cityBuildings: [],
          score: 0,
          money: 500, // Starting money
          level: 1
        }));
      }
    }, [currentGame, gameState.gameStarted]);

    const checkBuildingAnswer = () => {
      const userNum = parseFloat(gameState.userAnswer);
      const correct = Math.abs(userNum - currentBuilding.answer) < 0.01;
      
      setGameState(prev => ({
        ...prev,
        isCorrect: correct,
        showFeedback: true,
        score: correct ? prev.score + 1 : prev.score,
        money: correct ? prev.money + earnedMoney : prev.money,
        cityBuildings: correct 
          ? [...prev.cityBuildings, currentBuilding]
          : prev.cityBuildings
      }));

      setTimeout(() => {
        if (gameState.currentQuestion < buildings.length - 1) {
          setGameState(prev => ({
            ...prev,
            currentQuestion: prev.currentQuestion + 1,
            userAnswer: '',
            showFeedback: false,
            isCorrect: false
          }));
        } else {
          setGameState(prev => ({ ...prev, gameCompleted: true }));
        }
      }, 3000);
    };

    const useHint = () => {
      alert(`🏗️ Architect's Tip: ${currentBuilding.hint}`);
    };

    const exitGame = () => {
      const earnedXP = (gameState.cityBuildings?.length || 0) * 25 + gameState.score * 10;
      setTotalXP(totalXP + earnedXP);
      setCurrentGame(null);
      setGameState({});
    };

    if (!gameState.gameStarted) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center p-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 max-w-2xl text-center shadow-2xl">
            <div className="text-8xl mb-6 animate-bounce">🏗️</div>
            <h1 className="text-5xl font-black mb-6 text-green-600">Geometry City Builder!</h1>
            <p className="text-xl text-gray-700 mb-8">
              Welcome, architect! Build your dream city by solving geometry problems.
              Each correct answer lets you construct a new building! 🏙️
            </p>
            <div className="bg-blue-100 rounded-2xl p-6 mb-8 border-4 border-blue-300">
              <h3 className="text-lg font-bold text-blue-800 mb-4">🏗️ Building Rules:</h3>
              <div className="text-left space-y-2 text-blue-700">
                <p>• 🏢 Build 6 different geometric buildings</p>
                <p>• 💰 Earn money for each correct answer</p>
                <p>• 🎯 Answer geometry questions to unlock buildings</p>
                <p>• 🏆 Complete your city to become Master Architect!</p>
              </div>
            </div>
            <button
              onClick={() => setGameState(prev => ({ ...prev, gameStarted: true }))}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-12 py-4 rounded-full text-2xl font-bold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
            >
              🏗️ Start Building!
            </button>
            <br /><br />
            <button
              onClick={exitGame}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-bold transition-all"
            >
              ← Back to Games
            </button>
          </div>
        </div>
      );
    }

    if (gameState.gameCompleted) {
      const earnedXP = (gameState.cityBuildings?.length || 0) * 25 + gameState.score * 10;
      
      return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center p-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 max-w-4xl text-center shadow-2xl">
            <div className="text-8xl mb-6">🏆</div>
            <h1 className="text-5xl font-black mb-6">City Complete!</h1>
            <p className="text-xl text-gray-700 mb-8">
              Congratulations, Master Architect! You've built a magnificent geometric city!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-100 rounded-2xl p-6">
                <div className="text-4xl font-black text-blue-600">{gameState.cityBuildings?.length || 0}/6</div>
                <div className="text-blue-800 font-bold">Buildings Built</div>
              </div>
              <div className="bg-green-100 rounded-2xl p-6">
                <div className="text-4xl font-black text-green-600">{earnedXP}</div>
                <div className="text-green-800 font-bold">XP Earned</div>
              </div>
              <div className="bg-purple-100 rounded-2xl p-6">
                <div className="text-4xl font-black text-purple-600">${gameState.money}</div>
                <div className="text-purple-800 font-bold">Total Money</div>
              </div>
            </div>

            {/* City Skyline */}
            <div className="bg-gradient-to-t from-green-200 to-blue-200 rounded-3xl p-8 mb-8 border-4 border-green-300">
              <h3 className="text-2xl font-bold text-green-800 mb-6">🏙️ Your Geometric City:</h3>
              <div className="flex justify-center items-end space-x-2 text-6xl mb-4">
                {gameState.cityBuildings && gameState.cityBuildings.map((building, i) => (
                  <div key={i} className="text-center">
                    <div className="animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
                      {building.visual}
                    </div>
                    <div className="text-xs font-bold text-green-700 mt-1">{building.shape}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {gameState.cityBuildings && gameState.cityBuildings.map((building, i) => (
                  <div key={i} className="bg-white/70 rounded-lg p-2 text-sm font-bold text-green-700">
                    {building.icon} {building.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setGameState({
                    ...gameState,
                    gameCompleted: false,
                    currentQuestion: 0,
                    score: 0,
                    cityBuildings: [],
                    money: 500,
                    userAnswer: '',
                    showFeedback: false
                  });
                }}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full text-xl font-bold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg mr-4"
              >
                🔄 Build New City
              </button>
              <button
                onClick={exitGame}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-full font-bold hover:from-gray-600 hover:to-gray-700 transition-all"
              >
                ← Back to Games
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-teal-500 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Game Header */}
          <div className="bg-white/90 rounded-2xl p-6 mb-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div className="text-3xl font-black text-green-600">🏗️ Geometry City Builder</div>
              <button
                onClick={exitGame}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-bold"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-black text-green-600">{gameState.currentQuestion + 1}/6</div>
                <div className="text-sm text-gray-600">🏢 Building</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-blue-600">{gameState.cityBuildings?.length || 0}</div>
                <div className="text-sm text-gray-600">🏗️ Built</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-purple-600">${gameState.money}</div>
                <div className="text-sm text-gray-600">💰 Money</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-orange-600">{gameState.score}</div>
                <div className="text-sm text-gray-600">✅ Correct</div>
              </div>
            </div>
            
            {/* Progress */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-green-400 to-teal-500 h-4 rounded-full transition-all"
                  style={{ width: `${((gameState.currentQuestion + 1) / buildings.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Current City View */}
          <div className="bg-gradient-to-t from-green-200 to-blue-200 rounded-3xl p-8 mb-6 border-4 border-green-300">
            <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">🏙️ Your City So Far:</h3>
            <div className="flex justify-center items-end space-x-2 text-4xl mb-4 min-h-20">
              {gameState.cityBuildings && gameState.cityBuildings.length > 0 ? (
                gameState.cityBuildings.map((building, i) => (
                  <div key={i} className="text-center animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
                    <div>{building.visual}</div>
                    <div className="text-xs font-bold text-green-700 mt-1">{building.shape}</div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-xl">🏗️ Start building your city!</div>
              )}
            </div>
          </div>

          {/* Building Blueprint */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">{currentBuilding.icon}</div>
              <h2 className="text-4xl font-black mb-4 text-gray-800">{currentBuilding.name}</h2>
              <div className="bg-blue-100 rounded-2xl p-4 mb-6 border-2 border-blue-300">
                <div className="text-6xl mb-2">{currentBuilding.visual}</div>
                <p className="text-blue-700 font-bold">Shape: {currentBuilding.shape}</p>
                <p className="text-blue-600">Cost: ${currentBuilding.cost}</p>
              </div>
            </div>

            {/* Geometry Problem */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 mb-8 border-4 border-yellow-300">
              <h3 className="text-2xl font-bold text-orange-800 mb-4 text-center">📐 Geometry Challenge:</h3>
              <p className="text-xl text-orange-700 text-center font-medium">
                {currentBuilding.question}
              </p>
            </div>

            {!gameState.showFeedback ? (
              <div className="text-center space-y-6">
                <input
                  type="text"
                  value={gameState.userAnswer}
                  onChange={(e) => setGameState(prev => ({ ...prev, userAnswer: e.target.value }))}
                  className="text-4xl text-center border-4 border-green-400 rounded-2xl p-6 w-64 focus:border-teal-500 focus:outline-none shadow-lg font-bold bg-green-50"
                  placeholder="?"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && gameState.userAnswer && checkBuildingAnswer()}
                />
                <br />
                <div className="space-x-4">
                  <button
                    onClick={checkBuildingAnswer}
                    disabled={!gameState.userAnswer}
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🏗️ Build It!
                  </button>
                  <button
                    onClick={useHint}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-4 rounded-full font-bold hover:from-yellow-600 hover:to-orange-600 transition-all"
                  >
                    💡 Architect's Tip
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-center">
                {gameState.isCorrect ? (
                  <div className="bg-green-100 border-4 border-green-300 rounded-3xl p-8">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-3xl font-bold text-green-700 mb-3">Building Complete!</h3>
                    <p className="text-green-600 text-xl mb-4">
                      Excellent work! You built the {currentBuilding.name}! 🏗️
                    </p>
                    <div className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-4">
                      <div className="text-4xl mb-2">{currentBuilding.icon}</div>
                      <p className="text-yellow-800 font-bold">{currentBuilding.reward}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-100 border-4 border-red-300 rounded-3xl p-8">
                    <div className="text-6xl mb-4">🔧</div>
                    <h3 className="text-3xl font-bold text-red-700 mb-3">Construction Failed!</h3>
                    <p className="text-red-600 text-xl mb-4">
                      The correct answer was {currentBuilding.answer}. 
                      Let's try building the next structure!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Game: Algebra Detective - Mystery solving with equations
  const AlgebraDetectiveGame = () => {
    const mysteries = [
      {
        id: 1,
        title: 'The Case of the Missing Numbers',
        scene: '🔎 A mysterious equation has appeared on the blackboard. The variable x holds the key to solving this case!',
        icon: '🔍',
        background: 'from-indigo-400 to-purple-500',
        equation: 'x + 7 = 15',
        question: 'What is the value of x?',
        answer: 8,
        hint: 'Subtract 7 from both sides: x = 15 - 7',
        story: 'The suspect left 7 footprints before the crime scene, and 15 total footprints were found.',
        evidence: '👣 Footprint Evidence'
      },
      {
        id: 2,
        title: 'The Mysterious Multiplication',
        scene: '🕵️‍♂️ The detective found a coded message. Only algebra can crack this cipher!',
        icon: '📜',
        background: 'from-green-400 to-blue-500',
        equation: '3y = 21',
        question: 'What is the value of y?',
        answer: 7,
        hint: 'Divide both sides by 3: y = 21 ÷ 3',
        story: 'Three identical stolen jewels were worth 21 gold coins total.',
        evidence: '💎 Diamond Clues'
      },
      {
        id: 3,
        title: 'The Secret of the Double Agent',
        scene: '🤵 A double agent left behind a complex equation. Can you decode their secret?',
        icon: '🤵',
        background: 'from-red-400 to-pink-500',
        equation: '2z + 5 = 17',
        question: 'What is the value of z?',
        answer: 6,
        hint: 'First subtract 5 from both sides, then divide by 2: z = (17-5) ÷ 2',
        story: 'The agent made 2 trips carrying z items each, plus 5 extra items, totaling 17.',
        evidence: '🎒 Secret Documents'
      },
      {
        id: 4,
        title: 'The Puzzle of the Divided Treasure',
        scene: '🏴‍☠️ Pirates left a treasure map with an algebraic riddle!',
        icon: '🏴‍☠️',
        background: 'from-yellow-400 to-orange-500',
        equation: 'a/4 = 9',
        question: 'What is the value of a?',
        answer: 36,
        hint: 'Multiply both sides by 4: a = 9 × 4',
        story: 'The treasure was divided equally among 4 pirates, each getting 9 gold coins.',
        evidence: '🏴‍☠️ Pirate Map'
      },
      {
        id: 5,
        title: 'The Case of the Complex Conspiracy',
        scene: '🎭 A theatrical mystery involves multiple variables and complex relationships!',
        icon: '🎭',
        background: 'from-purple-400 to-indigo-500',
        equation: '5b - 8 = 27',
        question: 'What is the value of b?',
        answer: 7,
        hint: 'Add 8 to both sides first, then divide by 5: b = (27+8) ÷ 5',
        story: 'Five actors each had b costume changes, minus 8 costumes that were damaged, leaving 27 good costumes.',
        evidence: '🎭 Theater Evidence'
      },
      {
        id: 6,
        title: 'The Ultimate Algebraic Mystery',
        scene: '🔮 The final case requires all your detective skills to solve this master equation!',
        icon: '🔮',
        background: 'from-gray-400 to-gray-600',
        equation: '3(c + 4) = 30',
        question: 'What is the value of c?',
        answer: 6,
        hint: 'First divide by 3: c + 4 = 10, then subtract 4: c = 6',
        story: 'Three mystery boxes each contained (c + 4) clues, totaling 30 clues.',
        evidence: '🔮 Master Evidence'
      }
    ];

    const currentMystery = mysteries[gameState.currentQuestion] || mysteries[0];

    useEffect(() => {
      if (currentGame === 'algebra-detective' && !gameState.gameStarted) {
        setGameState(prev => ({ 
          ...prev, 
          gameStarted: true,
          currentQuestion: 0,
          cluesFound: [],
          score: 0,
          detectiveRank: 'Rookie',
          cases: 0
        }));
      }
    }, [currentGame, gameState.gameStarted]);

    const checkMysteryAnswer = () => {
      const userNum = parseFloat(gameState.userAnswer);
      const correct = Math.abs(userNum - currentMystery.answer) < 0.01;
      
      const ranks = ['Rookie', 'Detective', 'Inspector', 'Chief Inspector', 'Master Detective', 'Legendary Sleuth'];
      const newRank = ranks[Math.min(ranks.length - 1, gameState.score + (correct ? 1 : 0))];
      
      setGameState(prev => ({
        ...prev,
        isCorrect: correct,
        showFeedback: true,
        score: correct ? prev.score + 1 : prev.score,
        cases: correct ? prev.cases + 1 : prev.cases,
        detectiveRank: newRank,
        cluesFound: correct 
          ? [...prev.cluesFound, currentMystery.evidence]
          : prev.cluesFound
      }));

      setTimeout(() => {
        if (gameState.currentQuestion < mysteries.length - 1) {
          setGameState(prev => ({
            ...prev,
            currentQuestion: prev.currentQuestion + 1,
            userAnswer: '',
            showFeedback: false,
            isCorrect: false
          }));
        } else {
          setGameState(prev => ({ ...prev, gameCompleted: true }));
        }
      }, 3500);
    };

    const useHint = () => {
      alert(`🔎 Detective's Notebook: ${currentMystery.hint}`);
    };

    const exitGame = () => {
      const earnedXP = gameState.score * 30 + (gameState.cluesFound?.length || 0) * 15;
      setTotalXP(totalXP + earnedXP);
      setCurrentGame(null);
      setGameState({});
    };

    if (!gameState.gameStarted) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center p-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 max-w-2xl text-center shadow-2xl">
            <div className="text-8xl mb-6 animate-bounce">🔍</div>
            <h1 className="text-5xl font-black mb-6 text-indigo-600">Algebra Detective!</h1>
            <p className="text-xl text-gray-700 mb-8">
              Welcome, Detective! The city needs your algebraic skills to solve mysterious cases.
              Use equations to crack codes and catch criminals! 🕵️‍♂️
            </p>
            <div className="bg-purple-100 rounded-2xl p-6 mb-8 border-4 border-purple-300">
              <h3 className="text-lg font-bold text-purple-800 mb-4">📝 Case Rules:</h3>
              <div className="text-left space-y-2 text-purple-700">
                <p>• 🔎 Solve 6 algebraic mysteries</p>
                <p>• 🎆 Each solved case = 30 XP + evidence</p>
                <p>• 📊 Rise through detective ranks</p>
                <p>• 🕵️‍♂️ Use your algebraic skills to find x, y, z, and more!</p>
              </div>
            </div>
            <button
              onClick={() => setGameState(prev => ({ ...prev, gameStarted: true }))}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-12 py-4 rounded-full text-2xl font-bold hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
            >
              🔎 Accept Case!
            </button>
            <br /><br />
            <button
              onClick={exitGame}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-bold transition-all"
            >
              ← Back to Games
            </button>
          </div>
        </div>
      );
    }

    if (gameState.gameCompleted) {
      const earnedXP = gameState.score * 30 + (gameState.cluesFound?.length || 0) * 15;
      
      return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center p-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 max-w-4xl text-center shadow-2xl">
            <div className="text-8xl mb-6">🏆</div>
            <h1 className="text-5xl font-black mb-6">Cases Closed!</h1>
            <p className="text-xl text-gray-700 mb-8">
              Outstanding work, {gameState.detectiveRank}! You've solved all the algebraic mysteries!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-100 rounded-2xl p-6">
                <div className="text-4xl font-black text-blue-600">{gameState.score}/6</div>
                <div className="text-blue-800 font-bold">Cases Solved</div>
              </div>
              <div className="bg-green-100 rounded-2xl p-6">
                <div className="text-4xl font-black text-green-600">{earnedXP}</div>
                <div className="text-green-800 font-bold">XP Earned</div>
              </div>
              <div className="bg-purple-100 rounded-2xl p-6">
                <div className="text-4xl font-black text-purple-600">{gameState.cluesFound?.length || 0}</div>
                <div className="text-purple-800 font-bold">Evidence Found</div>
              </div>
              <div className="bg-yellow-100 rounded-2xl p-6">
                <div className="text-2xl font-black text-yellow-600">{gameState.detectiveRank}</div>
                <div className="text-yellow-800 font-bold">Final Rank</div>
              </div>
            </div>

            {/* Evidence Collection */}
            <div className="bg-indigo-100 rounded-3xl p-8 mb-8 border-4 border-indigo-300">
              <h3 className="text-2xl font-bold text-indigo-800 mb-6">💼 Evidence Collected:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gameState.cluesFound && gameState.cluesFound.map((evidence, i) => (
                  <div key={i} className="bg-white/70 rounded-lg p-3 text-indigo-700 font-bold">
                    • {evidence}
                  </div>
                ))}
              </div>
            </div>

            {/* Detective Badge */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 mb-8 border-4 border-yellow-300">
              <div className="text-6xl mb-4">🏅</div>
              <h3 className="text-3xl font-bold text-orange-800 mb-4">Detective Badge Earned!</h3>
              <p className="text-xl text-orange-700">
                You've reached the rank of <strong>{gameState.detectiveRank}</strong>!
              </p>
              <p className="text-lg text-orange-600 mt-2">
                Your algebraic detective skills are legendary!
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setGameState({
                    ...gameState,
                    gameCompleted: false,
                    currentQuestion: 0,
                    score: 0,
                    cases: 0,
                    cluesFound: [],
                    detectiveRank: 'Rookie',
                    userAnswer: '',
                    showFeedback: false
                  });
                }}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-full text-xl font-bold hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg mr-4"
              >
                🔄 New Cases
              </button>
              <button
                onClick={exitGame}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-full font-bold hover:from-gray-600 hover:to-gray-700 transition-all"
              >
                ← Back to Games
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`min-h-screen bg-gradient-to-br ${currentMystery.background} p-8`}>
        <div className="max-w-6xl mx-auto">
          {/* Game Header */}
          <div className="bg-white/90 rounded-2xl p-6 mb-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div className="text-3xl font-black text-indigo-600">🔍 Algebra Detective</div>
              <button
                onClick={exitGame}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-bold"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-black text-indigo-600">{gameState.currentQuestion + 1}/6</div>
                <div className="text-sm text-gray-600">📝 Case</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-green-600">{gameState.score}</div>
                <div className="text-sm text-gray-600">✅ Solved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-blue-600">{gameState.cluesFound?.length || 0}</div>
                <div className="text-sm text-gray-600">🔍 Evidence</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-black text-purple-600">{gameState.detectiveRank}</div>
                <div className="text-sm text-gray-600">🏅 Rank</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-orange-600">{gameState.cases}</div>
                <div className="text-sm text-gray-600">💼 Cases</div>
              </div>
            </div>
            
            {/* Progress */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-indigo-400 to-purple-500 h-4 rounded-full transition-all"
                  style={{ width: `${((gameState.currentQuestion + 1) / mysteries.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Mystery Case */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">{currentMystery.icon}</div>
              <h2 className="text-4xl font-black mb-4 text-gray-800">{currentMystery.title}</h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed italic">
                {currentMystery.scene}
              </p>
            </div>

            {/* Case Details */}
            <div className="bg-gradient-to-r from-gray-100 to-blue-100 rounded-3xl p-8 mb-8 border-4 border-gray-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">📜 Case File:</h3>
              <p className="text-lg text-gray-700 text-center mb-4 italic">
                {currentMystery.story}
              </p>
              <div className="bg-white rounded-2xl p-6 border-2 border-blue-300">
                <h4 className="text-xl font-bold text-blue-800 mb-3 text-center">The Equation:</h4>
                <div className="text-4xl font-black text-center text-blue-600 mb-4 font-mono">
                  {currentMystery.equation}
                </div>
                <p className="text-lg text-blue-700 text-center font-medium">
                  {currentMystery.question}
                </p>
              </div>
            </div>

            {!gameState.showFeedback ? (
              <div className="text-center space-y-6">
                <input
                  type="text"
                  value={gameState.userAnswer}
                  onChange={(e) => setGameState(prev => ({ ...prev, userAnswer: e.target.value }))}
                  className="text-4xl text-center border-4 border-indigo-400 rounded-2xl p-6 w-64 focus:border-purple-500 focus:outline-none shadow-lg font-bold bg-indigo-50"
                  placeholder="?"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && gameState.userAnswer && checkMysteryAnswer()}
                />
                <br />
                <div className="space-x-4">
                  <button
                    onClick={checkMysteryAnswer}
                    disabled={!gameState.userAnswer}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🔍 Solve Case!
                  </button>
                  <button
                    onClick={useHint}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-4 rounded-full font-bold hover:from-yellow-600 hover:to-orange-600 transition-all"
                  >
                    💡 Check Notes
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-center">
                {gameState.isCorrect ? (
                  <div className="bg-green-100 border-4 border-green-300 rounded-3xl p-8">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-3xl font-bold text-green-700 mb-3">Case Solved!</h3>
                    <p className="text-green-600 text-xl mb-4">
                      Brilliant deduction, Detective! You cracked the case! 🔎
                    </p>
                    <p className="text-green-600 mb-4">
                      The answer x = {currentMystery.answer} was the key to solving this mystery!
                    </p>
                    <div className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-4">
                      <div className="text-3xl mb-2">💼</div>
                      <p className="text-yellow-800 font-bold">Evidence Found: {currentMystery.evidence}</p>
                      <p className="text-yellow-700 mt-2">+30 XP earned!</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-100 border-4 border-red-300 rounded-3xl p-8">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-3xl font-bold text-red-700 mb-3">Case Still Open!</h3>
                    <p className="text-red-600 text-xl mb-4">
                      The correct answer was {currentMystery.answer}. 
                      The mystery continues with the next case!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Game: Times Table Tower - Multiplication building game
  const TimesTableTowerGame = () => {
    const towerLevels = [
      { level: 1, table: 2, height: 1, problems: 5, color: 'from-red-400 to-pink-500', icon: '🏠', name: 'Foundation' },
      { level: 2, table: 3, height: 2, problems: 6, color: 'from-orange-400 to-red-500', icon: '🏡', name: 'Ground Floor' },
      { level: 3, table: 4, height: 3, problems: 7, color: 'from-yellow-400 to-orange-500', icon: '🏢', name: 'Second Floor' },
      { level: 4, table: 5, height: 4, problems: 8, color: 'from-green-400 to-yellow-500', icon: '🏢', name: 'Third Floor' },
      { level: 5, table: 6, height: 5, problems: 9, color: 'from-blue-400 to-green-500', icon: '🏢', name: 'Fourth Floor' },
      { level: 6, table: 7, height: 6, problems: 10, color: 'from-indigo-400 to-blue-500', icon: '🏢', name: 'Fifth Floor' },
      { level: 7, table: 8, height: 7, problems: 11, color: 'from-purple-400 to-indigo-500', icon: '🏢', name: 'Sixth Floor' },
      { level: 8, table: 9, height: 8, problems: 12, color: 'from-pink-400 to-purple-500', icon: '🏢', name: 'Seventh Floor' },
      { level: 9, table: 10, height: 9, problems: 12, color: 'from-red-400 to-pink-400', icon: '🏢', name: 'Eighth Floor' },
      { level: 10, table: 12, height: 10, problems: 12, color: 'from-yellow-400 to-red-500', icon: '🏰', name: 'Tower Top' }
    ];

    const currentLevel = towerLevels[gameState.level - 1] || towerLevels[0];
    
    useEffect(() => {
      if (currentGame === 'times-table-tower' && !gameState.gameStarted) {
        // Generate initial questions
        const questions = generateTowerQuestions(2, 5); // Start with 2 times table
        setGameState(prev => ({ 
          ...prev, 
          gameStarted: true,
          level: 1,
          towerHeight: 0,
          currentQuestion: 0,
          questions: questions,
          score: 0,
          streak: 0,
          lives: 3
        }));
      }
    }, [currentGame, gameState.gameStarted]);

    const generateTowerQuestions = (table, count) => {
      const questions = [];
      const usedFactors = new Set();
      
      for (let i = 0; i < count; i++) {
        let factor;
        do {
          factor = Math.floor(Math.random() * 12) + 1;
        } while (usedFactors.has(factor) && usedFactors.size < 12);
        
        usedFactors.add(factor);
        questions.push({
          question: `${table} × ${factor}`,
          answer: table * factor,
          table: table,
          factor: factor
        });
      }
      
      return questions;
    };

    const checkTowerAnswer = () => {
      const userNum = parseFloat(gameState.userAnswer);
      const currentQ = gameState.questions[gameState.currentQuestion];
      const correct = Math.abs(userNum - currentQ.answer) < 0.01;
      
      setGameState(prev => ({
        ...prev,
        isCorrect: correct,
        showFeedback: true,
        score: correct ? prev.score + 1 : prev.score,
        streak: correct ? prev.streak + 1 : 0,
        towerHeight: correct ? prev.towerHeight + 1 : prev.towerHeight,
        lives: correct ? prev.lives : Math.max(0, prev.lives - 1)
      }));

      setTimeout(() => {
        if (gameState.currentQuestion < gameState.questions.length - 1) {
          // Next question in current level
          setGameState(prev => ({
            ...prev,
            currentQuestion: prev.currentQuestion + 1,
            userAnswer: '',
            showFeedback: false,
            isCorrect: false
          }));
        } else {
          // Level completed or failed
          if (gameState.lives > 0 && gameState.score >= Math.floor(currentLevel.problems * 0.7)) {
            // Level passed - advance to next level
            if (gameState.level < towerLevels.length) {
              const nextLevel = towerLevels[gameState.level];
              const newQuestions = generateTowerQuestions(nextLevel.table, nextLevel.problems);
              setGameState(prev => ({
                ...prev,
                level: prev.level + 1,
                currentQuestion: 0,
                questions: newQuestions,
                lives: Math.min(3, prev.lives + 1), // Bonus life for completing level
                userAnswer: '',
                showFeedback: false,
                isCorrect: false
              }));
            } else {
              // Tower completed!
              setGameState(prev => ({ ...prev, gameCompleted: true, towercompleted: true }));
            }
          } else {
            // Level failed - game over or retry
            if (gameState.lives <= 0) {
              setGameState(prev => ({ ...prev, gameCompleted: true, towercompleted: false }));
            } else {
              // Retry current level
              const newQuestions = generateTowerQuestions(currentLevel.table, currentLevel.problems);
              setGameState(prev => ({
                ...prev,
                currentQuestion: 0,
                questions: newQuestions,
                score: 0,
                userAnswer: '',
                showFeedback: false,
                isCorrect: false
              }));
            }
          }
        }
      }, 2000);
    };

    const useHint = () => {
      const currentQ = gameState.questions[gameState.currentQuestion];
      const hints = [
        `Try counting by ${currentQ.table}s: ${Array.from({length: currentQ.factor}, (_, i) => currentQ.table * (i + 1)).join(', ')}`,
        `Think of it as ${currentQ.factor} groups of ${currentQ.table}`,
        `You can use repeated addition: ${Array.from({length: currentQ.factor}, () => currentQ.table).join(' + ')}`,
        `Break it down: ${currentQ.table} × ${Math.floor(currentQ.factor/2)} × 2 might be easier!`
      ];
      const hint = hints[Math.floor(Math.random() * hints.length)];
      alert(`🏰 Builder's Tip: ${hint}`);
    };

    const exitGame = () => {
      const earnedXP = gameState.towerHeight * 10 + gameState.score * 5 + (gameState.level - 1) * 25;
      setTotalXP(totalXP + earnedXP);
      setCurrentGame(null);
      setGameState({});
    };

    if (!gameState.gameStarted) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center p-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 max-w-2xl text-center shadow-2xl">
            <div className="text-8xl mb-6 animate-bounce">🏰</div>
            <h1 className="text-5xl font-black mb-6 text-yellow-600">Times Table Tower!</h1>
            <p className="text-xl text-gray-700 mb-8">
              Build the tallest multiplication tower! Master your times tables
              to construct an amazing skyscraper, floor by floor! 🏗️
            </p>
            <div className="bg-orange-100 rounded-2xl p-6 mb-8 border-4 border-orange-300">
              <h3 className="text-lg font-bold text-orange-800 mb-4">🏗️ Building Rules:</h3>
              <div className="text-left space-y-2 text-orange-700">
                <p>• 🏰 Build 10 floors (times tables 2-12)</p>
                <p>• ❤️ Start with 3 lives, earn bonus lives</p>
                <p>• 🎯 Get 70% correct to advance to next floor</p>
                <p>• 🏆 Complete the tower to become Master Builder!</p>
              </div>
            </div>
            <button
              onClick={() => setGameState(prev => ({ ...prev, gameStarted: true }))}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-12 py-4 rounded-full text-2xl font-bold hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg"
            >
              🏰 Start Building!
            </button>
            <br /><br />
            <button
              onClick={exitGame}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-bold transition-all"
            >
              ← Back to Games
            </button>
          </div>
        </div>
      );
    }

    if (gameState.gameCompleted) {
      const earnedXP = gameState.towerHeight * 10 + gameState.score * 5 + (gameState.level - 1) * 25;
      
      return (
        <div className={`min-h-screen bg-gradient-to-br ${gameState.towercompleted ? 'from-yellow-400 to-orange-500' : 'from-red-400 to-gray-500'} flex items-center justify-center p-8`}>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 max-w-4xl text-center shadow-2xl">
            <div className="text-8xl mb-6">{gameState.towercompleted ? '🏆' : '🏗️'}</div>
            <h1 className="text-5xl font-black mb-6">
              {gameState.towercompleted ? 'Tower Completed!' : 'Construction Ended!'}
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              {gameState.towercompleted 
                ? 'Incredible! You\'ve built the ultimate Times Table Tower and mastered multiplication!'
                : `You built ${gameState.level} floors and reached level ${currentLevel.name}. Great effort!`
              }
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-100 rounded-2xl p-6">
                <div className="text-4xl font-black text-blue-600">{gameState.level}</div>
                <div className="text-blue-800 font-bold">Floors Built</div>
              </div>
              <div className="bg-green-100 rounded-2xl p-6">
                <div className="text-4xl font-black text-green-600">{gameState.towerHeight}</div>
                <div className="text-green-800 font-bold">Tower Height</div>
              </div>
              <div className="bg-purple-100 rounded-2xl p-6">
                <div className="text-4xl font-black text-purple-600">{earnedXP}</div>
                <div className="text-purple-800 font-bold">XP Earned</div>
              </div>
              <div className="bg-yellow-100 rounded-2xl p-6">
                <div className="text-4xl font-black text-yellow-600">{gameState.streak}</div>
                <div className="text-yellow-800 font-bold">Best Streak</div>
              </div>
            </div>

            {/* Tower Visualization */}
            <div className="bg-gradient-to-t from-green-200 to-blue-200 rounded-3xl p-8 mb-8 border-4 border-blue-300">
              <h3 className="text-2xl font-bold text-blue-800 mb-6">🏰 Your Tower:</h3>
              <div className="flex flex-col-reverse items-center space-y-reverse space-y-2">
                {Array.from({length: Math.min(gameState.level, 10)}, (_, i) => {
                  const floorLevel = towerLevels[i];
                  return (
                    <div 
                      key={i} 
                      className={`bg-gradient-to-r ${floorLevel.color} text-white rounded-lg p-3 shadow-lg transform transition-all hover:scale-105`}
                      style={{ width: `${80 + i * 20}px` }}
                    >
                      <div className="text-2xl">{floorLevel.icon}</div>
                      <div className="text-xs font-bold">{floorLevel.table}x Table</div>
                    </div>
                  );
                })}
                <div className="text-4xl animate-bounce">🏰</div>
              </div>
              <p className="text-blue-700 font-bold mt-4">
                {gameState.towercompleted ? 'Perfect Tower!' : `${gameState.level}/10 Floors Complete`}
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  const newQuestions = generateTowerQuestions(2, 5);
                  setGameState({
                    ...gameState,
                    gameCompleted: false,
                    level: 1,
                    towerHeight: 0,
                    currentQuestion: 0,
                    questions: newQuestions,
                    score: 0,
                    streak: 0,
                    lives: 3,
                    towercompleted: false,
                    userAnswer: '',
                    showFeedback: false
                  });
                }}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-full text-xl font-bold hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg mr-4"
              >
                🔄 Build New Tower
              </button>
              <button
                onClick={exitGame}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-full font-bold hover:from-gray-600 hover:to-gray-700 transition-all"
              >
                ← Back to Games
              </button>
            </div>
          </div>
        </div>
      );
    }

    const currentQ = gameState.questions[gameState.currentQuestion];
    const progress = ((gameState.currentQuestion + 1) / gameState.questions.length) * 100;

    return (
      <div className={`min-h-screen bg-gradient-to-br ${currentLevel.color} p-8`}>
        <div className="max-w-6xl mx-auto">
          {/* Game Header */}
          <div className="bg-white/90 rounded-2xl p-6 mb-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div className="text-3xl font-black text-yellow-600">🏰 Times Table Tower</div>
              <button
                onClick={exitGame}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-bold"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <div className="text-center">
                <div className="text-2xl font-black text-yellow-600">{gameState.level}/10</div>
                <div className="text-sm text-gray-600">🏢 Floor</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-blue-600">{currentLevel.table}x</div>
                <div className="text-sm text-gray-600">✖️ Table</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-green-600">{gameState.towerHeight}</div>
                <div className="text-sm text-gray-600">🏆 Height</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-purple-600">{gameState.streak}</div>
                <div className="text-sm text-gray-600">🔥 Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-red-600">{gameState.lives}</div>
                <div className="text-sm text-gray-600">❤️ Lives</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-orange-600">{gameState.score}/{gameState.questions.length}</div>
                <div className="text-sm text-gray-600">✅ Score</div>
              </div>
            </div>
            
            {/* Progress */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className={`bg-gradient-to-r ${currentLevel.color} h-4 rounded-full transition-all`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-center mt-2 text-sm text-gray-600">
                {currentLevel.name} - Question {gameState.currentQuestion + 1} of {gameState.questions.length}
              </p>
            </div>
          </div>

          {/* Tower Visualization */}
          <div className="bg-gradient-to-t from-green-200 to-blue-200 rounded-3xl p-6 mb-6 border-4 border-blue-300">
            <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">🏰 Tower Progress:</h3>
            <div className="flex flex-col-reverse items-center space-y-reverse space-y-1">
              {Array.from({length: Math.min(gameState.level + 1, 10)}, (_, i) => {
                const floorLevel = towerLevels[i] || towerLevels[towerLevels.length - 1];
                const isBuilt = i < gameState.level;
                const isCurrent = i === gameState.level - 1;
                return (
                  <div 
                    key={i} 
                    className={`${isBuilt ? `bg-gradient-to-r ${floorLevel.color}` : 'bg-gray-300'} ${isCurrent ? 'ring-4 ring-yellow-400 animate-pulse' : ''} text-white rounded-md p-2 shadow-md transition-all`}
                    style={{ width: `${60 + i * 15}px` }}
                  >
                    <div className="text-lg">{isBuilt || isCurrent ? floorLevel.icon : '⬜'}</div>
                    <div className="text-xs font-bold">
                      {isBuilt || isCurrent ? `${floorLevel.table}x` : '?'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">✖️</div>
              <h2 className="text-5xl font-black mb-6 text-gray-800">{currentQ?.question} = ?</h2>
              <p className="text-xl text-gray-600 mb-4">
                Building Floor {gameState.level}: The {currentLevel.table} Times Table
              </p>
            </div>

            {!gameState.showFeedback ? (
              <div className="text-center space-y-6">
                <input
                  type="text"
                  value={gameState.userAnswer}
                  onChange={(e) => setGameState(prev => ({ ...prev, userAnswer: e.target.value }))}
                  className="text-4xl text-center border-4 border-yellow-400 rounded-2xl p-6 w-64 focus:border-orange-500 focus:outline-none shadow-lg font-bold bg-yellow-50"
                  placeholder="?"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && gameState.userAnswer && checkTowerAnswer()}
                />
                <br />
                <div className="space-x-4">
                  <button
                    onClick={checkTowerAnswer}
                    disabled={!gameState.userAnswer}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🏰 Build Floor!
                  </button>
                  <button
                    onClick={useHint}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-4 rounded-full font-bold hover:from-blue-600 hover:to-purple-600 transition-all"
                  >
                    💡 Builder's Tip
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-center">
                {gameState.isCorrect ? (
                  <div className="bg-green-100 border-4 border-green-300 rounded-3xl p-8">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-3xl font-bold text-green-700 mb-3">Perfect Build!</h3>
                    <p className="text-green-600 text-xl mb-4">
                      Excellent! {currentQ?.question} = {currentQ?.answer} ✅
                    </p>
                    <p className="text-green-600">
                      Your tower grows taller! 🏰 +1 Height, Streak: {gameState.streak}
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-100 border-4 border-red-300 rounded-3xl p-8">
                    <div className="text-6xl mb-4">🔨</div>
                    <h3 className="text-3xl font-bold text-red-700 mb-3">Building Error!</h3>
                    <p className="text-red-600 text-xl mb-4">
                      {currentQ?.question} = {currentQ?.answer} ❌
                    </p>
                    <p className="text-red-600">
                      You lost a life! ❤️ Lives remaining: {gameState.lives}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
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
      {currentStep === 'games' && !currentGame && <FunGamesScreen />}
      {currentStep === 'progress' && <ProgressTrackingScreen />}
      
      {/* Interactive Games */}
      {currentGame === 'number-race' && <NumberRaceGame />}
      {currentGame === 'math-quest' && <MathQuestGame />}
      {currentGame === 'fraction-chef' && <FractionChefGame />}
      {currentGame === 'geometry-builder' && <GeometryCityBuilderGame />}
      {currentGame === 'algebra-detective' && <AlgebraDetectiveGame />}
      {currentGame === 'times-table-tower' && <TimesTableTowerGame />}
      
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