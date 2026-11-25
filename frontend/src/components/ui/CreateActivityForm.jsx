import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
import BaseCard from './BaseCard';
import { createActivity } from '../../services/activityService';
import './CreatActivityForm.css';

const initialFormData = {
  title: '',
  category: '',
  description: '',
  location: '',
  date: '',
  time: '',
};

export default function CreateActivityForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value,
    }));
    setError('');
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (
      formData.title.trim().length < 3 ||
      !formData.category ||
      !formData.description.trim() ||
      !formData.date ||
      !formData.time
    ) {
      setError('Užpildykite visus privalomus laukus. Pavadinimas turi būti bent 3 simbolių.');
      return;
    }

    setSaving(true);

    try {
      await createActivity(formData);
      navigate('/feed', { replace: true });
    } catch (submitError) {
      setError(
        submitError.message ||
        'Nepavyko paskelbti veiklos. Patikrinkite duomenis ir bandykite dar kartą.'
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="create-activity-wrapper">
      <header className="create-activity-header">
        <h1>Sukurti veiklą</h1>
        <p>Pakvieskite kitus studentus prisijungti prie veiklos.</p>
      </header>

      <BaseCard>
        <form onSubmit={handleSubmit}>
          <div className="form-row-two-cols">
            <Input
              id="activity-title"
              label="Pavadinimas *"
              placeholder="Pvz., Stalo žaidimų vakaras"
              value={formData.title}
              onChange={handleChange('title')}
              required
            />

            <div className="campus-input-group">
              <label className="campus-input-label" htmlFor="activity-category">
                Kategorija *
              </label>
              <select
                id="activity-category"
                className="campus-input"
                value={formData.category}
                onChange={handleChange('category')}
                required
              >
                <option value="">Pasirinkite kategoriją</option>
                <option value="laisvalaikis">Laisvalaikis</option>
                <option value="sportas">Sportas</option>
                <option value="mokslai">Mokslai</option>
                <option value="kultura">Kultūra</option>
                <option value="kita">Kita</option>
              </select>
            </div>
          </div>

          <div className="campus-input-group">
            <label className="campus-input-label" htmlFor="activity-description">
              Aprašymas *
            </label>
            <textarea
              id="activity-description"
              className="campus-input campus-textarea"
              placeholder="Aprašykite veiklą ir svarbią informaciją."
              value={formData.description}
              onChange={handleChange('description')}
              required
            />
          </div>

          <Input
            id="activity-location"
            label="Vieta"
            placeholder="Pvz., VU bibliotekos kiemas"
            value={formData.location}
            onChange={handleChange('location')}
          />

          <div className="form-row-two-cols">
            <Input
              id="activity-date"
              type="date"
              label="Data *"
              value={formData.date}
              onChange={handleChange('date')}
              required
            />
            <Input
              id="activity-time"
              type="time"
              label="Laikas *"
              value={formData.time}
              onChange={handleChange('time')}
              required
            />
          </div>

          {error && (
            <p className="form-error-text" role="alert">
              {error}
            </p>
          )}

          <div className="form-actions-right">
            <button
              className="cancel-outline-btn"
              type="button"
              onClick={() => navigate('/feed')}
              disabled={saving}
            >
              Atšaukti
            </button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Skelbiama...' : 'Paskelbti veiklą'}
            </Button>
          </div>
        </form>
      </BaseCard>
    </main>
  );
}
