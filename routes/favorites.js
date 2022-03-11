const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");
const User = require("../models/User");

router.get("/favorites", async (req, res) => {
  try {
    const isUserConnected = await User.findOne({ token: req.fields.token });

    if (isUserConnected === null) {
      res.status(400).json({ message: "user invalid" });
    } else {
      const CharacToFind = isUserConnected.favCharacters.find(
        (elem) => elem._id === req.fields.characters_id
      );
      if (CharacToFind) {
        res.json({ message: "already exists" });
      } else {
        isUserConnected.favCharacters.push(req.fields.characters);
        await isUserConnected.save();
      }
    }
    console.log(isUserConnected);
    console.log("toke n", req.fields.token);
    console.log("charct", req.fields.characters);
  } catch (error) {}
});
module.exports = router;
