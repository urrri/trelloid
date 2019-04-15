const CardModel = require('../models/card.model');
const pick = require('lodash/pick');

const updateParams = {
  new: true,
};

const getCards = async filter => {
  return CardModel.find(filter).exec();
};

const addCard = async card => {
  card = pick(card, ['title']);
  console.log('adding card', card);

  return CardModel.create(card);
};

const getCard = async id => {
  return CardModel.findById(id);
};

const updateCard = async (id, card) => {
  return CardModel.findByIdAndUpdate(id, pick(card, ['title']), updateParams);
};

const deleteCard = async (id) => {
  return CardModel.findByIdAndDelete(id);
};

const populateCards = async (model, path) => CardModel.populate(model, {path});

module.exports = {
  getCards,
  addCard,
  getCard,
  updateCard,
  deleteCard,
  populateCards,
};
