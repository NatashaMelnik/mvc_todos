const router = require('express').Router()

const controller = require('../controllers/task_orm');

const read = function () {
    router.get('/:listId/tasks/', function (req, res) {
        controller.displayAll(req.params.listId)
            .then(data => {
                res.send(data);
            });
    });
    router.get('/:listId/tasks/:id', function (req, res) {
        controller.displaySingle(+req.params.listId, +req.params.id)
            .then(data => {
                res.send(data);
            });
    });
}

const write = function () {
    router.post('/:listId/tasks', function (req, res) {
        controller.addTask(req.params.listId, req.body)
            .then((data) => {
                res.send(data);
            });
    });
    router.patch('/:listId/tasks', function (req, res) {
        controller.updateTask(req.params.listId, +req.body.id, req.body)
            .then(data => {
                res.send(data);
            });
    });
    router.put('/:listId/tasks', function (req, res) {
        controller.rewriteTask(req.params.listId, +req.body.id, req.body)
            .then(data => {
                res.send(data);
            });
    });
    router.delete('/:listId/tasks', function (req, res) {
        controller.deleteTask(req.params.listId, +req.body.id)
            .then(data => {
                res.send(data);
            });
    });
}

read();
write();

module.exports = router