import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../AuthenticatedHeader';
import Input from './Input';
import Button from './Button';
import BaseCard from './BaseCard';
import {
  ACTIVITY_IMAGE_LIMIT,
  ACTIVITY_IMAGE_SIZE_LIMIT,
  ACTIVITY_IMAGE_TYPES,
  createActivity,
} from '../../services/activityService';
import './CreatActivityForm.css';
import './ActivityImageUpload.css';

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
  const [selectedImages, setSelectedImages] = useState([]);
  const selectedImagesRef = useRef([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => () => {
    selectedImagesRef.current.forEach(({ previewUrl }) => {
      URL.revokeObjectURL(previewUrl);
    });
  }, []);

  function replaceSelectedImages(files) {
    selectedImagesRef.current.forEach(({ previewUrl }) => {
      URL.revokeObjectURL(previewUrl);
    });

    const images = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    selectedImagesRef.current = images;
    setSelectedImages(images);
  }

  const handleChange = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value,
    }));
    setError('');
  };

  function handleImageChange(event) {
    const input = event.currentTarget;
    const files = Array.from(input.files ?? []);
    input.value = '';

    if (files.length > ACTIVITY_IMAGE_LIMIT) {
      setError(`Pasirinkite ne daugiau kaip ${ACTIVITY_IMAGE_LIMIT} nuotraukų.`);
      return;
    }

    if (files.some((file) => !ACTIVITY_IMAGE_TYPES.includes(file.type))) {
      setError('Galima įkelti tik JPG, PNG arba WebP nuotraukas.');
      return;
    }

    if (files.some((file) => file.size > ACTIVITY_IMAGE_SIZE_LIMIT)) {
      setError('Vienos nuotraukos dydis negali viršyti 5 MB.');
      return;
    }

    replaceSelectedImages(files);
    setError('');
  }

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
      await createActivity({
        ...formData,
        images: selectedImages.map(({ file }) => file),
      });
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
    <div className="create-activity-page">
      <AuthenticatedHeader />
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

          <div className="campus-input-group activity-image-upload">
            <label className="campus-input-label" htmlFor="activity-images">
              Nuotraukos (neprivaloma)
            </label>
            <input
              id="activity-images"
              className="campus-input"
              type="file"
              accept={ACTIVITY_IMAGE_TYPES.join(',')}
              multiple
              onChange={handleImageChange}
              disabled={saving}
              aria-describedby="activity-image-help"
            />
            <p id="activity-image-help" className="activity-image-help">
              Iki {ACTIVITY_IMAGE_LIMIT} JPG, PNG arba WebP nuotraukų,
              kiekviena iki 5 MB.
            </p>

            {selectedImages.length > 0 && (
              <div className="activity-image-previews">
                {selectedImages.map(({ file, previewUrl }, index) => (
                  <figure className="activity-image-preview" key={previewUrl}>
                    <img src={previewUrl} alt={`Pasirinkta: ${file.name}`} />
                    <figcaption>{file.name}</figcaption>
                    <button
                      type="button"
                      onClick={() => replaceSelectedImages(
                        selectedImagesRef.current
                          .filter((_, imageIndex) => imageIndex !== index)
                          .map(({ file }) => file)
                      )}
                      disabled={saving}
                    >
                      Pašalinti
                    </button>
                  </figure>
                ))}
              </div>
            )}
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
    </div>
  );
}
