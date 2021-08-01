const router = require('express').Router()

const controller = require('../controllers/task');

const read = function () {
  router.get('/', function (req, res) {
    controller.displayAll(res);
  });
  router.get('/:id', function (req, res) {
    controller.displaySingle(res, +req.params.id);
  });
}

const write = function() {
  router.post('/', function (req, res) {
    controller.addTask(req, res);
  });
  router.put('/:id', function (req, res) {
    controller.rewriteTask(req, res);
  });
  router.patch('/:id', function (req, res) {
    controller.updateTask(req, res);
  });
  router.delete('/:id', function(req, res) {
    controller.deleteTask(req, res);
  });
}


function crud() {
    read();
    write();
}

crud();

module.exports = router
