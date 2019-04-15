const BoardModel = require('../models/board.model');
const pick = require('lodash/pick');
const {populateGroups} = require('./groups.service');
const {withTransaction} = require('../tools');
const models = require('../models/models');

const updateParams = {
  new: true,
};

const getBoards = async filter => {
  return BoardModel.find(filter).exec();
};

const addBoard = async board => {
  board = pick(board, ['title']);
  console.log('adding board', board);

  return BoardModel.create(board);
};

const getBoard = async id => {
  return BoardModel.findById(id)
  .populate({
    path: 'cards',
    model: models.Group,
    populate: {
      path: 'cards',
      model: models.Card,
    },
  });
};

const updateBoard = async (id, board) => {
  return BoardModel.findByIdAndUpdate(id, pick(board, ['title']), updateParams);
};

const deleteBoard = async (id) => {
  return BoardModel.findByIdAndDelete(id);
};

const removeGroupFromCurrentBoard = async (groupId, session) => BoardModel.findOneAndUpdate(
    {groups: {$in: [groupId]}},
    {$pull: {groups: groupId}},
    {session, new: true},
);

const appendGroupToBoard = async (groupId, toBoardId, toBoardPosition, session) => BoardModel.findOneAndUpdate(
    {_id: toBoardId},
    {$push: {groups: {$each: [groupId], $position: toBoardPosition}}},
    {session, new: true},
);

const moveGroup = async (groupId, toBoardId, toBoardPosition) => withTransaction(async session => {
  const boardFrom = await removeGroupFromCurrentBoard(groupId, session);
  // if (!boardFrom) {
  //   throw 409; //conflict
  // }

  const boardTo = await appendGroupToBoard(groupId, toBoardId, toBoardPosition, session);

  // console.log('to:', boardTo, boardTo._id);
  if (!boardTo) {
    throw 409; //conflict
  }

  await populateGroups(boardTo, 'groups');
  if (boardFrom && boardFrom._id.toString() !== boardTo._id.toString()) {
    // console.log('from:', boardFrom, boardFrom._id);
    await populateGroups(boardFrom, 'groups');
    return {
      boardFrom,
      boardTo,
    };
  } else {
    return {boardTo};
  }
});

module.exports = {
  getBoards,
  addBoard,
  getBoard,
  updateBoard,
  deleteBoard,
  moveGroup,
  removeGroupFromCurrentBoard,
};
