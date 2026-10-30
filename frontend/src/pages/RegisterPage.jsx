
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import BaseCard from "../components/ui/BaseCard";
import "./AuthPage.css";

function RegisterPage({ onBack, onSignIn }) {
  return (
    <main className="auth-page">
      <header className="auth-header">
        <button
          className="auth-logo-button"
          type="button"
          onClick={onBack}
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

            <form onSubmit={(event) => event.preventDefault()}>
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
                onClick={onSignIn}
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

export default RegisterPage;
