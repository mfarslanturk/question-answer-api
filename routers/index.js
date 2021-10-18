const express = require("express");
const router = express.Router();
const auth = require("./auth");
const questions = require("./questions");
const user = require("./user");
const admin = require("./admin");

router.use("/questions", questions);
router.use("/auth", auth);
router.use("/users",user);
router.use("/admin",admin);


module.exports = router;
