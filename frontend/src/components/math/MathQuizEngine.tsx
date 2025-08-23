import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Icons } from '../../assets/icons';

interface MathProblem {
  id: string;
  type: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'fractions' | 'decimals' | 'word-problem';
  difficulty: 1 | 2 | 3 | 4 | 5;
  question: string;
  visualAid?: {
    type: 'number-line' | 'fraction-circles' | 'grid' | 'shapes';
    data: any;
  };
  correctAnswer: number | string;
  possibleAnswers?: (number | string)[];
  explanation: string;
  hints: string[];
  workingSteps?: string[];
}

interface QuizState {
  currentProblem: number;
  score: number;
  timeSpent: number;
  streak: number;
  problems: MathProblem[];
  userAnswers: (number | string)[];
  startTime: Date;
  isComplete: boolean;
}

// Math problem generator inspired by IXL's adaptive approach
class MathProblemGenerator {
  static generateAdditionProblems(difficulty: number, count: number): MathProblem[] {
    const problems: MathProblem[] = [];
    
    for (let i = 0; i < count; i++) {
      let num1: number, num2: number, answer: number;
      
      switch (difficulty) {
        case 1: // Single digit addition
          num1 = Math.floor(Math.random() * 9) + 1;
          num2 = Math.floor(Math.random() * 9) + 1;
          break;
        case 2: // Two digit addition without carrying
          num1 = Math.floor(Math.random() * 90) + 10;
          num2 = Math.floor(Math.random() * (90 - (num1 % 10))) + 10;
          num2 = Math.floor(num2 / 10) * 10 + Math.floor(Math.random() * (10 - (num1 % 10)));
          break;
        case 3: // Two digit addition with carrying
          num1 = Math.floor(Math.random() * 90) + 10;
          num2 = Math.floor(Math.random() * 90) + 10;
          break;
        case 4: // Three digit addition
          num1 = Math.floor(Math.random() * 900) + 100;
          num2 = Math.floor(Math.random() * 900) + 100;
          break;
        case 5: // Large numbers with decimals
          num1 = Math.round((Math.random() * 999 + 1) * 100) / 100;
          num2 = Math.round((Math.random() * 999 + 1) * 100) / 100;
          break;
        default:
          num1 = Math.floor(Math.random() * 9) + 1;
          num2 = Math.floor(Math.random() * 9) + 1;
      }
      
      answer = Math.round((num1 + num2) * 100) / 100;
      
      problems.push({
        id: `add-${i}`,
        type: 'addition',
        difficulty: difficulty as any,
        question: `${num1} + ${num2} = ?`,
        correctAnswer: answer,
        explanation: `${num1} + ${num2} = ${answer}`,
        hints: [
          'Line up the numbers by place value',
          'Add from right to left',
          difficulty >= 3 ? 'Remember to carry over when needed' : 'Add each column carefully'
        ],
        workingSteps: [
          `Write ${num1} + ${num2}`,
          'Add the numbers column by column',
          `The answer is ${answer}`
        ]
      });
    }
    
    return problems;
  }

  static generateSubtractionProblems(difficulty: number, count: number): MathProblem[] {
    const problems: MathProblem[] = [];
    
    for (let i = 0; i < count; i++) {
      let num1: number, num2: number, answer: number;
      
      switch (difficulty) {
        case 1: // Single digit subtraction
          num1 = Math.floor(Math.random() * 9) + 1;
          num2 = Math.floor(Math.random() * num1) + 1;
          break;
        case 2: // Two digit subtraction without borrowing
          num1 = Math.floor(Math.random() * 90) + 10;
          num2 = Math.floor(Math.random() * (num1 % 10 + 1)) + Math.floor(Math.random() * Math.floor(num1 / 10)) * 10;
          break;
        case 3: // Two digit subtraction with borrowing
          num1 = Math.floor(Math.random() * 90) + 10;
          num2 = Math.floor(Math.random() * num1) + 1;
          break;
        case 4: // Three digit subtraction
          num1 = Math.floor(Math.random() * 900) + 100;
          num2 = Math.floor(Math.random() * num1) + 1;
          break;
        case 5: // Decimals
          num1 = Math.round((Math.random() * 999 + 1) * 100) / 100;
          num2 = Math.round((Math.random() * num1) * 100) / 100;
          break;
        default:
          num1 = Math.floor(Math.random() * 9) + 1;
          num2 = Math.floor(Math.random() * num1) + 1;
      }
      
      answer = Math.round((num1 - num2) * 100) / 100;
      
      problems.push({
        id: `sub-${i}`,
        type: 'subtraction',
        difficulty: difficulty as any,
        question: `${num1} - ${num2} = ?`,
        correctAnswer: answer,
        explanation: `${num1} - ${num2} = ${answer}`,
        hints: [
          'Line up the numbers by place value',
          'Subtract from right to left',
          difficulty >= 3 ? 'You may need to borrow from the next column' : 'Subtract each column carefully'
        ]
      });
    }
    
    return problems;
  }

