const express = require('express');
const boards = require('../controllers/boards.ctrl');

const router = express.Router();

router.route('/')
.get(boards.getBoards)
.post(boards.verifyNewBoard, boards.createBoard);

router.route('/:id')
.get(boards.getBoard)
.put(boards.verifyBoard, boards.updateBoard)
.delete(boards.deleteBoard);

module.exports = router;
