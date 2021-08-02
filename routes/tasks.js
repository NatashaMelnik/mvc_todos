const router = require('express').Router()

const controller = require('../controllers/task');

const read = function () {
    router.get('/', function (req, res) {
        if (+req.body.id) {
            let result = controller.displaySingle(req.query.listId, +req.body.id);
            res.send(result);
        }
        else {
            let result = controller.displayAll(req.query.listId);
            res.send(result);
        }
    });
}

const write = function () {
    router.post('/', function (req, res) {
        let result = controller.addTask(req.query.listId, req.body);
        res.send(result);
    });
    router.patch('/', function (req, res) {
        let result = controller.updateTask(req.query.listId, +req.body.id, Boolean(req.body.done));
        res.send(result);
    });
    router.put('/', function (req, res) {
        let result = controller.rewriteTask(req.query.listId, +req.body.id, req.body);
        res.send(result);
    });
    router.delete('/', function (req, res) {
        let result = controller.deleteTask(req.query.listId, +req.body.id);
        res.send(result);
    });
}

function crud() {
    read();
    write();
}

crud();

module.exports = router