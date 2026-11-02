import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importuojame useNavigate
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import BaseCard from "../components/ui/BaseCard";
import "./AuthPage.css";

export default function RegisterPage() {
  const navigate = useNavigate(); // 2. Inicijuojame hook'ą

  // Registracijos pateikimas – demonstraciškai nukreipia į skelbimų srautą (/feed)
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
              />

              <Input
                id="register-password"
                label="Slaptažodis"
                type="password"
                placeholder="Sugalvok slaptažodį"
              />

              <Input
                id="register-confirm-password"
                label="Pakartok slaptažodį"
                type="password"
                placeholder="Pakartok slaptažodį"
              />

              <div className="auth-submit">
                <Button type="submit">Registruotis</Button>
              </div>
            </form>

            <p className="auth-footer">
              Jau turi paskyrą?{" "}
              <button
                type="button"
                className="auth-link"
                onClick={() => navigate('/signin')} // Nukreipia atgal į prisijungimo puslapį
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