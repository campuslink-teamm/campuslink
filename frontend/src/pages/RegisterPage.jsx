
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authenticationService';
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import BaseCard from "../components/ui/BaseCard";
import "./AuthPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim() || !password || !confirmPassword) {
      setErrorMessage('Užpildyk visus laukus.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Slaptažodžiai nesutampa.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Slaptažodis turi būti bent 6 simbolių.');
      return;
    }

    setIsLoading(true);

    try {
      const data = await registerUser(email.trim(), password);

      if (data.user?.identities?.length === 0) {
        setErrorMessage(
          'Šis el. paštas jau gali būti užregistruotas. Pabandyk prisijungti.'
        );
        return;
      }

      if (data.session) {
        navigate('/feed', { replace: true });
      } else {
        setSuccessMessage(
          'Registracijos užklausa priimta. Patikrink el. paštą ir patvirtink paskyrą prieš prisijungdamas.'
        );
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage(error.message || 'Registracija nepavyko.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <header className="auth-header">
        <button
          className="auth-logo-button"
          type="button"
          onClick={() => navigate('/')}
        >
          <img
            src="/images/logo.png"
            alt="CampusLink pradinis puslapis"
            className="auth-logo"
          />
        </button>
      </header>

      <section className="auth-container">
        <div className="auth-card">
          <BaseCard>
            <h1 className="auth-title">Registruotis</h1>
            <p className="auth-description">
              Prisijunk prie studentų bendruomenės!
            </p>

            <form onSubmit={handleSubmit}>
              <Input
                id="register-email"
                label="El. paštas"
                type="email"
                placeholder="vardas@universitetas.lt"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              <Input
                id="register-password"
                label="Slaptažodis"
                type="password"
                placeholder="Sugalvok slaptažodį"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <Input
                id="register-confirm-password"
                label="Pakartok slaptažodį"
                type="password"
                placeholder="Pakartok slaptažodį"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />

              {errorMessage && (
                <p role="alert" style={{ color: 'red' }}>
                  {errorMessage}
                </p>
              )}

              {successMessage && (
                <p role="status" style={{ color: 'green' }}>
                  {successMessage}
                </p>
              )}

              <div className="auth-submit">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Registruojama...' : 'Registruotis'}
                </Button>
              </div>
            </form>

            <p className="auth-footer">
              Jau turi paskyrą?{" "}
              <button
                type="button"
                className="auth-link"
                onClick={() => navigate('/signin')}
              >
                Prisijungti
              </button>
            </p>
          </BaseCard>
        </div>
      </section>
    </main>
  );
}
