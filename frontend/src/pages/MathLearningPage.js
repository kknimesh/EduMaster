import React, { useState, useEffect } from 'react';

const MathLearningPage = () => {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questions, setQuestions] = useState([]);

  // Reset to main page when component mounts (when navigating to /math)
  useEffect(() => {
    setSelectedGrade(null);
    setShowQuiz(false);
    setSelectedSkill(null);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswer('');
    setShowFeedback(false);
    setIsCorrect(false);
    setQuestions([]);
  }, []);

  // Math skills organized by grade (IXL-inspired)
  const mathSkills = {
    1: [
      { id: 'g1-counting', name: 'Counting and Number Recognition', icon: '🔢', color: 'bg-pink-100 border-pink-300 hover:bg-pink-200', skills: 45 },
      { id: 'g1-addition', name: 'Addition within 20', icon: '➕', color: 'bg-blue-100 border-blue-300 hover:bg-blue-200', skills: 38 },
      { id: 'g1-subtraction', name: 'Subtraction within 20', icon: '➖', color: 'bg-green-100 border-green-300 hover:bg-green-200', skills: 32 },
      { id: 'g1-shapes', name: 'Shapes and Patterns', icon: '🔷', color: 'bg-purple-100 border-purple-300 hover:bg-purple-200', skills: 28 },
    ],
    2: [
      { id: 'g2-place-value', name: 'Place Value to 100', icon: '💯', color: 'bg-orange-100 border-orange-300 hover:bg-orange-200', skills: 52 },
      { id: 'g2-addition', name: 'Addition with Regrouping', icon: '➕', color: 'bg-blue-100 border-blue-300 hover:bg-blue-200', skills: 48 },
      { id: 'g2-subtraction', name: 'Subtraction with Regrouping', icon: '➖', color: 'bg-green-100 border-green-300 hover:bg-green-200', skills: 44 },
      { id: 'g2-measurement', name: 'Measurement and Time', icon: '📏', color: 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200', skills: 36 },
    ],
    3: [
      { id: 'g3-multiplication', name: 'Multiplication Facts', icon: '✖️', color: 'bg-red-100 border-red-300 hover:bg-red-200', skills: 64 },
      { id: 'g3-division', name: 'Division Facts', icon: '➗', color: 'bg-indigo-100 border-indigo-300 hover:bg-indigo-200', skills: 56 },
      { id: 'g3-fractions', name: 'Introduction to Fractions', icon: '🍕', color: 'bg-pink-100 border-pink-300 hover:bg-pink-200', skills: 42 },
      { id: 'g3-area', name: 'Area and Perimeter', icon: '📐', color: 'bg-teal-100 border-teal-300 hover:bg-teal-200', skills: 38 },
    ],
    4: [
      { id: 'g4-place-value', name: 'Place Value to 10,000', icon: '🔟', color: 'bg-orange-100 border-orange-300 hover:bg-orange-200', skills: 58 },
      { id: 'g4-multiplication', name: 'Multi-digit Multiplication', icon: '✖️', color: 'bg-red-100 border-red-300 hover:bg-red-200', skills: 72 },
      { id: 'g4-division', name: 'Multi-digit Division', icon: '➗', color: 'bg-indigo-100 border-indigo-300 hover:bg-indigo-200', skills: 68 },
      { id: 'g4-fractions', name: 'Equivalent Fractions', icon: '🍰', color: 'bg-pink-100 border-pink-300 hover:bg-pink-200', skills: 54 },
    ],
    5: [
      { id: 'g5-decimals', name: 'Decimal Operations', icon: '🔢', color: 'bg-blue-100 border-blue-300 hover:bg-blue-200', skills: 76 },
      { id: 'g5-fractions', name: 'Adding and Subtracting Fractions', icon: '➕', color: 'bg-green-100 border-green-300 hover:bg-green-200', skills: 82 },
      { id: 'g5-volume', name: 'Volume and 3D Shapes', icon: '📦', color: 'bg-purple-100 border-purple-300 hover:bg-purple-200', skills: 48 },
      { id: 'g5-graphing', name: 'Coordinate Graphing', icon: '📊', color: 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200', skills: 44 },
    ],
    6: [
      { id: 'g6-ratios', name: 'Ratios and Proportions', icon: '⚖️', color: 'bg-teal-100 border-teal-300 hover:bg-teal-200', skills: 86 },
      { id: 'g6-percents', name: 'Percents and Decimals', icon: '💯', color: 'bg-orange-100 border-orange-300 hover:bg-orange-200', skills: 74 },
      { id: 'g6-integers', name: 'Negative Numbers', icon: '➖', color: 'bg-red-100 border-red-300 hover:bg-red-200', skills: 52 },
      { id: 'g6-area', name: 'Area of Complex Shapes', icon: '🔷', color: 'bg-indigo-100 border-indigo-300 hover:bg-indigo-200', skills: 58 },
    ],
    7: [
      { id: 'g7-algebraic', name: 'Algebraic Expressions', icon: '📝', color: 'bg-green-100 border-green-300 hover:bg-green-200', skills: 94 },
      { id: 'g7-equations', name: 'Solving Equations', icon: '🔍', color: 'bg-blue-100 border-blue-300 hover:bg-blue-200', skills: 88 },
      { id: 'g7-geometry', name: 'Angle Relationships', icon: '📐', color: 'bg-purple-100 border-purple-300 hover:bg-purple-200', skills: 66 },
      { id: 'g7-probability', name: 'Probability and Statistics', icon: '🎲', color: 'bg-pink-100 border-pink-300 hover:bg-pink-200', skills: 72 },
    ],
    8: [
      { id: 'g8-linear', name: 'Linear Functions', icon: '📈', color: 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200', skills: 102 },
      { id: 'g8-systems', name: 'Systems of Equations', icon: '⚡', color: 'bg-orange-100 border-orange-300 hover:bg-orange-200', skills: 78 },
      { id: 'g8-pythagorean', name: 'Pythagorean Theorem', icon: '📏', color: 'bg-teal-100 border-teal-300 hover:bg-teal-200', skills: 54 },
      { id: 'g8-transformations', name: 'Transformations', icon: '🔄', color: 'bg-indigo-100 border-indigo-300 hover:bg-indigo-200', skills: 68 },
    ],
    9: [
      { id: 'g9-quadratic', name: 'Quadratic Functions', icon: '📊', color: 'bg-red-100 border-red-300 hover:bg-red-200', skills: 118 },
      { id: 'g9-polynomials', name: 'Polynomial Operations', icon: '🧮', color: 'bg-green-100 border-green-300 hover:bg-green-200', skills: 96 },
      { id: 'g9-radicals', name: 'Square Roots and Radicals', icon: '√', color: 'bg-blue-100 border-blue-300 hover:bg-blue-200', skills: 84 },
      { id: 'g9-similarity', name: 'Similarity and Congruence', icon: '🔺', color: 'bg-purple-100 border-purple-300 hover:bg-purple-200', skills: 72 },
    ],
    10: [
      { id: 'g10-exponential', name: 'Exponential Functions', icon: '📈', color: 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200', skills: 108 },
      { id: 'g10-logarithms', name: 'Logarithmic Functions', icon: '📊', color: 'bg-orange-100 border-orange-300 hover:bg-orange-200', skills: 92 },
      { id: 'g10-trigonometry', name: 'Right Triangle Trigonometry', icon: '📐', color: 'bg-teal-100 border-teal-300 hover:bg-teal-200', skills: 86 },
      { id: 'g10-circles', name: 'Circle Geometry', icon: '⭕', color: 'bg-pink-100 border-pink-300 hover:bg-pink-200', skills: 74 },
    ],
    11: [
      { id: 'g11-polynomials', name: 'Advanced Polynomials', icon: '🧮', color: 'bg-indigo-100 border-indigo-300 hover:bg-indigo-200', skills: 124 },
      { id: 'g11-rational', name: 'Rational Functions', icon: '📊', color: 'bg-green-100 border-green-300 hover:bg-green-200', skills: 98 },
      { id: 'g11-sequences', name: 'Sequences and Series', icon: '🔢', color: 'bg-blue-100 border-blue-300 hover:bg-blue-200', skills: 82 },
      { id: 'g11-trigonometry', name: 'Advanced Trigonometry', icon: '🌊', color: 'bg-purple-100 border-purple-300 hover:bg-purple-200', skills: 106 },
    ],
    12: [
      { id: 'g12-calculus', name: 'Pre-Calculus Functions', icon: '∞', color: 'bg-red-100 border-red-300 hover:bg-red-200', skills: 142 },
      { id: 'g12-limits', name: 'Introduction to Limits', icon: '→', color: 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200', skills: 76 },
      { id: 'g12-statistics', name: 'Advanced Statistics', icon: '📈', color: 'bg-orange-100 border-orange-300 hover:bg-orange-200', skills: 94 },
      { id: 'g12-matrices', name: 'Matrices and Vectors', icon: '📋', color: 'bg-teal-100 border-teal-300 hover:bg-teal-200', skills: 68 },
    ],
  };

  // Generate questions based on skill type
  const generateQuestions = (skill) => {
    const questionCount = 5;
    const newQuestions = [];
    
    for (let i = 0; i < questionCount; i++) {
      let question;
      
      // Basic arithmetic
      if (skill.id.includes('addition')) {
        const a = Math.floor(Math.random() * 20) + 1;
        const b = Math.floor(Math.random() * 20) + 1;
        question = {
          question: `${a} + ${b} = ?`,
          answer: a + b,
          type: 'addition'
        };
      } else if (skill.id.includes('subtraction')) {
        const a = Math.floor(Math.random() * 20) + 10;
        const b = Math.floor(Math.random() * 10) + 1;
        question = {
          question: `${a} - ${b} = ?`,
          answer: a - b,
          type: 'subtraction'
        };
      } else if (skill.id.includes('multiplication')) {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        question = {
          question: `${a} × ${b} = ?`,
          answer: a * b,
          type: 'multiplication'
        };
      } else if (skill.id.includes('division')) {
        const b = Math.floor(Math.random() * 9) + 2;
        const answer = Math.floor(Math.random() * 10) + 1;
        const a = b * answer;
        question = {
          question: `${a} ÷ ${b} = ?`,
          answer: answer,
          type: 'division'
        };
      }
      // Counting and Place Value
      else if (skill.id.includes('counting')) {
        const start = Math.floor(Math.random() * 10) + 1;
        question = {
          question: `Count from ${start}: ${start}, ${start + 1}, ${start + 2}, __, ?`,
          answer: start + 3,
          type: 'counting'
        };
      } else if (skill.id.includes('place-value')) {
        const num = Math.floor(Math.random() * 900) + 100;
        const digit = Math.floor(num / 100);
        question = {
          question: `What is the hundreds digit in ${num}?`,
          answer: digit,
          type: 'place-value'
        };
      }
      // Fractions
      else if (skill.id.includes('fractions')) {
        const numerator = Math.floor(Math.random() * 5) + 1;
        const denominator = Math.floor(Math.random() * 5) + numerator + 1;
        const simplifiedNum = Math.floor(numerator / 2) || 1;
        const simplifiedDen = Math.floor(denominator / 2) || 2;
        question = {
          question: `Simplify: ${numerator * 2}/${denominator * 2} = ?/${simplifiedDen * 2}`,
          answer: simplifiedNum * 2,
          type: 'fractions'
        };
      }
      // Decimals
      else if (skill.id.includes('decimals')) {
        const a = (Math.floor(Math.random() * 50) + 10) / 10;
        const b = (Math.floor(Math.random() * 50) + 10) / 10;
        const result = Math.round((a + b) * 10) / 10;
        question = {
          question: `${a} + ${b} = ?`,
          answer: result,
          type: 'decimals'
        };
      }
      // Algebra
      else if (skill.id.includes('algebraic') || skill.id.includes('equations')) {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 20) + 5;
        const answer = b - a;
        question = {
          question: `Solve for x: x + ${a} = ${b}`,
          answer: answer,
          type: 'algebra'
        };
      } else if (skill.id.includes('quadratic')) {
        const a = Math.floor(Math.random() * 5) + 1;
        const roots = [-2, -1, 1, 2, 3, 4];
        const root = roots[Math.floor(Math.random() * roots.length)];
        const c = -a * root;
        question = {
          question: `If ${a}x + ${c} = 0, what is x?`,
          answer: root,
          type: 'quadratic'
        };
      } else if (skill.id.includes('polynomials')) {
        const coeff = Math.floor(Math.random() * 5) + 2;
        const power = Math.floor(Math.random() * 3) + 2;
        const x = 2;
        const answer = Math.pow(x, power) * coeff;
        question = {
          question: `If x = 2, what is ${coeff}x^${power}?`,
          answer: answer,
          type: 'polynomials'
        };
      }
      // Geometry
      else if (skill.id.includes('shapes')) {
        const sides = [3, 4, 5, 6];
        const shape = sides[Math.floor(Math.random() * sides.length)];
        const names = {3: 'triangle', 4: 'rectangle', 5: 'pentagon', 6: 'hexagon'};
        question = {
          question: `How many sides does a ${names[shape]} have?`,
          answer: shape,
          type: 'shapes'
        };
      } else if (skill.id.includes('area')) {
        const length = Math.floor(Math.random() * 8) + 2;
        const width = Math.floor(Math.random() * 8) + 2;
        question = {
          question: `Area of rectangle: ${length} × ${width} = ?`,
          answer: length * width,
          type: 'area'
        };
      } else if (skill.id.includes('perimeter')) {
        const side = Math.floor(Math.random() * 6) + 2;
        question = {
          question: `Perimeter of square with side ${side} = ?`,
          answer: side * 4,
          type: 'perimeter'
        };
      } else if (skill.id.includes('angle') || skill.id.includes('geometry')) {
        const angle1 = Math.floor(Math.random() * 60) + 30;
        const angle2 = 180 - angle1;
        question = {
          question: `Two angles are supplementary. One is ${angle1}°. What is the other?`,
          answer: angle2,
          type: 'angles'
        };
      } else if (skill.id.includes('pythagorean')) {
        const a = 3, b = 4; // Simple Pythagorean triple
        const c = 5;
        question = {
          question: `In a right triangle, if a = ${a} and b = ${b}, what is c?`,
          answer: c,
          type: 'pythagorean'
        };
      } else if (skill.id.includes('circles')) {
        const radius = Math.floor(Math.random() * 5) + 2;
        const diameter = radius * 2;
        question = {
          question: `If radius = ${radius}, what is the diameter?`,
          answer: diameter,
          type: 'circles'
        };
      } else if (skill.id.includes('volume')) {
        const side = Math.floor(Math.random() * 4) + 2;
        const volume = side * side * side;
        question = {
          question: `Volume of cube with side ${side} = ?`,
          answer: volume,
          type: 'volume'
        };
      }
      // Advanced topics
      else if (skill.id.includes('ratios') || skill.id.includes('proportions')) {
        const a = Math.floor(Math.random() * 5) + 2;
        const b = Math.floor(Math.random() * 5) + 2;
        const c = a * 2;
        const answer = b * 2;
        question = {
          question: `If ${a}:${b} = ${c}:?, what is the missing number?`,
          answer: answer,
          type: 'ratios'
        };
      } else if (skill.id.includes('percents')) {
        const percent = [25, 50, 75][Math.floor(Math.random() * 3)];
        const number = Math.floor(Math.random() * 8 + 2) * 4;
        const answer = (number * percent) / 100;
        question = {
          question: `${percent}% of ${number} = ?`,
          answer: answer,
          type: 'percents'
        };
      } else if (skill.id.includes('integers')) {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 5) + 1;
        const answer = a - b;
        question = {
          question: `${a} + (-${b}) = ?`,
          answer: answer,
          type: 'integers'
        };
      } else if (skill.id.includes('probability')) {
        const favorable = Math.floor(Math.random() * 3) + 1;
        const total = favorable + Math.floor(Math.random() * 4) + 1;
        const probability = Math.round((favorable / total) * 100);
        question = {
          question: `Probability = ${favorable}/${total}. What is this as a percentage?`,
          answer: probability,
          type: 'probability'
        };
      } else if (skill.id.includes('statistics')) {
        const numbers = [10, 15, 20];
        const sum = numbers.reduce((a, b) => a + b, 0);
        const mean = sum / numbers.length;
        question = {
          question: `Mean of ${numbers.join(', ')} = ?`,
          answer: mean,
          type: 'statistics'
        };
      }
      // Functions and advanced algebra
      else if (skill.id.includes('linear') || skill.id.includes('functions')) {
        const slope = Math.floor(Math.random() * 5) + 1;
        const x = Math.floor(Math.random() * 5) + 1;
        const answer = slope * x;
        question = {
          question: `If y = ${slope}x, what is y when x = ${x}?`,
          answer: answer,
          type: 'linear'
        };
      } else if (skill.id.includes('exponential')) {
        const base = Math.floor(Math.random() * 3) + 2;
        const exponent = Math.floor(Math.random() * 3) + 2;
        const answer = Math.pow(base, exponent);
        question = {
          question: `${base}^${exponent} = ?`,
          answer: answer,
          type: 'exponential'
        };
      } else if (skill.id.includes('logarithms')) {
        const answer = Math.floor(Math.random() * 3) + 2;
        const base = 2;
        const number = Math.pow(base, answer);
        question = {
          question: `log₂(${number}) = ?`,
          answer: answer,
          type: 'logarithms'
        };
      } else if (skill.id.includes('trigonometry')) {
        const angles = [30, 45, 60];
        const angle = angles[Math.floor(Math.random() * angles.length)];
        const answers = {30: 0.5, 45: 0.71, 60: 0.87};
        question = {
          question: `sin(${angle}°) ≈ ? (round to 2 decimal places as whole number)`,
          answer: Math.round(answers[angle] * 100),
          type: 'trigonometry'
        };
      }
      // Default fallback for any unmatched skills
      else {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        question = {
          question: `${a} + ${b} = ?`,
          answer: a + b,
          type: 'addition'
        };
      }
      
      newQuestions.push(question);
    }
    
    return newQuestions;
  };

  const startSkillPractice = (skill) => {
    const generatedQuestions = generateQuestions(skill);
    setQuestions(generatedQuestions);
    setSelectedSkill(skill);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswer('');
    setShowFeedback(false);
    setShowQuiz(true);
  };

  const checkAnswer = () => {
    const correct = parseInt(userAnswer) === questions[currentQuestion].answer;
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer('');
      setShowFeedback(false);
    } else {
      // Quiz completed
      setShowQuiz(false);
      setSelectedSkill(null);
    }
  };

  const PlayableQuiz = ({ skill, onClose }) => {
    if (questions.length === 0) return null;
    
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl">
          {/* Header with progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">{skill.icon}</div>
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            {/* Score */}
            <div className="text-center mt-3">
              <span className="text-lg font-bold text-green-600">Score: {score}/{currentQuestion + (showFeedback && isCorrect ? 1 : 0)}</span>
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{currentQ.question}</h2>
            
            {!showFeedback ? (
              <div className="space-y-4">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="text-2xl text-center border-2 border-blue-300 rounded-xl p-4 w-32 focus:border-purple-500 focus:outline-none"
                  placeholder="?"
                  onKeyPress={(e) => e.key === 'Enter' && userAnswer && checkAnswer()}
                />
                <br />
                <button
                  onClick={checkAnswer}
                  disabled={!userAnswer}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Check Answer ✓
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {isCorrect ? (
                  <div className="bg-green-100 border-2 border-green-300 rounded-2xl p-6">
                    <div className="text-4xl mb-2">🎉</div>
                    <h3 className="text-2xl font-bold text-green-700 mb-2">Correct!</h3>
                    <p className="text-green-600 text-lg">Great job! You got it right.</p>
                  </div>
                ) : (
                  <div className="bg-red-100 border-2 border-red-300 rounded-2xl p-6">
                    <div className="text-4xl mb-2">🤔</div>
                    <h3 className="text-2xl font-bold text-red-700 mb-2">Not quite!</h3>
                    <p className="text-red-600 text-lg">The correct answer is <strong>{currentQ.answer}</strong></p>
                  </div>
                )}
                
                <button
                  onClick={nextQuestion}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question →' : 'Finish Quiz! 🏆'}
                </button>
              </div>
            )}
          </div>

          {/* Encouragement */}
          <div className="text-center text-gray-600">
            <div className="text-2xl mb-2">💪</div>
            <p className="text-sm">You're doing great! Keep it up!</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        background: `
          linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 50%, rgba(236, 72, 153, 0.15) 100%),
          url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJtYXRoRnVuIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+CiAgICAgIDxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjQiIGZpbGw9InJnYmEoNTksIDEzMCwgMjQ2LCAwLjIpIi8+CiAgICAgIDx0ZXh0IHg9IjQwIiB5PSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJyZ2JhKDE0NywgNTEsIDIzNCwgMC4xNSkiPis8L3RleHQ+CiAgICAgIDx0ZXh0IHg9IjcwIiB5PSI3MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJyZ2JhKDIzNiwgNzIsIDE1MywgMC4xNSkiPsOXPC90ZXh0PgogICAgICA8Y2lyY2xlIGN4PSI4MCIgY3k9IjMwIiByPSIzIiBmaWxsPSJyZ2JhKDU5LCAxMzAsIDI0NiwgMC4xNSkiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNtYXRoRnVuKSIvPgo8L3N2Zz4=') repeat
        `
      }}
    >
      {/* Floating Math Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">🧮</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-pulse">📏</div>
        <div className="absolute bottom-40 left-20 text-7xl opacity-20 animate-bounce">➕</div>
        <div className="absolute top-60 right-40 text-4xl opacity-20 animate-pulse">🔢</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-20 animate-bounce">📐</div>
        <div className="absolute top-32 left-1/2 text-5xl opacity-20 animate-pulse">✖️</div>
        <div className="absolute bottom-60 left-1/3 text-4xl opacity-20 animate-bounce">📊</div>
      </div>
      {showQuiz && selectedSkill && (
        <PlayableQuiz 
          skill={selectedSkill} 
          onClose={() => {
            setShowQuiz(false);
            setSelectedSkill(null);
            setCurrentQuestion(0);
            setScore(0);
            setUserAnswer('');
            setShowFeedback(false);
          }} 
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Fun Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🌟 Math Adventure Zone! 🌟
          </h1>
          <p className="text-xl text-gray-700 mb-6">Choose your grade and start your math journey!</p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white rounded-full px-6 py-3 shadow-lg border-2 border-yellow-300">
              <span className="text-2xl">🏆</span>
              <span className="ml-2 font-bold text-yellow-600">Level Up!</span>
            </div>
            <div className="bg-white rounded-full px-6 py-3 shadow-lg border-2 border-green-300">
              <span className="text-2xl">⭐</span>
              <span className="ml-2 font-bold text-green-600">Earn Stars!</span>
            </div>
            <div className="bg-white rounded-full px-6 py-3 shadow-lg border-2 border-pink-300">
              <span className="text-2xl">🎮</span>
              <span className="ml-2 font-bold text-pink-600">Have Fun!</span>
            </div>
          </div>
        </div>

        {!selectedGrade ? (
          /* Grade Selection */
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Pick Your Grade Level!</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Object.keys(mathSkills).map((grade) => {
                const skillCount = mathSkills[grade].reduce((sum, skill) => sum + skill.skills, 0);
                return (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-transparent hover:border-blue-300"
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-white text-2xl font-bold">G{grade}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Grade {grade}</h3>
                      <p className="text-blue-600 font-semibold">{skillCount} Skills</p>
                      <div className="mt-3 flex justify-center">
                        {grade <= 3 && <span className="text-2xl">🌱</span>}
                        {grade > 3 && grade <= 6 && <span className="text-2xl">🌳</span>}
                        {grade > 6 && grade <= 9 && <span className="text-2xl">🎯</span>}
                        {grade > 9 && <span className="text-2xl">🚀</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Skills for Selected Grade */
          <div>
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setSelectedGrade(null)}
                className="flex items-center bg-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <span className="text-2xl mr-2">←</span>
                <span className="font-semibold text-gray-700">Back to Grades</span>
              </button>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">Grade {selectedGrade} Math Skills</h2>
                <p className="text-lg text-gray-600">Choose a topic to start practicing!</p>
              </div>
              <div className="w-32"></div> {/* Spacer for centering */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mathSkills[selectedGrade].map((skill) => (
                <div
                  key={skill.id}
                  className={`${skill.color} rounded-2xl p-6 border-2 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}
                  onClick={() => startSkillPractice(skill)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{skill.icon}</div>
                    <div className="bg-white rounded-full px-4 py-2 shadow-md">
                      <span className="text-sm font-bold text-gray-700">{skill.skills} problems</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{skill.name}</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">
                          {i < 3 ? '⭐' : '☆'}
                        </span>
                      ))}
                    </div>
                    <button className="bg-white text-gray-700 px-4 py-2 rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-md">
                      Start Practice →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Encouraging Message */}
            <div className="mt-12 text-center bg-white rounded-2xl p-8 shadow-lg border-4 border-yellow-300">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">You're doing amazing!</h3>
              <p className="text-gray-600 text-lg">Every problem you solve makes you smarter and stronger at math!</p>
              <div className="mt-4 flex justify-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl">🧠</div>
                  <p className="text-sm font-semibold text-gray-700">Build Skills</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl">💪</div>
                  <p className="text-sm font-semibold text-gray-700">Get Stronger</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl">🎯</div>
                  <p className="text-sm font-semibold text-gray-700">Hit Goals</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathLearningPage;