import React, { useState, useEffect } from 'react';

const AdaptiveActivity = ({ skill, level, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const [hints, setHints] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const [difficulty, setDifficulty] = useState(level);
  const [mistakes, setMistakes] = useState(0);

  // Adaptive Question Generation based on performance
  const generateAdaptiveQuestions = (skill, currentDifficulty) => {
    const questionPool = {
      addition: {
        1: [
          { q: "2 + 3 = ?", a: 5, visual: "🍎🍎 + 🍎🍎🍎 = ?", hint: "Count all the apples!" },
          { q: "4 + 1 = ?", a: 5, visual: "🐸🐸🐸🐸 + 🐸 = ?", hint: "Add one more frog!" },
          { q: "3 + 2 = ?", a: 5, visual: "⭐⭐⭐ + ⭐⭐ = ?", hint: "Count all the stars!" }
        ],
        2: [
          { q: "7 + 5 = ?", a: 12, visual: "7️⃣ + 5️⃣ = ?", hint: "Try counting up from 7: 8, 9, 10, 11, 12" },
          { q: "9 + 4 = ?", a: 13, visual: "🎈🎈🎈🎈🎈🎈🎈🎈🎈 + 🎈🎈🎈🎈 = ?", hint: "Use your fingers to help count!" },
          { q: "6 + 8 = ?", a: 14, visual: "6️⃣ + 8️⃣ = ?", hint: "Double 7 is 14, so 6+8 equals the same!" }
        ],
        3: [
          { q: "15 + 27 = ?", a: 42, visual: "15 + 27 = ?", hint: "Break it down: 15 + 20 + 7" },
          { q: "23 + 19 = ?", a: 42, visual: "23 + 19 = ?", hint: "Round 19 to 20, then subtract 1" },
          { q: "38 + 26 = ?", a: 64, visual: "38 + 26 = ?", hint: "Add the tens first: 30 + 20 = 50" }
        ]
      },
      subtraction: {
        1: [
          { q: "5 - 2 = ?", a: 3, visual: "🍪🍪🍪🍪🍪 take away 2 = ?", hint: "Cross out 2 cookies!" },
          { q: "4 - 1 = ?", a: 3, visual: "🦋🦋🦋🦋 - 🦋 = ?", hint: "One butterfly flies away!" },
          { q: "6 - 3 = ?", a: 3, visual: "🌺🌺🌺🌺🌺🌺 - 🌺🌺🌺 = ?", hint: "Pick 3 flowers!" }
        ],
        2: [
          { q: "12 - 5 = ?", a: 7, visual: "12 - 5 = ?", hint: "Count backwards from 12: 11, 10, 9, 8, 7" },
          { q: "15 - 8 = ?", a: 7, visual: "15 - 8 = ?", hint: "What plus 8 equals 15?" },
          { q: "14 - 6 = ?", a: 8, visual: "14 - 6 = ?", hint: "Think: 14 - 4 = 10, then 10 - 2 = 8" }
        ],
        3: [
          { q: "45 - 17 = ?", a: 28, visual: "45 - 17 = ?", hint: "45 - 10 = 35, then 35 - 7 = 28" },
          { q: "52 - 24 = ?", a: 28, visual: "52 - 24 = ?", hint: "52 - 20 = 32, then 32 - 4 = 28" },
          { q: "61 - 29 = ?", a: 32, visual: "61 - 29 = ?", hint: "61 - 30 = 31, then 31 + 1 = 32" }
        ]
      },
      multiplication: {
        1: [
          { q: "2 × 3 = ?", a: 6, visual: "2 groups of 3: 🍓🍓🍓  🍓🍓🍓", hint: "Count all the strawberries!" },
          { q: "4 × 2 = ?", a: 8, visual: "4 pairs: 👫👫👫👫", hint: "2 + 2 + 2 + 2 = ?" },
          { q: "3 × 3 = ?", a: 9, visual: "3 rows of 3: ⚪⚪⚪ ⚪⚪⚪ ⚪⚪⚪", hint: "Make a 3×3 square!" }
        ],
        2: [
          { q: "6 × 4 = ?", a: 24, visual: "6 × 4 = ?", hint: "Think of it as 6 + 6 + 6 + 6" },
          { q: "5 × 7 = ?", a: 35, visual: "5 × 7 = ?", hint: "5 × 5 = 25, plus 5 × 2 = 10" },
          { q: "8 × 3 = ?", a: 24, visual: "8 × 3 = ?", hint: "Double 4 × 3 = 12 to get 24" }
        ],
        3: [
          { q: "12 × 5 = ?", a: 60, visual: "12 × 5 = ?", hint: "12 × 10 = 120, so 12 × 5 = 60" },
          { q: "9 × 8 = ?", a: 72, visual: "9 × 8 = ?", hint: "9 × 9 = 81, minus 9 = 72" },
          { q: "7 × 11 = ?", a: 77, visual: "7 × 11 = ?", hint: "7 × 10 = 70, plus 7 × 1 = 7" }
        ]
      }
    };

    return questionPool[skill]?.[currentDifficulty] || questionPool[skill]?.[1] || [];
  };

  // Initialize questions based on skill and difficulty
  useEffect(() => {
    const newQuestions = generateAdaptiveQuestions(skill, difficulty);
    setQuestions(newQuestions.sort(() => Math.random() - 0.5).slice(0, 5)); // Randomize and take 5
  }, [skill, difficulty]);

  // Adaptive difficulty adjustment
  const adjustDifficulty = (wasCorrect) => {
    if (wasCorrect) {
      setStreak(streak + 1);
      if (streak >= 3 && difficulty < 3) {
        setDifficulty(difficulty + 1);
        setStreak(0);
      }
    } else {
      setStreak(0);
      setMistakes(mistakes + 1);
      if (mistakes >= 2 && difficulty > 1) {
        setDifficulty(difficulty - 1);
        setMistakes(0);
      }
    }
  };

  const checkAnswer = () => {
    const currentQ = questions[currentQuestion];
    const userNum = parseFloat(userAnswer.trim());
    const correct = Math.abs(userNum - currentQ.a) < 0.01;
    
    setIsCorrect(correct);
    setShowFeedback(true);
    adjustDifficulty(correct);
    
    if (correct) {
      const points = difficulty * 10 + (streak * 5);
      setXpGained(xpGained + points);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer('');
        setShowFeedback(false);
        setShowHint(false);
      } else {
        onComplete({
          skill,
          totalXP: xpGained,
          finalDifficulty: difficulty,
          accuracy: questions.filter((_, i) => i <= currentQuestion).length > 0 ? 
            ((currentQuestion + 1 - mistakes) / (currentQuestion + 1)) * 100 : 100
        });
      }
    }, 2500);
  };

  const getHint = () => {
    const currentQ = questions[currentQuestion];
    setShowHint(true);
  };

  const currentQ = questions[currentQuestion];
  if (!currentQ) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-4xl w-full shadow-2xl">
        {/* Header with progress and stats */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full font-bold">
              Level {difficulty}
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold">
              🔥 Streak: {streak}
            </div>
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 py-2 rounded-full font-bold">
              ⭐ XP: {xpGained}
            </div>
          </div>
          <div className="text-sm font-bold text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-6">
            {skill === 'addition' ? '➕' : skill === 'subtraction' ? '➖' : '✖️'}
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">{currentQ.q}</h2>
          
          {/* Visual Aid */}
          <div className="text-2xl mb-6 bg-yellow-100 rounded-2xl p-6 border-2 border-yellow-300">
            {currentQ.visual}
          </div>

          {!showFeedback ? (
            <div className="space-y-6">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="text-3xl text-center border-4 border-blue-300 rounded-2xl p-4 w-48 focus:border-purple-500 focus:outline-none shadow-lg font-bold bg-blue-50"
                placeholder="?"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && userAnswer && checkAnswer()}
              />
              <br />
              <div className="flex justify-center space-x-4">
                <button
                  onClick={checkAnswer}
                  disabled={!userAnswer}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full text-xl font-bold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50"
                >
                  Check Answer! ✨
                </button>
                
                {!showHint && (
                  <button
                    onClick={getHint}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-bold hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg"
                  >
                    💡 Hint
                  </button>
                )}
              </div>
              
              {/* Hint Display */}
              {showHint && (
                <div className="bg-blue-100 border-2 border-blue-300 rounded-2xl p-6 mt-4">
                  <div className="text-4xl mb-2">💡</div>
                  <p className="text-blue-700 font-bold text-lg">{currentQ.hint}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {isCorrect ? (
                <div className="bg-green-100 border-4 border-green-300 rounded-3xl p-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-3xl font-bold text-green-700 mb-2">Amazing!</h3>
                  <p className="text-green-600 text-xl">
                    +{difficulty * 10 + (streak * 5)} XP! 
                    {streak >= 2 && <span className="ml-2">🔥 You're on fire!</span>}
                  </p>
                  {difficulty > level && (
                    <div className="mt-4 bg-yellow-200 rounded-full px-4 py-2 inline-block">
                      <span className="text-yellow-800 font-bold">🚀 Level Up! Now at Level {difficulty}!</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-orange-100 border-4 border-orange-300 rounded-3xl p-8">
                  <div className="text-6xl mb-4">🤗</div>
                  <h3 className="text-3xl font-bold text-orange-700 mb-2">Keep trying!</h3>
                  <p className="text-orange-600 text-xl">
                    The answer is <strong>{currentQ.a}</strong>. You're getting stronger! 💪
                  </p>
                  <div className="mt-4 text-orange-700 font-bold">
                    💡 Remember: {currentQ.hint}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Encouragement */}
        <div className="text-center text-gray-600">
          <div className="text-3xl mb-2">
            {streak >= 3 ? '🔥' : streak >= 2 ? '⭐' : '💪'}
          </div>
          <p className="text-sm font-bold">
            {streak >= 3 ? "You're unstoppable! 🚀" : 
             streak >= 2 ? "Great job! Keep it up! 🌟" :
             "You've got this! 💪"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveActivity;