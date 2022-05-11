const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");

const apiKey = process.env.API_KEY;
// console.log("apikey :", process.env.API_KEY);

router.get("/characters", async (req, res) => {
  try {
    const limit = req.query.limit;
    const name = req.query.name;
    const page = req.query.page;
    const skip = (page - 1) * 100;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}&name=${name}&limit=${limit}&skip=${skip}`
    );
    const data = response.data;
    // console.log(response.data);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

// router.get("/character/:characterId", async (req, res) => {
//   try {
//     const characterId = req.params.characterId;
//     const response = await axios.get(
//       `https://lereacteur-marvel-api.herokuapp.com/characters/${characterId}?apiKey=${apiKey}`
//     );
//     const data = response.data;
//     // console.log(response.data);
//     res.json(data);
//   } catch (error) {
//     res.status(400).json({ error: { message: error.message } });
//   }
// });

module.exports = router;
