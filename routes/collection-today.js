const router = require('express').Router()

const controller = require('../controllers/task');

const read = function () {
    router.get('/', function (req, res) {
        controller.displayTodayTasksList()
            .then(data => {
                res.send(data);
            });
    });

}

read();

module.exports = router