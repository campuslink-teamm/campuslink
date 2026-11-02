const express = require("express");
const app = express();
app.listen(3000, () => {
  console.log("Campuslink serveris paleistas!");
});
app.get("/api/activities", (req, res) => {
    res.json([]);
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