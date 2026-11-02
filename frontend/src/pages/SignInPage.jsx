import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importuojame useNavigate
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import BaseCard from "../components/ui/BaseCard";
import "./AuthPage.css";

export default function SignInPage() {
  const navigate = useNavigate(); // 2. Inicijuojame hook'ą

  // Prisijungimo pateikimas – nukreipia į skelbimų srautą (/feed)
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/feed'); 
  };

  return (
    <main className="auth-page">
      <header className="auth-header">
        {/* Logo mygtukas grąžina į pradinį puslapį (/) */}
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
              />

              <Input
                id="signin-password"
                label="Slaptažodis"
                type="password"
                placeholder="Įvesk slaptažodį"
              />

              <div className="auth-submit">
                <Button type="submit">Prisijungti</Button>
              </div>
            </form>

            <p className="auth-footer">
              Neturi paskyros?{" "}
              <button
                type="button"
                className="auth-link"
                onClick={() => navigate('/register')} // Nuveda į registracijos puslapį
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