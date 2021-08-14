const express = require('express');
const router = express.Router();
const { message, auth } = require("../controllers");
const { messageValidator } = require('../utils/validators');

router.use(auth.checkToken);

router.get("/chat/:id", message.getMessages);
//router.get("/:id", message.getMessage);
router.post("/", messageValidator, message.addMessage);

module.exports = router;