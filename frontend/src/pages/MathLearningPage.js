import React, { useState } from 'react';

const MathLearningPage = () => {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

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

  const startSkillPractice = (skill) => {
    setSelectedSkill(skill);
    setShowQuiz(true);
  };

  const SimpleQuiz = ({ skill, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
        <div className="text-center">
          <div className="text-6xl mb-4">{skill.icon}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{skill.name}</h2>
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <p className="text-lg text-blue-800 font-semibold">🚀 Get ready to practice!</p>
            <p className="text-blue-600 mt-2">This skill has {skill.skills} fun problems to solve!</p>
          </div>
          <div className="text-4xl mb-4">🎯</div>
          <p className="text-gray-600 mb-6">Interactive quiz coming soon! This will include step-by-step problems, hints, and instant feedback.</p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
          >
            ← Back to Skills
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {showQuiz && (
        <SimpleQuiz 
          skill={selectedSkill} 
          onClose={() => setShowQuiz(false)} 
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
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