  static generateMultiplicationProblems(difficulty: number, count: number): MathProblem[] {
    const problems: MathProblem[] = [];
    
    for (let i = 0; i < count; i++) {
      let num1: number, num2: number, answer: number;
      
      switch (difficulty) {
        case 1: // Single digit × single digit
          num1 = Math.floor(Math.random() * 9) + 1;
          num2 = Math.floor(Math.random() * 9) + 1;
          break;
        case 2: // Single digit × two digit
          num1 = Math.floor(Math.random() * 9) + 1;
          num2 = Math.floor(Math.random() * 90) + 10;
          break;
        case 3: // Two digit × single digit
          num1 = Math.floor(Math.random() * 90) + 10;
          num2 = Math.floor(Math.random() * 9) + 1;
          break;
        case 4: // Two digit × two digit
          num1 = Math.floor(Math.random() * 90) + 10;
          num2 = Math.floor(Math.random() * 90) + 10;
          break;
        case 5: // Decimals
          num1 = Math.round((Math.random() * 99 + 1) * 10) / 10;
          num2 = Math.floor(Math.random() * 9) + 1;
          break;
        default:
          num1 = Math.floor(Math.random() * 9) + 1;
          num2 = Math.floor(Math.random() * 9) + 1;
      }
      
      answer = Math.round((num1 * num2) * 100) / 100;
      
      problems.push({
        id: `mult-${i}`,
        type: 'multiplication',
        difficulty: difficulty as any,
        question: `${num1} × ${num2} = ?`,
        correctAnswer: answer,
        explanation: `${num1} × ${num2} = ${answer}`,
        hints: [
          'Think of multiplication as repeated addition',
          `${num1} × ${num2} means adding ${num1} to itself ${num2} times`,
          'Use the multiplication table if needed'
        ]
      });
    }
    
    return problems;
  }

  static generateWordProblems(difficulty: number, count: number): MathProblem[] {
    const problems: MathProblem[] = [];
    const scenarios = [
      { context: 'apples', action: 'bought', unit: 'apples' },
      { context: 'books', action: 'read', unit: 'books' },
      { context: 'stickers', action: 'collected', unit: 'stickers' },
      { context: 'marbles', action: 'found', unit: 'marbles' },
      { context: 'cookies', action: 'baked', unit: 'cookies' }
    ];
    
    for (let i = 0; i < count; i++) {
      const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
      let num1: number, num2: number, answer: number;
      let operation: string;
      
      // Generate numbers based on difficulty
      switch (difficulty) {
        case 1:
          num1 = Math.floor(Math.random() * 9) + 1;
          num2 = Math.floor(Math.random() * 9) + 1;
          break;
        case 2:
          num1 = Math.floor(Math.random() * 50) + 10;
          num2 = Math.floor(Math.random() * 20) + 5;
          break;
        case 3:
          num1 = Math.floor(Math.random() * 100) + 20;
          num2 = Math.floor(Math.random() * 50) + 10;
          break;
        default:
          num1 = Math.floor(Math.random() * 20) + 5;
          num2 = Math.floor(Math.random() * 15) + 3;
      }
      
      // Randomly choose operation
      const operations = ['addition', 'subtraction'];
      operation = operations[Math.floor(Math.random() * operations.length)];
      
      let question: string;
      if (operation === 'addition') {
        answer = num1 + num2;
        question = `Sarah had ${num1} ${scenario.context}. She ${scenario.action} ${num2} more ${scenario.context}. How many ${scenario.unit} does she have now?`;
      } else {
        // Ensure subtraction doesn't result in negative
        if (num2 > num1) [num1, num2] = [num2, num1];
        answer = num1 - num2;
        question = `Tom had ${num1} ${scenario.context}. He gave away ${num2} ${scenario.context}. How many ${scenario.unit} does he have left?`;
      }
      
      problems.push({
        id: `word-${i}`,
        type: 'word-problem',
        difficulty: difficulty as any,
        question: question,
        correctAnswer: answer,
        explanation: `${operation === 'addition' ? num1 + ' + ' + num2 : num1 + ' - ' + num2} = ${answer}`,
        hints: [
          'Read the problem carefully',
          'Identify the numbers and the operation needed',
          `This is a ${operation} problem`,
          `${operation === 'addition' ? 'Add' : 'Subtract'} the numbers to find the answer`
        ]
      });
    }
    
    return problems;
  }

