const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.get(`/`, async (req, res) => {
  const userList = await User.find().select("");

  if (!userList) {
    res.status(500).json({ success: false });
  }

  res.send(userList);
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
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
