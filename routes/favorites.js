const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");
const User = require("../models/User");

router.get("/favorites", async (req, res) => {
  try {
    const isUserConnected = await User.findOne({ token: req.fields.token });

    if (isUserConnected) {
      res.json(req.fields.favcharacters, req.fields.favcomics);
    }
    // console.log(isUserConnected);
    // console.log(req.fields.token);
  } catch (error) {}
});
module.exports = router;
