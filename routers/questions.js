const express = require("express");
const answer = require("./answer");
const {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
  likeUndoLikeQuestion,
} = require("../controllers/questions");
const router = express.Router();
const {
  getAccessToRoute,
  getQuestionOwnerAccess,
} = require("../middlewares/auth/auth");
const {
  checkQuestionExist,
} = require("../middlewares/database/databaseErrorHelpers");

router.post("/ask", getAccessToRoute, askNewQuestion);
router.get("/:id", checkQuestionExist, getSingleQuestion);
router.get("/", getAllQuestions);
router.put(
  "/edit/:id",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  editQuestion
);
router.delete(
  "/delete/:id",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  deleteQuestion
);
router.get(
  "/like/:id",
  [getAccessToRoute, checkQuestionExist],
  likeUndoLikeQuestion
);
router.use("/:question_id/answers",answer);
module.exports = router;
