const router = require('express').Router()

const controller = require('../controllers/task');

const read = function () { // query
    router.get('/', function (req, res) {
        if (+req.query.id) {
            let result = controller.displaySingle(req.query.listId, +req.query.id);
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
        let result = controller.addTask(req.query.listId, req.query.name, Boolean(req.query.done));
        res.send(result);
    });
    router.patch('/', function (req, res) {
        let result = controller.updateTask(req.query.listId, +req.query.id, Boolean(req.query.done));
        res.send(result);
    });
    router.put('/', function (req, res) {
        let body = { name: req.query.name };
        if (req.query.done == 'False' || req.query.done == 'True') {
            body.done = Boolean(req.query.done)
        }
        let result = controller.rewriteTask(req.query.listId, +req.query.id, body);
        res.send(result);
    });
    router.delete('/', function (req, res) {
        let result = controller.deleteTask(req.query.listId, +req.query.id);
        res.send(result);
    });
}

function crud() {
    read();
    write();
}

crud();

module.exports = router