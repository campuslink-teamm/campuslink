
import { useEffect, useState } from 'react';
import {
  getCurrentUserProfile,
  updateCurrentUserProfile
} from '../services/profileService';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const data = await getCurrentUserProfile();
        if (active) {
        setProfile(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPhoneNumber(data.phoneNumber);
        }

      } catch (err) {
        if (active) {
          setError(err.message || 'Nepavyko įkelti profilio.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <p>Kraunamas profilis...</p>;
  }

  if (error) {
    return <p role="alert">Klaida: {error}</p>;
  }

return (
  <main className="profile-page">
    <section className="profile-card">
      <h1>Mano profilis</h1>
        <div className="profile-field">
        <label htmlFor="firstName">Vardas</label>
        <input
            id="firstName"
            className="profile-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Įvesk vardą"
        />
        </div>


      <div className="profile-field">
        <span>Pavardė</span>
        <strong>{profile.lastName || 'Nenurodyta'}</strong>
      </div>

      <div className="profile-field">
        <span>El. paštas</span>
        <strong>{profile.email}</strong>
      </div>

      <div className="profile-field">
        <span>Telefono numeris</span>
        <strong>{profile.phoneNumber || 'Nenurodyta'}</strong>
      </div>

      <div className="profile-field">
        <span>Mano skelbimai</span>
        <strong>{profile.listingsCount}</strong>
      </div>
    </section>
  </main>
);
}
