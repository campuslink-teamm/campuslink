import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import BaseCard from '../components/ui/BaseCard';

import { supabaseClient } from '../supabase/supabaseClient';
import { updateUserPassword } from '../services/authenticationService';

import './AuthPage.css';

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    // Patikriname slaptažodžio ilgį
    if (password.length < 8) {
      setErrorMessage('Slaptažodį turi sudaryti bent 8 simboliai.');
      return;
    }

    // Patikriname, ar slaptažodžiai sutampa
    if (password !== confirmPassword) {
      setErrorMessage('Įvesti slaptažodžiai nesutampa.');
      return;
    }

    setIsLoading(true);

    try {
      // Patikriname, ar naudotojas turi galiojančią sesiją
      const { data, error: sessionError } =
        await supabaseClient.auth.getSession();

      if (sessionError || !data.session) {
        setErrorMessage(
          'Atkūrimo nuoroda negalioja arba jos galiojimas baigėsi. ' +
          'Paprašyk naujos nuorodos.'
        );
        return;
      }

      // Pakeičiame slaptažodį per Supabase
      await updateUserPassword(password);

      setSuccessMessage(
        'Slaptažodis sėkmingai pakeistas!'
      );

      setPassword('');
      setConfirmPassword('');

    } catch (error) {
      console.error('Password update error:', error);

      setErrorMessage(
        'Nepavyko pakeisti slaptažodžio. Bandyk dar kartą.'
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
              Naujas slaptažodis
            </h1>

            <p className="auth-description">
              Įvesk naują slaptažodį ir pakartok jį.
            </p>

            {!successMessage && (
              <form onSubmit={handleSubmit}>

                <Input
                  id="new-password"
                  label="Naujas slaptažodis"
                  type="password"
                  placeholder="Bent 8 simboliai"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                />

                <Input
                  id="confirm-password"
                  label="Pakartok slaptažodį"
                  type="password"
                  placeholder="Pakartok naują slaptažodį"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  required
                />

                {errorMessage && (
                  <p role="alert" style={{ color: '#dc2626' }}>
                    {errorMessage}
                  </p>
                )}

                <div className="auth-submit">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading
                      ? 'Išsaugoma...'
                      : 'Išsaugoti naują slaptažodį'}
                  </Button>
                </div>

              </form>
            )}

            {successMessage && (
              <p role="status" style={{ color: '#15803d' }}>
                {successMessage}
              </p>
            )}

            <p className="auth-footer">
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