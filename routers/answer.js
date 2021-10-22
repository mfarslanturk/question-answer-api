const express = require("express");
const router = express.Router({mergeParams:true});
const { getAccessToRoute } = require("../middlewares/auth/auth");
const {
  checkQuestionExist,
} = require("../middlewares/database/databaseErrorHelpers");

const { addNewAnswerToQuestion,getAllAnswersByQuestion } = require("../controllers/answer");

router.post(
  "/",
  [checkQuestionExist, getAccessToRoute],
  addNewAnswerToQuestion
);

router.get("/", getAllAnswersByQuestion);

module.exports = router;
