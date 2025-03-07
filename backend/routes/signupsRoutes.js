const express = require("express");
const { signupUser, deleteSignup } = require("../controllers/signupsControllers");

const router = express.Router();

router.post("/", signupUser);
router.delete("/:signup_id", deleteSignup);

module.exports = router;
