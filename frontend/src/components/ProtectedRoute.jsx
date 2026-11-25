
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUserSession } from '../services/authenticationService';
import {
  getSupabaseClient,
  isSupabaseConfigured
} from '../supabase/supabaseClient';

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }

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
      getSupabaseClient().auth.onAuthStateChange((_event, newSession) => {
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

  if (!isSupabaseConfigured) {
    return (
      <main className="configuration-error">
        <h1>Prisijungimas nesukonfigūruotas</h1>
        <p>
          Nustatykite VITE_SUPABASE_URL ir
          {' '}VITE_SUPABASE_PUBLISHABLE_KEY, tada perkraukite svetainę.
        </p>
      </main>
    );
  }

  if (loading) {
    return <p>Tikrinamas prisijungimas...</p>;
  }

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
