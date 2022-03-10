const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");

const apiKey = process.env.API_KEY;

router.get("/comics", async (req, res) => {
  try {
    const title = req.query.title;
    const limit = req.query.limit;
    const page = req.query.page;
    const skip = (page - 1) * 100;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}&title=${title}&limit=${limit}&skip=${skip}`
    );
    const data = response.data;
    // console.log("data :", response.data);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

router.get(`/comics/:characterId`, async (req, res) => {
  const limit = 100;
  const characterId = req.params.characterId;
  // console.log("characId>", characterId);
  // console.log("req>", req.params);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${apiKey}&limit=${limit}`
    );
    // console.log("data :", response.data);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

module.exports = router;
