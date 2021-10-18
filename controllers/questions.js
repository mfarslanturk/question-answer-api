const Question = require("../models/Question");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");

const askNewQuestion = asyncErrorWrapper(async (req, res, next) => {
  const information = req.body;

  const question = await Question.create({
    ...information,
    user: req.user.id,
  });
  return res.status(200).json({
    success: true,
    data: question,
  });
});

const getAllQuestions = asyncErrorWrapper(async (req, res, next) => {
  const questions = await Question.find();
  return res.status(200).json({
    success: true,
    data: questions,
  });
});

const getSingleQuestion = asyncErrorWrapper(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    data: req.question,
  });
});

const editQuestion = asyncErrorWrapper(async (req, res, next) => {
  const editInformation = req.body;

  const question = await Question.findByIdAndUpdate(
    req.question.id,
    editInformation,
    {
      new: true,
      runValidators: true,
    }
  );
  return res.status(200).json({
    success: true,
    data: question,
  });
});

const deleteQuestion = asyncErrorWrapper(async (req, res, next) => {
  await req.question.remove();

  return res.status(200).json({
    success: true,
    message: "Delete Operation Successful",
  });
});

const likeUndoLikeQuestion = asyncErrorWrapper(async (req, res, next) => {
  if (req.question.likes.includes(req.question.user.id.toString("hex"))) {
    const index = req.question.likes.indexOf(req.user.id);
    req.question.likes.splice(index, 1);
    await req.question.save();
  } else {
    req.question.likes.push(req.question.user.id.toString("hex"));
    await req.question.save();
  }

  return res.status(200).json({
    success: true,
    message: "Like-UndoLike Operation Successful",
  });
});

module.exports = {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
  likeUndoLikeQuestion,
};
