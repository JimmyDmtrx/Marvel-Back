const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");
const User = require("../models/User");

router.post("/favorites", async (req, res) => {
  try {
    const isUserConnected = await User.findOne({ token: req.fields.token });
    console.log("isuserconnected", isUserConnected);
    console.log("token", req.fields.token);
    console.log("charct", req.fields.characters);
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
  } catch (error) {
    console.log(error.response);
  }
});

router.get("/favorites", async (req, res) => {
  //   console.log(req.query.id);

  try {
    const isUserConnected = await User.findOne({ token: req.query.token });
    console.log("isUserExist==>", isUserConnected.favCharacters);
    if (isUserConnected === null) {
      //   console.log("s'affiche si mon isUserExist est invalide");
      res.status(400).json({ message: "userId invalid" });
    } else {
      res.status(200).json(isUserConnected.favCharacters);
      console.log();
    }
    // console.log(isUserExist);
  } catch (error) {
    console.log(error.response);
  }
});
module.exports = router;
