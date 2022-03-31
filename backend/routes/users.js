const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", async (req, res) => {
  const userDetails = req.body;

  await userController.registerUser(userDetails, res);
})

module.exports = router;