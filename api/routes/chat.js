const express = require('express');
const router = express.Router();
const { chat, auth } = require("../controllers");

router.use(auth.checkToken);

router.get("/member/:id", chat.getMembers);
router.get("/:id", chat.getChat);
router.delete("/:id", chat.deleteChat);

module.exports = router;