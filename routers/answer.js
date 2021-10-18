const express = require("express");
const router = express.Router();

const {addNewAnswerToQuestion} = require("../controllers/answer");

router.post("/",addNewAnswerToQuestion)


module.exports = router;
