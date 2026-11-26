import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import BaseCard from '../components/ui/BaseCard';

import { sendPasswordResetEmail } from '../services/authenticationService';

import './AuthPage.css';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await sendPasswordResetEmail(email.trim());

      setSuccessMessage(
        'Jeigu šis el. paštas yra užregistruotas, ' +
        'į jį išsiuntėme slaptažodžio atkūrimo nuorodą.'
      );

    } catch (error) {
      console.error('Password reset error:', error);

      setErrorMessage(
        'Nepavyko išsiųsti laiško. Bandyk dar kartą vėliau.'
      );

    } finally {
      setIsLoading(false);
    }
  }

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

            <h1 className="auth-title">
              Pamiršai slaptažodį?
            </h1>

            <p className="auth-description">
              Įvesk savo el. paštą ir atsiųsime
              nuorodą slaptažodžiui atkurti.
            </p>

            <form onSubmit={handleSubmit}>

              <Input
                id="reset-email"
                label="El. paštas"
                type="email"
                placeholder="vardas@universitetas.lt"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              {errorMessage && (
                <p role="alert" style={{ color: '#dc2626' }}>
                  {errorMessage}
                </p>
              )}

              {successMessage && (
                <p role="status" style={{ color: '#15803d' }}>
                  {successMessage}
                </p>
              )}

              <div className="auth-submit">
                <Button type="submit" disabled={isLoading}>
                  {isLoading
                    ? 'Siunčiama...'
                    : 'Siųsti atkūrimo nuorodą'}
                </Button>
              </div>

            </form>

            <p className="auth-footer">
              Prisiminėi slaptažodį?{' '}

              <button
                type="button"
                className="auth-link"
                onClick={() => navigate('/signin')}
              >
                Grįžti į prisijungimą
              </button>
            </p>

          </BaseCard>

        </div>
      </section>

    </main>
  );
}