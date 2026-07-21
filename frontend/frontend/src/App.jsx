import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { RepositoryProvider } from './contexts/RepositoryContext';

// Pages
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { AIChat } from './pages/AIChat';
import { BugDetective } from './pages/BugDetective';
import { Documentation } from './pages/Documentation';
import { ProjectHealth } from './pages/ProjectHealth';
import { Memory } from './pages/Memory';
import { Repository } from './pages/Repository';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <RepositoryProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<AIChat />} />
              <Route path="/bugs" element={<BugDetective />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/health" element={<ProjectHealth />} />
              <Route path="/memory" element={<Memory />} />
              <Route path="/repository" element={<Repository />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Router>
        </RepositoryProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
