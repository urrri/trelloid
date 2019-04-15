const {celebrate, Joi} = require('celebrate');
const boards = require('../services/boards.service');

const getBoards = async (req, res, next) => {
  const filter = req.query;
  try {
    const result = await boards.getBoards(filter);

    res.status(200).json(result);
    //next()
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

const verifyNewBoard = celebrate({
  body: Joi.object().keys({
    board: Joi.object().keys({
      title: Joi.string().required(),
    }).unknown(),
  }),
});

const verifyBoard = celebrate({
  body: Joi.object().keys({
    board: Joi.object().keys({
      title: Joi.string(),
    }).unknown(),
  }),
});

const createBoard = async (req, res, next) => {
  const {board} = req.body;
  try {
    const result = await boards.addBoard(board);
    res.status(200).json(result);
    //next()
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

const getBoard = async (req, res, next) => {
  const boardId = req.params.id;
  try {
    const result = await boards.getBoard(boardId);
    if (!result) {
      res.sendStatus(404);
    } else {
      res.status(200).json(result);
    }
    //next()
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

const updateBoard = async (req, res, next) => {
  const boardId = req.params.id;
  const {board} = req.body;
  try {
    const result = await boards.updateBoard(boardId, board);
    if (!result) {
      res.sendStatus(404);
    } else {
      res.status(200).json(result);
    }
    //next()
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

const deleteBoard = async (req, res, next) => {
  const boardId = req.params.id;
  try {
    const result = await boards.deleteBoard(boardId);
    if (!result) {
      res.sendStatus(404);
    } else {
      res.status(200).json(result);
    }
    //next()
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

module.exports = {
  getBoards,
  verifyNewBoard,
  verifyBoard,
  createBoard,
  getBoard,
  updateBoard,
  deleteBoard,
};
