import React from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom'; // 1. Importuojame useNavigate
import Button from "../components/ui/Button";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate(); // 2. Inicijuojame hook'ą

  return (
    <main className="home-page">

      <header className="home-header">
        <img
          src="/images/logo.png"
          alt="CampusLink"
          className="home-logo"
        />
      </header>

      <section className="home-hero">
        <h1 className="home-title">
          Campus<span>Link</span>
        </h1>

        <h2>Veiklos prasideda nuo pažinčių!</h2>

        <p>
          Atrask studentų organizuojamas veiklas,
          susirask bendraminčių ir prisijunk
          prie universiteto bendruomenės.
        </p>

        <div className="home-buttons">
          {/* 3. Prijungiame naršymą prie mygtukų */}
          <Button onClick={() => navigate('/signin')}>
            Prisijungti
          </Button>

          <Button onClick={() => navigate('/register')}>
            Registruotis
          </Button>
        </div>
      </section>

    </main>
  );
}