const {celebrate, Joi} = require('celebrate');
const groups = require('../services/groups.service');
const boards = require('../services/boards.service');

const getGroups = async (req, res, next) => {
  const filter = req.query;
  try {
    const result = await groups.getGroups(filter);

    res.status(200).json(result);
    //next()
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

const verifyNewGroup = celebrate({
  body: Joi.object().keys({
    group: Joi.object().keys({
      title: Joi.string().required(),
    }).unknown(),
  }),
});

const verifyGroup = celebrate({
  body: Joi.object().keys({
    group: Joi.object().keys({
      title: Joi.string(),
    }).unknown(),
  }),
});

const createGroup = async (req, res, next) => {
  const {group} = req.body;
  try {
    const result = await groups.addGroup(group);
    res.status(200).json(result);
    //next()
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

const getGroup = async (req, res, next) => {
  const groupId = req.params.id;
  try {
    const result = await groups.getGroup(groupId);
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

const updateGroup = async (req, res, next) => {
  const groupId = req.params.id;
  const {group} = req.body;
  try {
    const result = await groups.updateGroup(groupId, group);
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

const deleteGroup = async (req, res, next) => {
  const groupId = req.params.id;
  try {
    await boards.removeGroupFromCurrentBoard(groupId);
    const result = await groups.deleteGroup(groupId);
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

const moveGroup = async (req, res, next) => {
  const {id: groupId, targetBoardId, targetBoardPosition} = req.params;
  const position = targetBoardPosition
                   ? parseInt(targetBoardPosition) || 0
                   : Number.MAX_SAFE_INTEGER;
  try {
    const result = await boards.moveGroup(groupId, targetBoardId, position);
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
  getGroups,
  verifyNewGroup,
  verifyGroup,
  createGroup,
  getGroup,
  updateGroup,
  deleteGroup,
  moveGroup,
};
