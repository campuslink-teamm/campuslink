
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import BaseCard from "../components/ui/BaseCard";
import "./AuthPage.css";

function SignInPage({ onBack, onRegister }) {
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
            <h1 className="auth-title">Prisijungti</h1>
            <p className="auth-description">
              Sveikas sugrįžęs į CampusLink!
            </p>

            <form onSubmit={(event) => event.preventDefault()}>
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
                onClick={onRegister}
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

export default SignInPage;
