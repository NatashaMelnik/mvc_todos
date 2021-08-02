const router = require('express').Router()

const controller = require('../controllers/task');

const read = function () {
  router.get('/:listId/tasks/', function (req, res) {
    let result = controller.displayAll(req.params.listId);
    res.send(result);
  });
  router.get('/:listId/tasks/:id', function (req, res) {
    let result = controller.displaySingle(req.params.listId, +req.params.id);
    res.send(result);
  });
}

const write = function() {
  router.post('/:listId/tasks', function (req, res) {
    let result = controller.addTask(req.params.listId, req.body);
    res.send(result);
  });
  router.patch('/:listId/tasks', function (req, res) {
    let result = controller.updateTask(req.params.listId, +req.body.id, req.body);
    res.send(result);
  });
  router.put('/:listId/tasks', function (req, res) {
    let result = controller.rewriteTask(req.params.listId, +req.body.id, req.body);
    res.send(result);
  });
  router.delete('/:listId/tasks', function(req, res) {
    let result = controller.deleteTask(req.params.listId, +req.body.id);
    res.send(result);
  });
}

function crud() {
    read();
    write();
}

crud();

module.exports = router
