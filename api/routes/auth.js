const express = require('express');
const router = express.Router();
const { auth } = require("../controllers");
const { authValidator } = require('../utils/validators');

router.post("/login", authValidator, auth.login);
router.post("/signup", authValidator, auth.signUp);
router.post("/refresh", auth.refreshToken);
router.post("/logout", auth.logout);

module.exports = router;
