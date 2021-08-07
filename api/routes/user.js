const express = require('express');
const router = express.Router();
const { user, auth } = require("../controllers");
const { chatValidator } = require('../utils/validators');

router.use(auth.checkToken);

router.get("/", user.getInfo);
router.post("/chat", chatValidator, user.addChat);
router.put("/chat", chatValidator, user.connectChat);
router.delete("/chat/:id", user.removeChat);

module.exports = router;