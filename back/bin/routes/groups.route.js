const express = require('express');
const groups = require('../controllers/groups.ctrl');

const router = express.Router();

router.route('/')
.get(groups.getGroups)
.post(groups.verifyNewGroup, groups.createGroup);

router.route('/:id')
.get(groups.getGroup)
.put(groups.verifyGroup, groups.updateGroup)
.delete(groups.deleteGroup);

router.patch('/:id/move/:targetBoardId/:targetBoardPosition', groups.moveGroup);
router.patch('/:id/move/:targetBoardId', groups.moveGroup);

module.exports = router;
