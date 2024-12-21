const express = require("express");
const { register, login, setAvatar, getAllUsers } = require("../controllers/userController");

const router = express.Router();  // Initialize router properly

router.post("/register", register);  // Define route on the 'router' object

router.post("/login", login);

router.post("/setAvatar/:id", setAvatar)

router.get('/allusers/:id',getAllUsers)

module.exports = router;  // Export the 'router' object, not 'Router'
