const {Schema, model} = require('mongoose');
const models = require('./models');

const Board = new Schema({
  title: {type: String, required: true},
  groups: {type: [Schema.Types.ObjectId], ref: models.Group, required: true, default: []},
});

// validation
Board.path('title').validate(function(v) {
  return v.length > 2 && v.length < 70;
});

const BoardModel = model(models.Board, Board);

module.exports = BoardModel;