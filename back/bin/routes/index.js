const router = require('express').Router();

router.use('/boards', require('./boards.route'));
router.use('/groups', require('./groups.route'));
router.use('/cards', require('./cards.route'));

module.exports = router;
