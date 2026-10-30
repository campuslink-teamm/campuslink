
import Button from "../components/ui/Button";
import "./HomePage.css";

function HomePage({ onSignIn, onRegister }) {
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
          <Button onClick={onSignIn}>
            Prisijungti
          </Button>

          <Button onClick={onRegister}>
            Registruotis
          </Button>
        </div>
      </section>

    </main>
  );
}

export default HomePage;
