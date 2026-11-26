
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authenticationService';
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import BaseCard from "../components/ui/BaseCard";
import "./AuthPage.css";

export default function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      await loginUser(email.trim(), password);
      navigate('/feed', { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(
        'Nepavyko prisijungti. Patikrink el. paštą ir slaptažodį.'
      );
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
            <h1 className="auth-title">Prisijungti</h1>
            <p className="auth-description">
              Sveikas sugrįžęs į CampusLink!
            </p>

            <form onSubmit={handleSubmit}>
              <Input
                id="signin-email"
                label="El. paštas"
                type="email"
                placeholder="vardas@universitetas.lt"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              <Input
                id="signin-password"
                label="Slaptažodis"
                type="password"
                placeholder="Įvesk slaptažodį"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <div className="auth-forgot-password">
              <button
                type="button"
                className="auth-link"
                onClick={() => navigate('/forgot-password')}
              >
                Pamiršau slaptažodį?
              </button>
            </div>
              {errorMessage && (
                <p role="alert" style={{ color: 'red' }}>
                  {errorMessage}
                </p>
              )}

              <div className="auth-submit">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Jungiamasi...' : 'Prisijungti'}
                </Button>
              </div>
            </form>

            <p className="auth-footer">
              Neturi paskyros?{" "}
              <button
                type="button"
                className="auth-link"
                onClick={() => navigate('/register')}
              >
                Registruotis
              </button>
            </p>
          </BaseCard>
        </div>
      </section>
    </main>
  );
}
