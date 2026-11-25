import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { isSupabaseConfigured } from '../supabase/supabaseClient';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

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
          <Button onClick={() => navigate('/signin')}>
            Prisijungti
          </Button>

          <Button onClick={() => navigate('/register')}>
            Registruotis
          </Button>
        </div>

        {!isSupabaseConfigured && (
          <p className="home-config-warning" role="alert">
            Prisijungimas dar nesukonfigūruotas. Nustatykite
            {' '}VITE_SUPABASE_URL ir VITE_SUPABASE_PUBLISHABLE_KEY,
            {' '}kad veiktų paskyros funkcijos.
          </p>
        )}
      </section>

    </main>
  );
}