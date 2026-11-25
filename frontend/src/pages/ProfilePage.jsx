import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getCurrentUserProfile,
  updateCurrentUserProfile
} from '../services/profileService';

import Button from '../components/ui/Button';
import './ProfilePage.css';

export default function ProfilePage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const data = await getCurrentUserProfile();

        if (active) {
          setProfile(data);
          setFirstName(data.firstName ?? '');
          setLastName(data.lastName ?? '');
          setPhoneNumber(data.phoneNumber ?? '');
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

  async function handleSave(event) {
    event.preventDefault();

    setSaving(true);
    setError('');
    setMessage('');

    try {
      await updateCurrentUserProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber: phoneNumber.trim()
      });

      const updatedProfile = await getCurrentUserProfile();

      setProfile(updatedProfile);
      setFirstName(updatedProfile.firstName ?? '');
      setLastName(updatedProfile.lastName ?? '');
      setPhoneNumber(updatedProfile.phoneNumber ?? '');

      setMessage('Profilio duomenys sėkmingai išsaugoti!');
    } catch (err) {
      setError(err.message || 'Nepavyko išsaugoti pakeitimų.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="profile-page">
        <p>Kraunamas profilis...</p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="profile-page">
        <p role="alert">{error || 'Nepavyko įkelti profilio.'}</p>
      </main>
    );
  }

  return (
    <main className="profile-page">

      <header className="profile-header">
        <h2 className="profile-logo">CampusLink 🌸</h2>

        <button
          className="profile-back"
          onClick={() => navigate('/feed')}
          type="button"
        >
          ← Grįžti į pagrindinį
        </button>
      </header>

      <div className="profile-container">

        <div className="profile-welcome">
          <div className="profile-avatar">
            {firstName.trim().charAt(0).toUpperCase() || '🎓'}
          </div>

          <h1>Mano profilis</h1>
          <p>Peržiūrėk ir atnaujink savo informaciją</p>
        </div>

        <section className="profile-card">

          <div className="profile-section-title">
            <h2>Asmeninė informacija</h2>
            <p>Čia gali redaguoti savo duomenis</p>
          </div>

          <form onSubmit={handleSave}>

            <div className="profile-fields">

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
                <label htmlFor="lastName">Pavardė</label>

                <input
                  id="lastName"
                  className="profile-input"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Įvesk pavardę"
                />
              </div>

              <div className="profile-field">
                <label htmlFor="email">El. paštas</label>

                <input
                  id="email"
                  className="profile-input profile-readonly"
                  type="email"
                  value={profile.email}
                  readOnly
                />

                <small>El. pašto keisti negalima</small>
              </div>

              <div className="profile-field">
                <label htmlFor="phoneNumber">
                  Telefono numeris
                </label>

                <input
                  id="phoneNumber"
                  className="profile-input"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+370..."
                />
              </div>

            </div>

            <div className="profile-stats">
              <div>
                <span>📋 Mano veiklos</span>
                <strong>{profile.activitiesCount}</strong>
              </div>
            </div>

            {error && (
              <p className="profile-error" role="alert">
                {error}
              </p>
            )}

            {message && (
              <p className="profile-success" role="status">
                {message}
              </p>
            )}

            <div className="profile-actions">
              <Button type="submit" disabled={saving}>
                {saving
                  ? 'Išsaugoma...'
                  : 'Išsaugoti pakeitimus'}
              </Button>
            </div>

          </form>

        </section>

      </div>

    </main>
  );
}