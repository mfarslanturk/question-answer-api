const Answer = require("../models/Answer");
const Question = require("../models/Question");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");

const addNewAnswerToQuestion = asyncErrorWrapper(async (req, res, next) => {
  const information = req.body;

  const answer = await Answer.create({
    ...information,
    user: req.user.id,
    question: req.question.id,
  });
  
  return res.status(200).json({
    success: true,
    data: answer,
  });
});
module.exports = {
  addNewAnswerToQuestion,
};