  static generateFractionProblems(difficulty: number, count: number): MathProblem[] {
    const problems: MathProblem[] = [];
    
    for (let i = 0; i < count; i++) {
      let num1: number, denom1: number, num2: number, denom2: number;
      let operation: 'add' | 'subtract' | 'multiply' | 'equivalent' = 'equivalent';
      
      switch (difficulty) {
        case 1: // Equivalent fractions
          denom1 = Math.floor(Math.random() * 8) + 2; // 2-9
          num1 = Math.floor(Math.random() * denom1) + 1;
          const multiplier = Math.floor(Math.random() * 4) + 2; // 2-5
          num2 = num1 * multiplier;
          denom2 = denom1 * multiplier;
          
          problems.push({
            id: `frac-${i}`,
            type: 'fractions',
            difficulty: difficulty as any,
            question: `Which fraction is equivalent to ${num1}/${denom1}?`,
            correctAnswer: `${num2}/${denom2}`,
            possibleAnswers: [
              `${num2}/${denom2}`,
              `${num2 + 1}/${denom2}`,
              `${num2}/${denom2 + 1}`,
              `${num1 + 1}/${denom1 + 1}`
            ],
            explanation: `${num1}/${denom1} = ${num2}/${denom2} because both numerator and denominator are multiplied by ${multiplier}`,
            hints: [
              'Equivalent fractions represent the same value',
              `Multiply both top and bottom by ${multiplier}`,
              'Check: do both fractions simplify to the same value?'
            ]
          });
          break;
          
        case 2: // Adding fractions with same denominator
          denom1 = Math.floor(Math.random() * 8) + 3; // 3-10
          num1 = Math.floor(Math.random() * (denom1 - 2)) + 1;
          num2 = Math.floor(Math.random() * (denom1 - num1 - 1)) + 1;
          
          problems.push({
            id: `frac-${i}`,
            type: 'fractions',
            difficulty: difficulty as any,
            question: `${num1}/${denom1} + ${num2}/${denom1} = ?`,
            correctAnswer: `${num1 + num2}/${denom1}`,
            explanation: `When denominators are the same, add the numerators: ${num1} + ${num2} = ${num1 + num2}, so the answer is ${num1 + num2}/${denom1}`,
            hints: [
              'The denominators are the same',
              'Add the numerators: ' + num1 + ' + ' + num2,
              'Keep the same denominator'
            ]
          });
          break;
          
        default:
          // Simple equivalent for now
          denom1 = 4;
          num1 = 1;
          problems.push({
            id: `frac-${i}`,
            type: 'fractions',
            difficulty: 1,
            question: `Which fraction is equivalent to 1/4?`,
            correctAnswer: '2/8',
            possibleAnswers: ['2/8', '1/8', '3/8', '1/2'],
            explanation: '1/4 = 2/8 because 1×2 = 2 and 4×2 = 8',
            hints: ['Multiply top and bottom by 2', 'Check: 2÷8 = 0.25 and 1÷4 = 0.25']
          });
      }
    }
    
    return problems;
  }

  static generateMixedProblems(grade: number, count: number): MathProblem[] {
    const problems: MathProblem[] = [];
    const problemTypes = ['addition', 'subtraction', 'multiplication', 'word-problem'];
    
    // Adjust difficulty based on grade
    const baseDifficulty = Math.min(Math.max(grade - 2, 1), 5);
    
    problemTypes.forEach(type => {
      const typeCount = Math.ceil(count / problemTypes.length);
      let typeProblems: MathProblem[] = [];
      
      switch (type) {
        case 'addition':
          typeProblems = this.generateAdditionProblems(baseDifficulty, typeCount);
          break;
        case 'subtraction':
          typeProblems = this.generateSubtractionProblems(baseDifficulty, typeCount);
          break;
        case 'multiplication':
          typeProblems = this.generateMultiplicationProblems(baseDifficulty, typeCount);
          break;
        case 'word-problem':
          typeProblems = this.generateWordProblems(baseDifficulty, typeCount);
          break;
      }
      
      problems.push(...typeProblems);
    });
    
    // Shuffle problems
    return problems.sort(() => Math.random() - 0.5).slice(0, count);
  }
}

