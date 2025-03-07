const express = require("express");
const { getAllUsers, getUserById, createUser } = require("../controllers/usersControllers");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:user_id", getUserById);
router.post("/", createUser);

module.exports = router;
