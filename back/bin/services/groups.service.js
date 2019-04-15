const GroupModel = require('../models/group.model');
const pick = require('lodash/pick');
const {populateCards} = require('./cards.service');
const {withTransaction} = require('../tools');
const models = require('../models/models');

const updateParams = {
  new: true,
};

const getGroups = async filter => {
  return GroupModel
  .find(filter)
  .populate({path: 'cards', model: models.Card})
  .exec();
};

const addGroup = async group => {
  group = pick(group, ['title']);
  console.log('adding group', group);

  return GroupModel.create(group);
};

const getGroup = async id => {
  return GroupModel.findById(id)
  .populate({path: 'cards', model: models.Card});
};

const updateGroup = async (id, group) => {
  return GroupModel.findByIdAndUpdate(id, pick(group, ['title']), updateParams);
};

const deleteGroup = async (id) => {
  return GroupModel.findByIdAndDelete(id);
};

const removeCardFromCurrentGroup = async (cardId, session) => GroupModel.findOneAndUpdate(
    {cards: {$in: [cardId]}},
    {$pull: {cards: cardId}},
    {session, new: true},
);

const appendCardToGroup = async (cardId, toGroupId, toGroupPosition, session) => GroupModel.findOneAndUpdate(
    {_id: toGroupId},
    {$push: {cards: {$each: [cardId], $position: toGroupPosition}}},
    {session, new: true},
);

const moveCard = async (cardId, toGroupId, toGroupPosition) => withTransaction(async session => {
  const groupFrom = await removeCardFromCurrentGroup(cardId, session);
  // if (!groupFrom) {
  //   throw 409; //conflict
  // }

  const groupTo = await appendCardToGroup(cardId, toGroupId, toGroupPosition, session);

  // console.log('to:', groupTo, groupTo._id);
  if (!groupTo) {
    throw 409; //conflict
  }

  await populateCards(groupTo, 'cards');
  if (groupFrom && groupFrom._id.toString() !== groupTo._id.toString()) {
    // console.log('from:', groupFrom, groupFrom._id);
    await populateCards(groupFrom, 'cards');
    return {
      groupFrom,
      groupTo,
    };
  } else {
    return {groupTo};
  }
});

const populateGroups = async (model, path) => GroupModel.populate(model, {path});

module.exports = {
  getGroups,
  addGroup,
  getGroup,
  updateGroup,
  deleteGroup,
  moveCard,
  removeCardFromCurrentGroup,
  populateGroups,
};
