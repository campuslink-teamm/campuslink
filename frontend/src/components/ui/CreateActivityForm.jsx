import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import BaseCard from "./BaseCard";

export default function CreateActivityForm() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    contactInformation: "",
    date: "",
    photos: null,
  });

  const [error, setError] = useState("");
  const [previewData, setPreviewData] = useState(null);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setError("");
  };

  const handleReset = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      contactInformation: "",
      date: "",
      photos: null,
    });
    setError("");
    setPreviewData(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.category.trim() ||
      !formData.description.trim() ||
      !formData.contactInformation.trim() ||
      !formData.date
    ) {
      setError("Prašome užpildyti visus privalomus laukus (*).");
      setPreviewData(null);
      return;
    }

    console.log("Sukurtas skelbimas (tik peržiūra, neišsaugota DB):", formData);
    setPreviewData(formData);
  };

  const requiredLabel = (text) => (
    <>
      {text} <span style={{ color: "#e63946" }}>*</span>
    </>
  );

  return (
    <div style={{ maxWidth: "720px", margin: "40px auto", padding: "0 16px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 6px 0" }}>
          Sukurti skelbimą
        </h1>
        <p style={{ fontSize: "16px", color: "#4b5563", margin: 0 }}>
          Pasidalykite su universiteto bendruomene
        </p>
      </div>

      <BaseCard>
        <form onSubmit={handleSubmit}>
          {/* Pirma eilutė: Pavadinimas ir Kategorija */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            <Input
              id="title"
              label={requiredLabel("Pavadinimas")}
              placeholder="pvz. Parduodami vadovėliai"
              value={formData.title}
              onChange={handleChange("title")}
            />
            
            <div className="campus-input-group">
              <label className="campus-input-label" htmlFor="category">
                {requiredLabel("Kategorija")}
              </label>
              <select
                id="category"
                className="campus-input"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db", fontFamily: "inherit", backgroundColor: "white" }}
                value={formData.category}
                onChange={handleChange("category")}
              >
                <option value="">Pasirinkite kategoriją</option>
                <option value="vadoveliai">Vadovėliai</option>
                <option value="elektronika">Elektronika</option>
                <option value="paslaugos">Paslaugos</option>
                <option value="kita">Kita</option>
              </select>
            </div>
          </div>

          {/* Aprašymas */}
          <div className="campus-input-group" style={{ marginBottom: "20px" }}>
            <label className="campus-input-label" htmlFor="description">
              {requiredLabel("Aprašymas")}
            </label>
            <textarea
              id="description"
              className="campus-input"
              style={{ width: "100%", minHeight: "110px", resize: "vertical", fontFamily: "inherit", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db" }}
              placeholder="Aprašykite savo skelbimą (būklė, detalės, kaina ir kt.)"
              value={formData.description}
              onChange={handleChange("description")}
            />
          </div>

          {/* Kontaktinė informacija ir Data */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            <Input
              id="contactInformation"
              label={requiredLabel("Kontaktinė informacija")}
              placeholder="Universiteto el. paštas arba telefono numeris"
              value={formData.contactInformation}
              onChange={handleChange("contactInformation")}
            />
            <Input
              id="date"
              type="date"
              label={requiredLabel("Data")}
              value={formData.date}
              onChange={handleChange("date")}
            />
          </div>

          {/* Nuotraukos (pasirinktinai) */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: 500, marginBottom: "8px" }}>
              Nuotraukos (pasirinktinai)
            </label>
            <div
              style={{
                border: "2px dashed #cbd5e1",
                borderRadius: "12px",
                padding: "24px",
                textAlign: "center",
                backgroundColor: "#f8fafc",
                cursor: "pointer",
              }}
            >
              <div style={{ color: "#2563eb", fontWeight: 600, marginBottom: "4px" }}>
                Įkelti nuotraukas
              </div>
              <div style={{ fontSize: "13px", color: "#64748b" }}>
                PNG, JPG iki 5 MB (maks. 5)
              </div>
            </div>
          </div>

          {error && (
            <p style={{ color: "#e63946", fontWeight: 600, margin: "8px 0" }}>
              {error}
            </p>
          )}

          {/* Mygtukai */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
            <button
              type="button"
              onClick={handleReset}
              style={{
                backgroundColor: "white",
                color: "#374151",
                border: "2px solid #d1d5db",
                borderRadius: "12px",
                padding: "10px 24px",
                fontSize: "16px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Atšaukti
            </button>
            <Button type="submit">Paskelbti skelbimą</Button>
          </div>
        </form>

        {previewData && (
          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              border: "2px dashed #9d10a0",
              borderRadius: "12px",
              backgroundColor: "#fdf4ff",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Sukurtas skelbimas (peržiūra):</h3>
            <p><strong>Pavadinimas:</strong> {previewData.title}</p>
            <p><strong>Kategorija:</strong> {previewData.category}</p>
            <p><strong>Aprašymas:</strong> {previewData.description}</p>
            <p><strong>Kontaktai:</strong> {previewData.contactInformation}</p>
            <p><strong>Data:</strong> {previewData.date}</p>
          </div>
        )}
      </BaseCard>
    </div>
  );
}
