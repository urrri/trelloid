const express = require('express');
const cards = require('../controllers/cards.ctrl');

const router = express.Router();

router.route('/')
.get(cards.getCards)
.post(cards.verifyNewCard, cards.createCard);

router.route('/:id')
.get(cards.getCard)
.put(cards.verifyCard, cards.updateCard)
.delete(cards.deleteCard);

router.patch('/:id/move/:targetGroupId/:targetGroupPosition', cards.moveCard);
router.patch('/:id/move/:targetGroupId', cards.moveCard);

module.exports = router;
