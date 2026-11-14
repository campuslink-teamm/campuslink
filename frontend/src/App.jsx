
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import CreateActivityForm from './components/ui/CreateActivityForm';

// Puslapių apsauga
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Vieši puslapiai */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Tik prisijungusiems naudotojams */}
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <FeedPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateActivityForm />
            </ProtectedRoute>
          }
        />
        {/* Naudotojo profilis */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        {/* Nežinomas adresas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
