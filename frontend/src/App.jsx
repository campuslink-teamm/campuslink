import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importuojame visų komandos narių puslapius
import HomePage from './pages/HomePage'; 
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import CreateActivityForm from './components/ui/CreateActivityForm'; 

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Pagrindinis puslapis */}
        <Route path="/" element={<HomePage />} />

        {/* 2. Prisijungimas ir Registracija */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 3. Skelbimų srautas (FeedPage) */}
        <Route path="/feed" element={<FeedPage />} />

        {/* 4. Skelbimo kūrimo forma */}
        <Route path="/create" element={<CreateActivityForm />} />

        {/* Jei įvedamas nežinomas kelias – nukreipiama į pradinį puslapį */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}