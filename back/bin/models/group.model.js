const {Schema, model} = require('mongoose');
const models = require('./models');

const Group = new Schema({
  title: {type: String, required: true},
  cards: {type: [Schema.Types.ObjectId], ref: models.Card, required: true, default: []},
});

// validation
Group.path('title').validate(function(v) {
  return v.length > 2 && v.length < 70;
});

const GroupModel = model(models.Group, Group);

module.exports = GroupModel;