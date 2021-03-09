const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {});

router.post("/", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: req.body.passwordHash,
    image: req.body.image,
    street: req.body.street,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
  });
  user = await user.save();

  if (!user) {
    return res.status(404).send("the category cannot be created");
  }

  res.send(user);
});

module.exports = router;
