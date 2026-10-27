import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import BaseCard from "./BaseCard";

export default function CreateActivityForm() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    date: "",
    time: "",
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
      location: "",
      description: "",
      date: "",
      time: "",
    });
    setError("");
    setPreviewData(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.location.trim() ||
      !formData.date ||
      !formData.time
    ) {
      setError("Prašome užpildyti visus privalomus laukus (*).");
      setPreviewData(null);
      return;
    }

    console.log("Sukurta veikla (tik peržiūra, neišsaugota DB):", formData);
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
          Pasidalykite su universiteto bendruomene.
        </p>
      </div>

      <BaseCard>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <Input
              id="title"
              label={requiredLabel("Pavadinimas")}
              placeholder="pvz. Parduodami vadoveliai"
              value={formData.title}
              onChange={handleChange("title")}
            />
            <Input
              id="location"
              label={requiredLabel("Vieta")}
              placeholder="pvz. Saulėtekio al. 9"
              value={formData.location}
              onChange={handleChange("location")}
            />
          </div>

          <div className="campus-input-group">
            <label className="campus-input-label" htmlFor="description">
              {requiredLabel("Aprašymas")}
            </label>
            <textarea
              id="description"
              className="campus-input"
              style={{ minHeight: "110px", resize: "vertical", fontFamily: "inherit" }}
              placeholder="Aprašykite savo skelbimą"
              value={formData.description}
              onChange={handleChange("description")}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <Input
              id="date"
              type="date"
              label={requiredLabel("Data")}
              value={formData.date}
              onChange={handleChange("date")}
            />
            <Input
              id="time"
              type="time"
              label={requiredLabel("Laikas")}
              value={formData.time}
              onChange={handleChange("time")}
            />
          </div>

          {error && (
            <p style={{ color: "#e63946", fontWeight: 600, margin: "8px 0" }}>
              {error}
            </p>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
            <button
              type="button"
              onClick={handleReset}
              style={{
                backgroundColor: "white",
                color: "#374151",
                border: "2px solid #d1d5db",
                borderRadius: "12px",
                padding: "12px 24px",
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
            <h3 style={{ marginTop: 0 }}>Duomenų peržiūra (neišsaugota DB):</h3>
            <p><strong>Title:</strong> {previewData.title}</p>
            <p><strong>Location:</strong> {previewData.location}</p>
            <p><strong>Description:</strong> {previewData.description}</p>
            <p><strong>Date & Time:</strong> {previewData.date} {previewData.time}</p>
          </div>
        )}
      </BaseCard>
    </div>
  );
}