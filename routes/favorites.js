const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");
const User = require("../models/User");

router.post("/favorites", async (req, res) => {
  // console.log("req.fields==>", req.fields);
  try {
    const isUserConnected = await User.findOne({ token: req.fields.token });
    // console.log(isUserConnected);
    if (isUserConnected === null) {
      res.status(400).json({ message: "user invalid" });
    } else {
      const CharacToFind = isUserConnected.favCharacters.find(
        (elem) => elem._id === req.fields.characters._id
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
  // console.log("logggggg  reqqqqq", req.query.token);

  try {
    const isUserConnected = await User.findOne({ token: req.query.token });
    // console.log("isUserConnected==>", isUserConnected.favCharacters);
    if (isUserConnected === null) {
      res.status(400).json({ message: "user invalid" });
    } else {
      res.status(200).json(isUserConnected.favCharacters);
      // console.log(isUserConnected);
    }
    // console.log("isuserconnected", isUserConnected);
    // console.log("token", req.fields.token);
    // console.log("charct", req.fields.characters);
    // console.log();
  } catch (error) {
    console.log(error.response);
  }
});
router.delete("/favorites", async (req, res) => {
  // console.log("token delete route", req.fields);

  const isUserExist = await User.findOne({ token: req.fields.token });
  // console.log("elem delete route", req.fields.elem);
  // console.log("isuserconnected delete route", isUserExist);
  if (isUserExist === null) {
    res.status(400).json({ message: "User invalid" });
  } else {
    console.log(
      "is userexist tab charac delete route",
      isUserExist.favCharacters
    );
    console.log(req.fields);
    isUserExist.favCharacters = isUserExist.favCharacters.filter(
      (element) => element._id !== req.fields.characterId
    );

    await isUserExist.save();
    res.json({ message: "Character removed" });
  }
});
module.exports = router;
