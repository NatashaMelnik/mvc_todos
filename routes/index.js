const express = require('express');
const router = express.Router();

const lists = require('./lists');
const tasks = require('./tasks');
const dashboard = require('./dashboard');
const collection_today = require('./collection-today');

router.use('/lists/', lists);
router.use('/tasks/', tasks);
router.use('/dashboard/', dashboard);
router.use('/collection/today/', collection_today);

module.exports = router
