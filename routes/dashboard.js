const router = require('express').Router()

const controller = require('../controllers/task');

const read = function () {
    router.get('/today', function (req, res) {
        //   res.send('today')
        controller.displayTodayTasks()
            .then(data => {
                res.send(data);
            });

    });
    router.get('/status', function (req, res) {
        controller.displaySingle(req.params.listId, +req.params.id)
            .then(data => {
                res.send(data);
            });
    });
}

read();

module.exports = router