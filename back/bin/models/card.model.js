const {Schema, model} = require('mongoose');
const models = require('./models');

const Card = new Schema({
  title: {type: String, required: true},
});

// validation
Card.path('title').validate(function(v) {
  return v.length > 2 && v.length < 70;
});

const CardModel = model(models.Card, Card);

module.exports = CardModel;