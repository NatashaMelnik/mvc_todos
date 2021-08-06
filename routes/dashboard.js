const router = require('express').Router()

const controller = require('../controllers/task');

const read = function () {
    router.get('/today', function (req, res) {
        controller.displayTodayTasks()
            .then(data => {
                res.send(data[0].count + ' tasks for today');
            });
    });
    router.get('/status', function (req, res) {
        controller.undoneTasks()
            .then(data => {
                res.send(data);
            });
    });
}

read();

module.exports = router