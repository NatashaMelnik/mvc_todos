const express = require('express');
const router = express.Router();

const lists = require('./lists');
const tasks = require('./tasks');

router.use('/lists/', lists);
router.use('/tasks/', tasks);

module.exports = router
