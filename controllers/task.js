const Task = require('../models/model');

class TaskController {

    displayAll(res) {
        return res.send(Task);
    }

    displaySingle(res, id) {
        return res.send(Task[id]);
    }

    addTask(req, res) {
        const taskId = parseInt(req.params.id);
        let task = Task.find(t => +t.id === +taskId);
        if (task) {
            Object.assign(task, req.body);
            return res.json(Task);
        } else {
            task = { id: Task.length + 1, name: req.body.name };
            Task.push(task);
            if (req.body.done === false || req.body.done === true) {
                Object.assign(task, req.body);
            }
        }
        return res.send(Task);
    }

    updateTask(req, res) {
        const taskId = parseInt(req.params.id);
        let task = Task.find(t => +t.id === +taskId);
        if (task) {
            Object.assign(task, req.body);
            return res.json(Task);
        }
        return res.json(Task);
    }

    rewriteTask(req, res) {
        const taskId = parseInt(req.params.id);
        let task = Task.find(t => +t.id === +taskId);
        if (task) {
            Object.assign(task, req.body);
            return res.json(Task);
        }
        return res.json(Task);
    }

}

module.exports = new TaskController();