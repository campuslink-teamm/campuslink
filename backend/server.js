const express = require("express");
const app = express();
app.listen(3000, () => {
  console.log("Campuslink serveris paleistas!");
});
app.get("/api/activities", (req, res) => {
    res.json([]);
});