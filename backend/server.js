const express = require("express");
const app = express();
app.listen(3000, () => {
  console.log("Campuslink serveris paleistas!");
});
app.get("/api/activities", (req, res) => {
    res.json([]);
});

/// Saraso gavimas pagrindiniam puslapiui

app.get("/api/activities", async (req, res) => {
  try {
    const { data, error } = await supabase.from("activities").select(`id, title, description, category, location, date, author_id`)
    .order("created_at", { ascending: false }); //jog pirmumas butu naujausiam
    if (error) {
      console.error("Supabase DB klaida:", error);
      return res.status(500).json({
        error: "Įvyko klaida gaunant skelbimus!",
        details: error.message
      });
    }
    return res.status(200).json(data || []);
  } catch (err) {
    console.error("Serverio klaida:", err);
    return res.status(500).json({
      error: "Įvyko serverio klaida!"
      });
    }
});

/// Skelbimo kurimo meniu 

require("dotenv").config();
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.post("/api/activities", async (req, res) => {
  const { title, location, description, date, time } = req.body;

  if (!title || !location || !description || !date || !time){
    return res.status(400).json({
      error: "Visi laukai turi būti užpildyti!"
    })
  }

  const{data, error}=await supabase.from("activities").insert([
    {
    title: title.trim(),
    location: location.trim(),
    description: description.trim(),
    date_time: `${date} ${time}`,
    }
  ])
  .select();
  if (error){
    return res.status(400).json({ error: error.message});
  }

  res.status(201).json(data[0]);
  });

  /// Nuajo skelbimo kurimas

  app.post("/api/activities", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          error: "Neprisijungęs vartotojas negali sukurti skelbimo!"
        });
      }
      const { data: { user }, error: userError } = await supabase.auth.getUser(token);
      if (authError || !user) {
        return res.status(401).json({
          error: "Neteisingas arba pasibaigęs prisijungimo raktas!"
        });
    }
    const { title, description, category, location, date, time } = req.body;
    if (!title || typeof title !== "string" || title.trim().length < 3) {
      return res.status(400).json({
        error: "Pavadinimas turi būti bent 3 simbolių ilgio!"
      });
    }
    if (!description || typeof description !== "string" || description.trim().length == 0) {
      return res.status(400).json({
        error: "Aprašymas negali būti tuščias!"
      });
    }
    if (!category || typeof category !== "string") {
      return res.status(400).json({
        error: "Kategorija turi būti nurodyta!"
      });
    }
    const newActivity = { title: title.trim(), 
      description: description.trim(), 
      category: category.trim(),
      location: location ? location.trim() : null,
      date: date || null,
      author_id: user.id,
    };
    const { data, error: dbError } = await supabase.from("activities").insert([newActivity]).select("id").single();
    if (dbError) {
      console.error("Supabase DB klaida:", dbError);
      return res.status(500).json({
        error: "Įvyko klaida kuriant skelbimą!",
        details: dbError.message
      });
    }
    return res.status(201).json({
      message: "Skelbimas sėkmingai sukurtas!",
      id: data.id
    });
    } catch (err) {
      console.error("Serverio klaida:", err);
      return res.status(500).json({
        error: "Įvyko serverio klaida!"
      });
    }
  });

  /// Skelbumu gavimas pagal id 

  app.get("/api/activities/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const uudiRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uudiRegex.test(id)) {
        return res.status(400).json({
          error: "Neteisingas skelbimo ID formatas!"
        });
      }
      const { data, error } =await supabase.from("activities").select(`id, title, description, category, location, date, author_id`).eq("id", id).maybeSingle();
      if (error){
        console.error("Supabase DB klaida:", error);
        return res.status(500).json({
          error: "Įvyko klaida gaunant skelbimą!",
          details: error.message
        });
      }
      if (!data) {
        return res.status(400).json({
          error: "Skelbimas nerastas!"
        });
      }
      return res.status(200).json(data);
    } catch (err) {
      console.error("Serverio klaida:", err);
      return res.status(500).json({
        error: "Įvyko serverio klaida!"
      });
    }
  });