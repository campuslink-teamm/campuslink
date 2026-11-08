
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUserSession } from '../services/authenticationService';
import { supabaseClient } from '../supabase/supabaseClient';

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const currentSession = await getCurrentUserSession();

        if (active) {
          setSession(currentSession);
        }
      } catch (error) {
        console.error('Session check failed:', error);
        if (active) {
          setSession(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    checkSession();

    const { data: { subscription } } =
      supabaseClient.auth.onAuthStateChange((_event, newSession) => {
        if (active) {
          setSession(newSession);
          setLoading(false);
        }
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <p>Tikrinamas prisijungimas...</p>;
  }

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
