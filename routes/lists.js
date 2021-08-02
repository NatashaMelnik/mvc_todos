const router = require('express').Router()

const controller = require('../controllers/task');

const read = function () {
  router.get('/:listId/tasks/', function (req, res) {
    controller.displayAll(res, +req.params.listId);
  });
  router.get('/:listId/tasks/:id', function (req, res) {
    controller.displaySingle(res, +req.params.listId, +req.params.id);
  });
}

const write = function() {
  router.post('/:listId/tasks', function (req, res) {
    controller.addTask(req, res);
  });
  router.patch('/:listId/tasks/:id', function (req, res) {
    controller.updateTask(req, res);
  });
  router.put('/:listId/tasks/:id', function (req, res) {
    controller.rewriteTask(req, res);
  });
  router.delete('/:listId/tasks/:id', function(req, res) {
    controller.deleteTask(req, res);
  });
}

function crud() {
    read();
    write();
}

crud();

module.exports = router
