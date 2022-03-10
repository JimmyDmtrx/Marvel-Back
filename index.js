require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_DB_URI);
app.use(cors());
app.use(formidable());

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to marvel Api" });
});

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);
const characterRoutes = require("./routes/characters");
app.use(characterRoutes);
const userRoutes = require("./routes/user_routes");
app.use(userRoutes);
const favoritesRoutes = require("./routes/favorites");
app.use(favoritesRoutes);

app.all("*", function (req, res) {
  res.json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
