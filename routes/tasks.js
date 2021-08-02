const router = require('express').Router()

const controller = require('../controllers/task');

const read = function () {
    router.get('/', function (req, res) {
        console.log(req.query.listId);
        let listId = +req.query.listId;
        let taskId = +req.query.taskId;
        if (!taskId) {
            controller.displayAll(res, listId);
        }
        else {
            controller.displaySingle(res, listId, taskId);
        }
    });
}

// const write = function() {
//   router.post('/tasks/', function (req, res) {
//     controller.addTask(req, res);
//   });
//   router.put('/tasks/:id', function (req, res) {
//     controller.rewriteTask(req, res);
//   });
//   router.patch('/tasks/:id', function (req, res) {
//     controller.updateTask(req, res);
//   });
//   router.delete('/tasks/:id', function(req, res) {
//     controller.deleteTask(req, res);
//   });
// }


function crud() {
    read();
    // write();
}

crud();

module.exports = router