// Grade-specific assessment questions
export const gradeAssessments = {
  'K-1': [
    // Number Recognition & Counting (K-1)
    { question: "How many dots? •••", answer: 3, skill: 'counting', level: 1, visual: "Count the dots: •••" },
    { question: "What comes after 4? 1, 2, 3, 4, ?", answer: 5, skill: 'counting', level: 1, visual: "1️⃣ 2️⃣ 3️⃣ 4️⃣ ?" },
    
    // Basic Addition (objects)
    { question: "2 + 1 = ?", answer: 3, skill: 'addition', level: 1, visual: "🍎🍎 + 🍎 = ?" },
    { question: "3 + 2 = ?", answer: 5, skill: 'addition', level: 1, visual: "🐶🐶🐶 + 🐶🐶 = ?" },
    
    // Basic Subtraction (take away)
    { question: "5 - 2 = ?", answer: 3, skill: 'subtraction', level: 1, visual: "🍪🍪🍪🍪🍪 cross out 2 = ?" },
    { question: "4 - 1 = ?", answer: 3, skill: 'subtraction', level: 1, visual: "🎈🎈🎈🎈 one pops = ?" },
    
    // Shape Recognition
    { question: "How many sides does a triangle have?", answer: 3, skill: 'shapes', level: 1, visual: "🔺 triangle" },
    { question: "How many sides does a square have?", answer: 4, skill: 'shapes', level: 1, visual: "⬜ square" },
    
    // Number comparison
    { question: "Which is bigger: 3 or 5?", answer: 5, skill: 'comparison', level: 1, visual: "3️⃣ or 5️⃣ ?" },
    { question: "Which is smaller: 2 or 4?", answer: 2, skill: 'comparison', level: 1, visual: "2️⃣ or 4️⃣ ?" }
  ],
  
  '2-3': [
    // Addition with regrouping
    { question: "15 + 7 = ?", answer: 22, skill: 'addition', level: 2, visual: "1️⃣5️⃣ + 7️⃣ = ?" },
    { question: "28 + 16 = ?", answer: 44, skill: 'addition', level: 2, visual: "Count by tens and ones" },
    
    // Subtraction with borrowing
    { question: "23 - 8 = ?", answer: 15, skill: 'subtraction', level: 2, visual: "2️⃣3️⃣ - 8️⃣ = ?" },
    { question: "40 - 17 = ?", answer: 23, skill: 'subtraction', level: 2, visual: "4️⃣0️⃣ - 1️⃣7️⃣ = ?" },
    
    // Introduction to multiplication
    { question: "3 × 4 = ?", answer: 12, skill: 'multiplication', level: 2, visual: "3 groups of 4: 🍭🍭🍭🍭  🍭🍭🍭🍭  🍭🍭🍭🍭" },
    { question: "5 × 2 = ?", answer: 10, skill: 'multiplication', level: 2, visual: "5 pairs: 🐶🐶 🐶🐶 🐶🐶 🐶🐶 🐶🐶" },
    
    // Place value (2-digit)
    { question: "In 47, what digit is in the tens place?", answer: 4, skill: 'place-value', level: 2, visual: "4️⃣7️⃣ (tens-ones)" },
    { question: "What is 6 tens and 3 ones?", answer: 63, skill: 'place-value', level: 2, visual: "6️⃣ tens + 3️⃣ ones = ?" },
    
    // Simple word problems
    { question: "Tom has 12 marbles. He gives away 5. How many left?", answer: 7, skill: 'word-problems', level: 2, visual: "🧒 12 ⚪ - 5 ⚪ = ?" },
    { question: "There are 8 birds in a tree. 3 more come. How many total?", answer: 11, skill: 'word-problems', level: 2, visual: "🌳 8 🐦 + 3 🐦 = ?" }
  ],
  
  '4-5': [
    // Multi-digit arithmetic
    { question: "238 + 165 = ?", answer: 403, skill: 'addition', level: 3, visual: "Line up the digits vertically" },
    { question: "500 - 247 = ?", answer: 253, skill: 'subtraction', level: 3, visual: "5️⃣0️⃣0️⃣ - 2️⃣4️⃣7️⃣ = ?" },
    
    // Multiplication tables
    { question: "7 × 8 = ?", answer: 56, skill: 'multiplication', level: 3, visual: "7 groups of 8" },
    { question: "9 × 6 = ?", answer: 54, skill: 'multiplication', level: 3, visual: "9 rows of 6 dots" },
    
    // Division
    { question: "48 ÷ 6 = ?", answer: 8, skill: 'division', level: 3, visual: "48 items in 6 equal groups" },
    { question: "72 ÷ 9 = ?", answer: 8, skill: 'division', level: 3, visual: "How many 9s in 72?" },
    
    // Fractions
    { question: "What is 1/3 of 12?", answer: 4, skill: 'fractions', level: 3, visual: "🍕 divided into 3 equal parts" },
    { question: "Which is bigger: 1/2 or 1/4?", answer: 0.5, skill: 'fractions', level: 3, visual: "🍕 half vs quarter" },
    
    // Decimals
    { question: "2.5 + 1.3 = ?", answer: 3.8, skill: 'decimals', level: 3, visual: "2.5️⃣ + 1.3️⃣ = ?" },
    { question: "5.0 - 2.4 = ?", answer: 2.6, skill: 'decimals', level: 3, visual: "5.0️⃣ - 2.4️⃣ = ?" }
  ],
  
  '6+': [
    // Advanced operations
    { question: "1,247 + 3,856 = ?", answer: 5103, skill: 'addition', level: 4, visual: "Thousands + hundreds + tens + ones" },
    { question: "4,000 - 1,678 = ?", answer: 2322, skill: 'subtraction', level: 4, visual: "Multi-step borrowing" },
    
    // Long multiplication
    { question: "23 × 17 = ?", answer: 391, skill: 'multiplication', level: 4, visual: "Use distributive property" },
    { question: "156 ÷ 12 = ?", answer: 13, skill: 'division', level: 4, visual: "Long division" },
    
    // Advanced fractions
    { question: "3/4 + 1/8 = ? (as eighths)", answer: 7, skill: 'fractions', level: 4, visual: "Find common denominator" },
    { question: "2/3 × 3/4 = ? (numerator only)", answer: 6, skill: 'fractions', level: 4, visual: "Multiply across" },
    
    // Decimals & Percentages
    { question: "0.75 × 40 = ?", answer: 30, skill: 'decimals', level: 4, visual: "75% of 40" },
    { question: "What is 25% of 80?", answer: 20, skill: 'percentages', level: 4, visual: "Quarter of 80" },
    
    // Basic Algebra
    { question: "If x + 12 = 20, what is x?", answer: 8, skill: 'algebra', level: 4, visual: "❓ + 12 = 20" },
    { question: "Solve: 3y = 24", answer: 8, skill: 'algebra', level: 4, visual: "3 × ❓ = 24" }
  ]
};