const router = require('express').Router()

const controller = require('../controllers/task_orm');

const read = function () {
    router.get('/:listId/tasks/', function (req, res) {
        console.log('in orm routs');
        console.log(req.params.listId);
        controller.displayAll(req.params.listId)
            .then(data => {
                res.send(data);
            });
    });
}

const write = function () {
    // router.get('/today', function (req, res) {
    //     controller.displayTodayTasks()
    //         .then(data => {
    //             res.send(data[0].count + ' tasks for today');
    //         });
    // });
}

read();

module.exports = router