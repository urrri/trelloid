const {celebrate, Joi} = require('celebrate');
const cards = require('../services/cards.service');
const groups = require('../services/groups.service');

const getCards = async (req, res, next) => {
  const filter = req.query;
  try {
    const result = await cards.getCards(filter);

    res.status(200).json(result);
    //next()
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

const verifyNewCard = celebrate({
  body: Joi.object().keys({
    card: Joi.object().keys({
      title: Joi.string().required(),
    }).unknown(),
  }),
});

const verifyCard = celebrate({
  body: Joi.object().keys({
    card: Joi.object().keys({
      title: Joi.string(),
    }).unknown(),
  }),
});

const createCard = async (req, res, next) => {
  const {card} = req.body;
  try {
    const result = await cards.addCard(card);
    res.status(200).json(result);
    //next()
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

const getCard = async (req, res, next) => {
  const cardId = req.params.id;
  try {
    const result = await cards.getCard(cardId);
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

const updateCard = async (req, res, next) => {
  const cardId = req.params.id;
  const {card} = req.body;
  try {
    const result = await cards.updateCard(cardId, card);
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

const deleteCard = async (req, res, next) => {
  const cardId = req.params.id;
  try {
    await groups.removeCardFromCurrentGroup(cardId);
    const result = await cards.deleteCard(cardId);
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

const moveCard = async (req, res, next) => {
  const {id: cardId, targetGroupId, targetGroupPosition} = req.params;
  const position = targetGroupPosition
                   ? parseInt(targetGroupPosition) || 0
                   : Number.MAX_SAFE_INTEGER;
  try {
    const result = await groups.moveCard(cardId, targetGroupId, position);
    if (!result) {
      res.sendStatus(404);
    } else {
      res.status(200).json(result);
    }
    //next()
  } catch (e) {
    if (typeof e === 'number') {
      res.sendStatus(e) && next(e);
    } else {
      res.sendStatus(500) && next(e);
    }
  }
};

module.exports = {
  getCards,
  verifyNewCard,
  verifyCard,
  createCard,
  getCard,
  updateCard,
  deleteCard,
  moveCard,
};
