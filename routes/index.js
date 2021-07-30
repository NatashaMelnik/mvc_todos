const express = require('express');
const router = express.Router();

const allTasks = require('./tasks');

router.use('/tasks', allTasks);

module.exports = router
