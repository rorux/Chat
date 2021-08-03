const express = require('express');
const router = express.Router();
const { user, auth } = require("../controllers");

router.use(auth.checkToken);

router.get("/", user.getInfo);
router.post("/chat", user.addChat);
router.put("/chat", user.connectChat);
router.delete("/chat/:id", user.removeChat);

module.exports = router;