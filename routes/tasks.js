const router = require('express').Router()

const controller = require('../controllers/task');

router.get('/', function (req, res) {
  controller.displayAll(res);
});

router.get('/:id', function (req, res) {
  controller.displaySingle(res, +req.params.id);
});

router.post('/:id', function (req, res) {
  controller.addTask(req, res);
});

router.post('/', function (req, res) {
  controller.addTask(req, res);
});

module.exports = router
