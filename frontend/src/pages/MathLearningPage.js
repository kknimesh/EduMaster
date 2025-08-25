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
  const [streak, setStreak] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [powerUps, setPowerUps] = useState({ hints: 3, timeFreeze: 1, doubleXP: 1 });
  const [showAchievement, setShowAchievement] = useState(null);
  const [currentXP, setCurrentXP] = useState(0);
  const [showSpeedRound, setShowSpeedRound] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [speedRoundScore, setSpeedRoundScore] = useState(0);

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

  // Achievement system
  const checkAchievements = (newStreak, newXP) => {
    const newAchievements = [];
    
    if (newStreak === 5 && !achievements.includes('streak5')) {
      newAchievements.push({ id: 'streak5', name: 'Hot Streak!', desc: '5 correct in a row', icon: '🔥' });
    }
    if (newStreak === 10 && !achievements.includes('streak10')) {
      newAchievements.push({ id: 'streak10', name: 'Unstoppable!', desc: '10 correct in a row', icon: '⚡' });
    }
    if (newXP >= 100 && !achievements.includes('xp100')) {
      newAchievements.push({ id: 'xp100', name: 'XP Master!', desc: 'Earned 100 XP', icon: '🏆' });
    }
    if (score >= 5 && !achievements.includes('perfect')) {
      newAchievements.push({ id: 'perfect', name: 'Perfect Score!', desc: 'All questions correct', icon: '⭐' });
    }
    
    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements.map(a => a.id)]);
      setShowAchievement(newAchievements[0]);
      setTimeout(() => setShowAchievement(null), 3000);
    }
  };

  // XP and level calculation
  const calculateXP = (isCorrect, currentStreak) => {
    if (!isCorrect) return 0;
    let xp = 10; // Base XP
    if (currentStreak >= 5) xp += 5; // Streak bonus
    if (currentStreak >= 10) xp += 10; // Super streak bonus
    return xp;
  };

  const getLevel = (xp) => Math.floor(xp / 50) + 1;

  // Speed Round functions
  const startSpeedRound = () => {
    setShowSpeedRound(true);
    setTimeLeft(60);
    setSpeedRoundScore(0);
    // Generate quick math questions
    const speedQuestions = [];
    for (let i = 0; i < 30; i++) {
      const operators = ['+', '-', '×'];
      const op = operators[Math.floor(Math.random() * operators.length)];
      const a = Math.floor(Math.random() * 12) + 1;
      const b = Math.floor(Math.random() * 12) + 1;
      let answer;
      
      if (op === '+') {
        answer = a + b;
      } else if (op === '-') {
        answer = Math.max(a, b) - Math.min(a, b);
      } else {
        answer = a * b;
      }
      
      speedQuestions.push({
        question: op === '-' ? `${Math.max(a, b)} ${op} ${Math.min(a, b)}` : `${a} ${op} ${b}`,
        answer: answer,
        type: 'speed'
      });
    }
    setQuestions(speedQuestions);
    setCurrentQuestion(0);
    setUserAnswer('');
    
    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

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
        const gradeLevel = parseInt(skill.id.match(/g(\d+)/)[1]);
        const maxNum = gradeLevel <= 2 ? 20 : gradeLevel <= 4 ? 100 : 1000;
        const a = Math.floor(Math.random() * maxNum/2) + 1;
        const b = Math.floor(Math.random() * maxNum/2) + 1;
        question = {
          question: `${a} + ${b} = ?`,
          answer: a + b,
          type: 'addition'
        };
      } else if (skill.id.includes('subtraction')) {
        const gradeLevel = parseInt(skill.id.match(/g(\d+)/)[1]);
        const maxNum = gradeLevel <= 2 ? 20 : gradeLevel <= 4 ? 100 : 1000;
        const a = Math.floor(Math.random() * maxNum) + Math.floor(maxNum/2);
        const b = Math.floor(Math.random() * Math.floor(maxNum/2)) + 1;
        question = {
          question: `${a} - ${b} = ?`,
          answer: a - b,
          type: 'subtraction'
        };
      } else if (skill.id.includes('multiplication')) {
        const gradeLevel = parseInt(skill.id.match(/g(\d+)/)[1]);
        const maxFactor = gradeLevel <= 3 ? 10 : gradeLevel <= 5 ? 12 : 20;
        const a = Math.floor(Math.random() * maxFactor) + 1;
        const b = Math.floor(Math.random() * maxFactor) + 1;
        question = {
          question: `${a} × ${b} = ?`,
          answer: a * b,
          type: 'multiplication'
        };
      } else if (skill.id.includes('division')) {
        const b = Math.floor(Math.random() * 9) + 2;
        const quotient = Math.floor(Math.random() * 10) + 1;
        const a = b * quotient;
        question = {
          question: `${a} ÷ ${b} = ?`,
          answer: quotient,
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
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const numerator = Math.floor(Math.random() * 8) + 2;
        const denominator = Math.floor(Math.random() * 8) + numerator + 1;
        const divisor = gcd(numerator, denominator);
        const simplifiedNum = numerator / divisor;
        const simplifiedDen = denominator / divisor;
        question = {
          question: `Simplify: ${numerator}/${denominator} = ?/${simplifiedDen}`,
          answer: simplifiedNum,
          type: 'fractions'
        };
      }
      // Decimals
      else if (skill.id.includes('decimals')) {
        const a = Math.floor(Math.random() * 50 + 10) / 10;
        const b = Math.floor(Math.random() * 50 + 10) / 10;
        const result = Math.round((a + b) * 10) / 10;
        question = {
          question: `${a.toFixed(1)} + ${b.toFixed(1)} = ?`,
          answer: result.toFixed(1),
          type: 'decimals'
        };
      }
      // Algebra
      else if (skill.id.includes('algebraic') || skill.id.includes('equations')) {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 20) + a + 1;
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
        // Check if it's advanced (Grade 11) polynomials
        if (skill.id.includes('g11')) {
          const polys = [
            { q: 'Factor: x² - 5x + 6, smaller root', a: 2 },
            { q: 'Factor: x² - 9, find one root', a: 3 },
            { q: 'Expand: (x+2)(x+3), coefficient of x', a: 5 },
            { q: 'Degree of: 3x⁴ + 2x² - 1', a: 4 },
            { q: 'Leading coefficient of: 5x³ + 2x - 1', a: 5 },
            { q: 'Zeros of x² - 4, positive root', a: 2 }
          ];
          const poly = polys[Math.floor(Math.random() * polys.length)];
          question = {
            question: poly.q,
            answer: poly.a,
            type: 'polynomials'
          };
        } else {
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
        // Check if it's advanced (Grade 11) trigonometry
        if (skill.id.includes('g11')) {
          const trig = [
            { q: 'sin(π/6)', a: 0.5 },
            { q: 'cos(π/3)', a: 0.5 },
            { q: 'tan(π/4)', a: 1 },
            { q: 'sin(π/2)', a: 1 },
            { q: 'cos(0)', a: 1 },
            { q: 'Period of y = sin(2x) in π units', a: 1 },
            { q: 'Amplitude of y = 3sin(x)', a: 3 },
            { q: 'sin²(45°) + cos²(45°)', a: 1 }
          ];
          const problem = trig[Math.floor(Math.random() * trig.length)];
          question = {
            question: problem.q,
            answer: problem.a,
            type: 'trigonometry'
          };
        } else {
          const angles = [30, 45, 60];
          const angle = angles[Math.floor(Math.random() * angles.length)];
          const answers = {30: 0.5, 45: 0.71, 60: 0.87};
          question = {
            question: `sin(${angle}°) ≈ ? (round to 2 decimal places as whole number)`,
            answer: Math.round(answers[angle] * 100),
            type: 'trigonometry'
          };
        }
      }
      // Grade 11: Sequences and Series
      else if (skill.id.includes('sequences')) {
        const sequences = [
          { q: 'Arithmetic: a₁=2, d=3. Find a₅', a: 14 },
          { q: 'Geometric: a₁=3, r=2. Find a₄', a: 24 },
          { q: 'Sum of first 5 terms: 2,4,6,8,10', a: 30 },
          { q: 'Next term: 1,1,2,3,5,?', a: 8 },
          { q: 'Sum of arithmetic series: 1+3+5+7+9', a: 25 },
          { q: '10th term of: 1,4,7,10,...', a: 28 }
        ];
        const seq = sequences[Math.floor(Math.random() * sequences.length)];
        question = {
          question: seq.q,
          answer: seq.a,
          type: 'sequences'
        };
      }
      // Grade 11: Rational Functions
      else if (skill.id.includes('rational')) {
        const rationals = [
          { q: 'f(x) = 2/(x+1), find f(1)', a: 1 },
          { q: 'Vertical asymptote of y = 1/(x-3)', a: 3 },
          { q: 'Horizontal asymptote of y = (2x+1)/(x+1) as x→∞', a: 2 },
          { q: 'f(x) = x/(x-2), find f(4)', a: 2 },
          { q: 'Zeros of f(x) = (x-3)/(x+1)', a: 3 }
        ];
        const rat = rationals[Math.floor(Math.random() * rationals.length)];
        question = {
          question: rat.q,
          answer: rat.a,
          type: 'rational'
        };
      }
      // Grade 12: Pre-Calculus Functions
      else if (skill.id.includes('calculus') || skill.id.includes('g12-calculus')) {
        const calc = [
          { q: 'f(x) = x³, find f(2)', a: 8 },
          { q: 'f(x) = 2x² + 3x - 1, find f(2)', a: 13 },
          { q: 'Domain of f(x) = √(x-4): x ≥ ?', a: 4 },
          { q: 'If f(x) = x² and g(x) = 2x, find (f∘g)(2)', a: 16 },
          { q: 'Inverse of f(x) = 2x + 3, find f⁻¹(7)', a: 2 },
          { q: 'Rate of change of f(x) = x² from x=1 to x=3', a: 4 }
        ];
        const prob = calc[Math.floor(Math.random() * calc.length)];
        question = {
          question: prob.q,
          answer: prob.a,
          type: 'calculus'
        };
      }
      // Grade 12: Introduction to Limits
      else if (skill.id.includes('limits')) {
        const limits = [
          { q: 'lim(x→2) of (x²-4)/(x-2)', a: 4 },
          { q: 'lim(x→3) of (x²-9)/(x-3)', a: 6 },
          { q: 'lim(x→0) of (sin x)/x', a: 1 },
          { q: 'lim(x→∞) of 1/x', a: 0 },
          { q: 'lim(x→1) of (x³-1)/(x-1)', a: 3 },
          { q: 'lim(x→4) of √x', a: 2 }
        ];
        const lim = limits[Math.floor(Math.random() * limits.length)];
        question = {
          question: lim.q,
          answer: lim.a,
          type: 'limits'
        };
      }
      // Grade 12: Matrices and Vectors
      else if (skill.id.includes('matrices')) {
        const matrices = [
          { q: 'Det([[2,3],[1,4]])', a: 5 },
          { q: 'Det([[3,2],[6,4]])', a: 0 },
          { q: '[[1,2],[3,4]] + [[2,1],[1,2]], find element (1,1)', a: 3 },
          { q: 'Trace of [[5,2],[3,7]]', a: 12 },
          { q: '2×[[1,3],[2,1]], find element (2,1)', a: 4 },
          { q: 'Rank of 2×2 identity matrix', a: 2 }
        ];
        const mat = matrices[Math.floor(Math.random() * matrices.length)];
        question = {
          question: mat.q,
          answer: mat.a,
          type: 'matrices'
        };
      }
      // Grade 12: Vectors
      else if (skill.id.includes('vectors')) {
        const vectors = [
          { q: 'Magnitude of vector (3,4)', a: 5 },
          { q: 'Dot product: (2,3)·(4,1)', a: 11 },
          { q: 'Unit vector of (3,4): denominator', a: 5 },
          { q: '(2,5) + (3,-2), y-component', a: 3 },
          { q: 'Angle between i and j in degrees', a: 90 },
          { q: '||2i + 3j||² (squared magnitude)', a: 13 }
        ];
        const vec = vectors[Math.floor(Math.random() * vectors.length)];
        question = {
          question: vec.q,
          answer: vec.a,
          type: 'vectors'
        };
      }
      // Grade 12: Advanced Statistics
      else if (skill.id.includes('statistics') && skill.id.includes('g12')) {
        const stats = [
          { q: 'Mean of: 10,20,30,40,50', a: 30 },
          { q: 'Median of: 3,7,9,12,15', a: 9 },
          { q: 'Mode of: 2,3,3,4,5,3,6', a: 3 },
          { q: 'Range of: 5,10,15,20,25', a: 20 },
          { q: 'Standard deviation of: 2,2,2,2', a: 0 },
          { q: 'Variance of: 1,3,5 (simplified)', a: 4 }
        ];
        const stat = stats[Math.floor(Math.random() * stats.length)];
        question = {
          question: stat.q,
          answer: stat.a,
          type: 'statistics'
        };
      }
      // Grade 8: Systems of Equations
      else if (skill.id.includes('systems')) {
        const systems = [
          { q: 'x + y = 5, x - y = 1. Find x', a: 3 },
          { q: '2x + y = 7, x + y = 4. Find x', a: 3 },
          { q: 'x + 2y = 8, x - y = 2. Find y', a: 2 },
          { q: '3x + y = 10, x - y = 2. Find x', a: 3 },
          { q: '2x + 3y = 12, x + y = 5. Find y', a: 2 }
        ];
        const sys = systems[Math.floor(Math.random() * systems.length)];
        question = {
          question: sys.q,
          answer: sys.a,
          type: 'systems'
        };
      }
      // Grade 8: Transformations
      else if (skill.id.includes('transformations')) {
        const transforms = [
          { q: 'Reflect (3,4) over y-axis, x-coordinate', a: -3 },
          { q: 'Rotate (1,0) 90° counterclockwise, y-coordinate', a: 1 },
          { q: 'Translate (2,3) by vector (1,-2), y-coordinate', a: 1 },
          { q: 'Scale (2,4) by factor 3, x-coordinate', a: 6 },
          { q: 'Distance from (0,0) to (3,4)', a: 5 }
        ];
        const trans = transforms[Math.floor(Math.random() * transforms.length)];
        question = {
          question: trans.q,
          answer: trans.a,
          type: 'transformations'
        };
      }
      // Grade 9: Radicals and Square Roots
      else if (skill.id.includes('radicals')) {
        const radicals = [
          { q: '√49', a: 7 },
          { q: '√(64)', a: 8 },
          { q: '√(3² + 4²)', a: 5 },
          { q: 'Simplify: √12 (coefficient of √3)', a: 2 },
          { q: '√18 = a√2, find a', a: 3 },
          { q: '√100', a: 10 }
        ];
        const rad = radicals[Math.floor(Math.random() * radicals.length)];
        question = {
          question: rad.q,
          answer: rad.a,
          type: 'radicals'
        };
      }
      // Grade 9: Similarity and Congruence
      else if (skill.id.includes('similarity')) {
        const similar = [
          { q: 'Triangles similar 2:3. Side = 6, corresponding side?', a: 9 },
          { q: 'Similar triangles: sides 4,6,8 and 6,9,?', a: 12 },
          { q: 'Scale factor 1:2, area ratio numerator', a: 1 },
          { q: 'Similar polygons: perimeter ratio 3:4, side 6 maps to?', a: 8 },
          { q: 'Congruent triangles: angle sum', a: 180 }
        ];
        const sim = similar[Math.floor(Math.random() * similar.length)];
        question = {
          question: sim.q,
          answer: sim.a,
          type: 'similarity'
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
    const userAnswerNum = parseFloat(userAnswer.trim());
    const correctAnswer = questions[currentQuestion].answer;
    
    // Handle both numeric and string answers
    const correct = typeof correctAnswer === 'string' 
      ? userAnswer.trim() === correctAnswer 
      : Math.abs(userAnswerNum - correctAnswer) < 0.01;
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      const newScore = score + 1;
      const newStreak = streak + 1;
      const earnedXP = calculateXP(true, newStreak);
      const newTotalXP = totalXP + earnedXP;
      
      setScore(newScore);
      setStreak(newStreak);
      setTotalXP(newTotalXP);
      setCurrentXP(earnedXP);
      
      // Check for achievements
      checkAchievements(newStreak, newTotalXP);
    } else {
      setStreak(0); // Reset streak on wrong answer
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

  // Achievement Modal Component
  const AchievementModal = ({ achievement, onClose }) => {
    if (!achievement) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform animate-bounce">
          <div className="text-center">
            <div className="text-8xl mb-4">{achievement.icon}</div>
            <h2 className="text-3xl font-bold text-yellow-600 mb-2">{achievement.name}</h2>
            <p className="text-lg text-gray-600 mb-6">{achievement.desc}</p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Awesome! 🎉
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Speed Round Component
  const SpeedRoundModal = ({ onClose }) => {
    if (!showSpeedRound) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-yellow-400 to-red-500 rounded-3xl p-8 max-w-2xl w-full shadow-2xl text-white">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">⚡ SPEED ROUND! ⚡</h2>
            <div className="text-6xl font-bold mb-4">{timeLeft}s</div>
            <p className="text-xl mb-6">Answer as many as you can in 60 seconds!</p>
            
            {questions.length > 0 && currentQuestion < questions.length ? (
              <div className="bg-white rounded-2xl p-6 text-gray-800 mb-6">
                <h3 className="text-2xl font-bold mb-4">{questions[currentQuestion].question}</h3>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="text-2xl text-center border-4 border-yellow-400 rounded-xl p-4 w-32 focus:border-red-500 focus:outline-none font-bold"
                  placeholder="?"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && userAnswer) {
                      const correct = parseFloat(userAnswer.trim()) === questions[currentQuestion].answer;
                      if (correct) {
                        setSpeedRoundScore(speedRoundScore + 1);
                        setTotalXP(totalXP + 15); // Bonus XP for speed
                      }
                      setCurrentQuestion(currentQuestion + 1);
                      setUserAnswer('');
                    }
                  }}
                />
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 text-gray-800 mb-6">
                <h3 className="text-3xl font-bold text-green-600 mb-2">Time's Up!</h3>
                <p className="text-xl">You answered <strong>{speedRoundScore}</strong> questions correctly!</p>
                <p className="text-lg text-gray-600">+{speedRoundScore * 15} bonus XP earned!</p>
              </div>
            )}
            
            <div className="flex justify-center space-x-4">
              <div className="bg-white bg-opacity-20 rounded-full px-6 py-3">
                <span className="font-bold">🏆 Score: {speedRoundScore}</span>
              </div>
              <button
                onClick={() => {
                  setShowSpeedRound(false);
                  onClose();
                }}
                className="bg-white text-red-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all"
              >
                Exit Speed Round
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
            
            {/* Gamification Stats */}
            <div className="text-center mt-3 space-y-2">
              <div className="flex justify-center space-x-4">
                <span className="text-lg font-bold text-green-600">Score: {score}/{currentQuestion + (showFeedback && isCorrect ? 1 : 0)}</span>
                <span className="text-lg font-bold text-blue-600">🔥 Streak: {streak}</span>
                <span className="text-lg font-bold text-purple-600">✨ XP: {totalXP}</span>
                <span className="text-lg font-bold text-orange-600">📊 Level: {getLevel(totalXP)}</span>
              </div>
              <div className="flex justify-center space-x-2">
                <div className="bg-yellow-100 px-3 py-1 rounded-full border border-yellow-300">
                  <span className="text-sm text-yellow-700">💡 Hints: {powerUps.hints}</span>
                </div>
                <div className="bg-blue-100 px-3 py-1 rounded-full border border-blue-300">
                  <span className="text-sm text-blue-700">❄️ Time Freeze: {powerUps.timeFreeze}</span>
                </div>
                <div className="bg-green-100 px-3 py-1 rounded-full border border-green-300">
                  <span className="text-sm text-green-700">⚡ Double XP: {powerUps.doubleXP}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{currentQ.question}</h2>
            
            {!showFeedback ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="text-3xl text-center border-4 border-blue-400 rounded-2xl p-5 w-48 focus:border-purple-500 focus:outline-none shadow-lg font-bold bg-yellow-50"
                  placeholder="???"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && userAnswer && checkAnswer()}
                />
                <br />
                <div className="space-y-3">
                  <button
                    onClick={checkAnswer}
                    disabled={!userAnswer}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Check Answer ✓
                  </button>
                  
                  {/* Power-ups */}
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => {
                        if (powerUps.hints > 0) {
                          setPowerUps(prev => ({ ...prev, hints: prev.hints - 1 }));
                          // Show hint logic
                          const hints = {
                            'addition': 'Try breaking the numbers into smaller parts!',
                            'subtraction': 'Count backwards or use addition to check!',
                            'multiplication': 'Think of it as repeated addition!',
                            'division': 'How many times does the smaller number fit?',
                            'default': 'Take your time and think step by step!'
                          };
                          const hint = hints[questions[currentQuestion].type] || hints.default;
                          alert(`💡 Hint: ${hint}`);
                        }
                      }}
                      disabled={powerUps.hints === 0}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      💡 Hint
                    </button>
                    
                    <button
                      onClick={() => {
                        if (powerUps.doubleXP > 0) {
                          setPowerUps(prev => ({ ...prev, doubleXP: prev.doubleXP - 1 }));
                          // Double XP will be applied in checkAnswer
                        }
                      }}
                      disabled={powerUps.doubleXP === 0}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      ⚡ Double XP
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {isCorrect ? (
                  <div className="bg-green-100 border-2 border-green-300 rounded-2xl p-6">
                    <div className="text-4xl mb-2">🎉</div>
                    <h3 className="text-2xl font-bold text-green-700 mb-2">Correct!</h3>
                    <p className="text-green-600 text-lg">Great job! You got it right.</p>
                    {currentXP > 0 && (
                      <div className="mt-3 bg-white rounded-lg p-3 border border-green-300">
                        <p className="text-sm font-semibold text-green-700">+{currentXP} XP earned! 🌟</p>
                        {streak >= 5 && <p className="text-sm text-orange-600">🔥 Hot streak bonus!</p>}
                      </div>
                    )}
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
      
      {showAchievement && (
        <AchievementModal 
          achievement={showAchievement} 
          onClose={() => setShowAchievement(null)} 
        />
      )}
      
      {showSpeedRound && (
        <SpeedRoundModal 
          onClose={() => {
            setShowSpeedRound(false);
            setTimeLeft(60);
            setSpeedRoundScore(0);
            setCurrentQuestion(0);
            setUserAnswer('');
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
          <div className="flex justify-center space-x-4 mb-6">
            <div className="bg-white rounded-full px-6 py-3 shadow-lg border-2 border-yellow-300">
              <span className="text-2xl">🏆</span>
              <span className="ml-2 font-bold text-yellow-600">Level {getLevel(totalXP)}</span>
            </div>
            <div className="bg-white rounded-full px-6 py-3 shadow-lg border-2 border-green-300">
              <span className="text-2xl">⭐</span>
              <span className="ml-2 font-bold text-green-600">{totalXP} XP</span>
            </div>
            <div className="bg-white rounded-full px-6 py-3 shadow-lg border-2 border-pink-300">
              <span className="text-2xl">🔥</span>
              <span className="ml-2 font-bold text-pink-600">Streak: {streak}</span>
            </div>
          </div>
          
          {/* Game Modes */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={startSpeedRound}
              className="bg-gradient-to-r from-red-500 to-yellow-500 text-white px-6 py-3 rounded-full font-bold text-lg hover:from-red-600 hover:to-yellow-600 transition-all transform hover:scale-105 shadow-lg"
            >
              ⚡ Speed Round Challenge!
            </button>
            <button
              onClick={() => {
                // Reset power-ups as a daily bonus
                setPowerUps({ hints: 3, timeFreeze: 1, doubleXP: 1 });
                alert('🎁 Daily power-ups refreshed! Hints: 3, Time Freeze: 1, Double XP: 1');
              }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold text-lg hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
            >
              🎁 Daily Power-ups
            </button>
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
                  className={`${skill.color} rounded-2xl p-6 border-2 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl relative overflow-hidden`}
                  onClick={() => startSkillPractice(skill)}
                >
                  {/* Animated background elements */}
                  <div className="absolute top-2 right-2 text-2xl opacity-30 animate-pulse">🌟</div>
                  <div className="absolute bottom-2 left-2 text-xl opacity-20 animate-bounce">✨</div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl animate-bounce">{skill.icon}</div>
                    <div className="bg-white rounded-full px-4 py-2 shadow-md">
                      <span className="text-sm font-bold text-gray-700">{skill.skills} problems</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{skill.name}</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => {
                        const progress = Math.min(achievements.length + Math.floor(totalXP / 50), 5);
                        return (
                          <span key={i} className="text-yellow-400 text-lg">
                            {i < progress ? '⭐' : '☆'}
                          </span>
                        );
                      })}
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <button className="bg-white text-gray-700 px-4 py-2 rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-md text-sm">
                        Start Practice →
                      </button>
                      <div className="text-xs text-gray-600 bg-white bg-opacity-70 px-2 py-1 rounded-full">
                        +{Math.floor(Math.random() * 20 + 10)} XP
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress bar for this skill */}
                  <div className="mt-4 w-full bg-white bg-opacity-50 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((achievements.length + Math.floor(totalXP / 100)) * 20, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Fun Math Games Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Math Race Game */}
              <div className="bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all cursor-pointer"
                   onClick={() => {
                     alert('🏁 Math Race coming soon! Race against time to solve problems!');
                   }}>
                <div className="text-center">
                  <div className="text-4xl mb-3">🏁</div>
                  <h3 className="text-xl font-bold mb-2">Math Race</h3>
                  <p className="text-sm opacity-90">Race against the clock!</p>
                </div>
              </div>
              
              {/* Math Puzzle Game */}
              <div className="bg-gradient-to-br from-purple-400 to-blue-500 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all cursor-pointer"
                   onClick={() => {
                     alert('🧩 Math Puzzles coming soon! Solve number mysteries and brain teasers!');
                   }}>
                <div className="text-center">
                  <div className="text-4xl mb-3">🧩</div>
                  <h3 className="text-xl font-bold mb-2">Math Puzzles</h3>
                  <p className="text-sm opacity-90">Solve number mysteries!</p>
                </div>
              </div>
              
              {/* Math Builder Game */}
              <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all cursor-pointer"
                   onClick={() => {
                     alert('🏭 Math Builder coming soon! Build your math city by solving problems!');
                   }}>
                <div className="text-center">
                  <div className="text-4xl mb-3">🏭</div>
                  <h3 className="text-xl font-bold mb-2">Math Builder</h3>
                  <p className="text-sm opacity-90">Build your math city!</p>
                </div>
              </div>
            </div>
            
            {/* Achievements Showcase */}
            <div className="mt-8 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 border-4 border-yellow-300">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">🏆 Your Achievements</h3>
                <p className="text-gray-600">Unlock more by solving problems!</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Achievement badges */}
                <div className={`text-center p-4 rounded-xl ${achievements.includes('streak5') ? 'bg-orange-200 border-2 border-orange-400' : 'bg-gray-100 border-2 border-gray-300 opacity-50'}`}>
                  <div className="text-3xl mb-2">🔥</div>
                  <p className="text-sm font-bold">Hot Streak</p>
                  <p className="text-xs text-gray-600">5 in a row</p>
                </div>
                
                <div className={`text-center p-4 rounded-xl ${achievements.includes('xp100') ? 'bg-purple-200 border-2 border-purple-400' : 'bg-gray-100 border-2 border-gray-300 opacity-50'}`}>
                  <div className="text-3xl mb-2">🏆</div>
                  <p className="text-sm font-bold">XP Master</p>
                  <p className="text-xs text-gray-600">100+ XP</p>
                </div>
                
                <div className={`text-center p-4 rounded-xl ${achievements.includes('perfect') ? 'bg-green-200 border-2 border-green-400' : 'bg-gray-100 border-2 border-gray-300 opacity-50'}`}>
                  <div className="text-3xl mb-2">⭐</div>
                  <p className="text-sm font-bold">Perfect Score</p>
                  <p className="text-xs text-gray-600">All correct</p>
                </div>
                
                <div className={`text-center p-4 rounded-xl ${achievements.includes('streak10') ? 'bg-yellow-200 border-2 border-yellow-400' : 'bg-gray-100 border-2 border-gray-300 opacity-50'}`}>
                  <div className="text-3xl mb-2">⚡</div>
                  <p className="text-sm font-bold">Unstoppable</p>
                  <p className="text-xs text-gray-600">10 in a row</p>
                </div>
              </div>
            </div>
            
            {/* Encouraging Message */}
            <div className="mt-8 text-center bg-white rounded-2xl p-8 shadow-lg border-4 border-blue-300">
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