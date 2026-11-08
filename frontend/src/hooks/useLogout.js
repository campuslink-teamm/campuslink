
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authenticationService';

export default function useLogout() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logoutUser();
      navigate('/signin', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
      alert('Atsijungti nepavyko. Bandykite dar kartą.');
    }
  };

  return { handleLogout, isLoggingOut };
}
