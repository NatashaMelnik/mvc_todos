const express = require('express');
const router = express.Router();

const lists = require('./lists');
const tasks = require('./tasks');
const dashboard = require('./dashboard');

router.use('/lists/', lists);
router.use('/tasks/', tasks);
router.use('/dashboard/', dashboard);

module.exports = router