interface MathQuizEngineProps {
  problemType: 'mixed' | 'addition' | 'subtraction' | 'multiplication' | 'fractions' | 'word-problems';
  difficulty: number;
  problemCount: number;
  grade: number;
  onComplete: (results: {
    score: number;
    totalQuestions: number;
    timeSpent: number;
    accuracy: number;
    problemsData: any[];
  }) => void;
  onExit: () => void;
}

const MathQuizEngine: React.FC<MathQuizEngineProps> = ({
  problemType,
  difficulty,
  problemCount,
  grade,
  onComplete,
  onExit
}) => {
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [currentResult, setCurrentResult] = useState<{ isCorrect: boolean; explanation: string } | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // Optional timer

  useEffect(() => {
    initializeQuiz();
  }, [problemType, difficulty, problemCount, grade]);

  useEffect(() => {
    if (quizState && !quizState.isComplete) {
      const timer = setInterval(() => {
        setQuizState(prev => prev ? {
          ...prev,
          timeSpent: Math.floor((new Date().getTime() - prev.startTime.getTime()) / 1000)
        } : null);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizState?.isComplete]);

  const initializeQuiz = () => {
    let problems: MathProblem[] = [];

    switch (problemType) {
      case 'addition':
        problems = MathProblemGenerator.generateAdditionProblems(difficulty, problemCount);
        break;
      case 'subtraction':
        problems = MathProblemGenerator.generateSubtractionProblems(difficulty, problemCount);
        break;
      case 'multiplication':
        problems = MathProblemGenerator.generateMultiplicationProblems(difficulty, problemCount);
        break;
      case 'fractions':
        problems = MathProblemGenerator.generateFractionProblems(difficulty, problemCount);
        break;
      case 'word-problems':
        problems = MathProblemGenerator.generateWordProblems(difficulty, problemCount);
        break;
      case 'mixed':
      default:
        problems = MathProblemGenerator.generateMixedProblems(grade, problemCount);
        break;
    }

    setQuizState({
      currentProblem: 0,
      score: 0,
      timeSpent: 0,
      streak: 0,
      problems: problems,
      userAnswers: [],
      startTime: new Date(),
      isComplete: false
    });

    setUserAnswer('');
    setShowResult(false);
    setCurrentResult(null);
    setHintsUsed(0);
    setShowHint(false);
  };

  const submitAnswer = () => {
    if (!quizState) return;

    const currentProblem = quizState.problems[quizState.currentProblem];
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = currentProblem.correctAnswer.toString().toLowerCase();
    
    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
    
    const newUserAnswers = [...quizState.userAnswers];
    newUserAnswers[quizState.currentProblem] = userAnswer;
    
    setCurrentResult({
      isCorrect,
      explanation: currentProblem.explanation
    });

    setQuizState({
      ...quizState,
      score: isCorrect ? quizState.score + 1 : quizState.score,
      streak: isCorrect ? quizState.streak + 1 : 0,
      userAnswers: newUserAnswers
    });

    setShowResult(true);
  };

  const nextProblem = () => {
    if (!quizState) return;

    const nextIndex = quizState.currentProblem + 1;
    
    if (nextIndex < quizState.problems.length) {
      setQuizState({
        ...quizState,
        currentProblem: nextIndex
      });
      setUserAnswer('');
      setShowResult(false);
      setCurrentResult(null);
      setHintsUsed(0);
      setShowHint(false);
    } else {
      // Quiz complete
      const finalQuizState = {
        ...quizState,
        isComplete: true
      };
      setQuizState(finalQuizState);
      
      const accuracy = (finalQuizState.score / finalQuizState.problems.length) * 100;
      
      onComplete({
        score: finalQuizState.score,
        totalQuestions: finalQuizState.problems.length,
        timeSpent: finalQuizState.timeSpent,
        accuracy: accuracy,
        problemsData: finalQuizState.problems.map((problem, index) => ({
          problem,
          userAnswer: finalQuizState.userAnswers[index],
          isCorrect: finalQuizState.userAnswers[index]?.toString().toLowerCase().trim() === 
                     problem.correctAnswer.toString().toLowerCase()
        }))
      });
    }
  };

  const useHint = () => {
    if (!quizState || hintsUsed >= getCurrentProblem()?.hints.length!) return;
    setHintsUsed(prev => prev + 1);
    setShowHint(true);
  };

  const getCurrentProblem = () => {
    return quizState?.problems[quizState.currentProblem];
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (!quizState) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (quizState.isComplete) {
    return (
      <Card className="p-8 text-center">
        <div className="mb-6">
          <Icons.Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Quiz Complete! 🎉
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Great job working through these math problems!
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{quizState.score}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Correct</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {Math.round((quizState.score / quizState.problems.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{quizState.streak}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Best Streak</div>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{formatTime(quizState.timeSpent)}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Time</div>
          </div>
        </div>
        
        <div className="flex space-x-4 justify-center">
          <Button variant="primary" onClick={initializeQuiz}>
            <Icons.RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button variant="outline" onClick={onExit}>
            <Icons.ArrowLeft className="w-4 h-4 mr-2" />
            Back to Skills
          </Button>
        </div>
      </Card>
    );
  }

  const currentProblem = getCurrentProblem();
  const progress = ((quizState.currentProblem + 1) / quizState.problems.length) * 100;

  if (!currentProblem) return null;

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Problem {quizState.currentProblem + 1} of {quizState.problems.length}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Score: {quizState.score} • Time: {formatTime(quizState.timeSpent)}
              {quizState.streak > 0 && (
                <span className="ml-2 text-orange-600">
                  🔥 {quizState.streak} streak
                </span>
              )}
            </p>
          </div>
          <Button variant="outline" onClick={onExit}>
            <Icons.X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </Card>

      {/* Problem Card */}
      <Card className="p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
            {currentProblem.type.charAt(0).toUpperCase() + currentProblem.type.slice(1).replace('-', ' ')} • 
            Difficulty {currentProblem.difficulty}/5
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {currentProblem.question}
          </h3>
          
          {/* Answer Input */}
          {currentProblem.possibleAnswers ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
              {currentProblem.possibleAnswers.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setUserAnswer(option.toString())}
                  className={`p-4 text-left rounded-lg border-2 transition-all ${
                    userAnswer === option.toString()
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium text-gray-900 dark:text-white">
                    {String.fromCharCode(65 + index)}. {option}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="max-w-md mx-auto mb-6">
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="text-center text-xl py-3"
                onKeyPress={(e) => e.key === 'Enter' && !showResult && userAnswer && submitAnswer()}
                type={currentProblem.type === 'fractions' ? 'text' : 'number'}
              />
              {currentProblem.type === 'fractions' && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  For fractions, use format: 1/2 or 3/4
                </p>
              )}
            </div>
          )}
        </div>

        {/* Hints */}
        {!showResult && currentProblem.hints.length > 0 && (
          <div className="text-center mb-6">
            {!showHint && hintsUsed < currentProblem.hints.length && (
              <Button variant="outline" onClick={useHint}>
                <Icons.Lightbulb className="w-4 h-4 mr-2" />
                Get Hint ({hintsUsed}/{currentProblem.hints.length} used)
              </Button>
            )}
            
            {showHint && hintsUsed > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 max-w-2xl mx-auto">
                <div className="flex items-center mb-2">
                  <Icons.Lightbulb className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="font-medium text-yellow-800 dark:text-yellow-200">
                    Hint {hintsUsed}
                  </span>
                </div>
                <p className="text-yellow-700 dark:text-yellow-300">
                  {currentProblem.hints[hintsUsed - 1]}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Result */}
        {showResult && currentResult && (
          <div className={`text-center p-6 rounded-lg mb-6 ${
            currentResult.isCorrect 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' 
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
          }`}>
            <div className="flex items-center justify-center mb-3">
              {currentResult.isCorrect ? (
                <Icons.CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              ) : (
                <Icons.XCircle className="w-8 h-8 text-red-600 mr-3" />
              )}
              <h4 className={`text-xl font-bold ${
                currentResult.isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
              }`}>
                {currentResult.isCorrect ? 'Correct! 🎉' : 'Not quite right'}
              </h4>
            </div>
            <p className={`text-lg ${
              currentResult.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
            }`}>
              {currentResult.explanation}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center">
          {!showResult ? (
            <Button 
              variant="primary" 
              onClick={submitAnswer}
              disabled={!userAnswer}
              className="px-8 py-3 text-lg"
            >
              Submit Answer
            </Button>
          ) : (
            <Button 
              variant="primary" 
              onClick={nextProblem}
              className="px-8 py-3 text-lg"
            >
              {quizState.currentProblem < quizState.problems.length - 1 ? 'Next Problem' : 'Finish Quiz'}
              <Icons.ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MathQuizEngine;