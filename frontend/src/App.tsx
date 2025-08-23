import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './components/ui/DarkModeToggle';
import { AccessibilityProvider } from './components/accessibility/AccessibilityProvider';
import Header from './components/navigation/Header';
import Dashboard from './pages/Dashboard';
import StudentsPage from './pages/StudentsPage';
import TeachersPage from './pages/TeachersPage';
import ParentsPage from './pages/ParentsPage';
import CoursesPage from './pages/CoursesPage';
import AssignmentsPage from './pages/AssignmentsPage';
import MathLearningPage from './pages/MathLearningPage';
import UIShowcase from './pages/UIShowcase';
import './App.css';

function App() {
  return (
    <DarkModeProvider>
      <AccessibilityProvider>
        <Router>
          <div className="App min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<StudentsPage />} />
                <Route path="/teachers" element={<TeachersPage />} />
                <Route path="/parents" element={<ParentsPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/assignments" element={<AssignmentsPage />} />
                <Route path="/math" element={<MathLearningPage />} />
                <Route path="/showcase" element={<UIShowcase />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AccessibilityProvider>
    </DarkModeProvider>
  );
}

export default App;