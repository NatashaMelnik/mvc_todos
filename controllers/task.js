let Task = require('../models/model');

class TaskController {

    // crud create read update delete

    displayAll(res) {
        return res.send(Task);
    }

    displaySingle(res, id) {
        return res.send(Task[id - 1]);
    }

    addTask(req, res) {
        let task = { id: Task.length + 1, name: req.body.name };
        Task.push(task);
        if (req.body.done === false || req.body.done === true) {
            Object.assign(task, req.body);
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

    deleteTask(req, res) {
        const taskId = parseInt(req.params.id);
        if(taskId <= Task.length){
            Task.splice(taskId - 1, 1);
            return res.json(Task);
        }
        return res.json(Task);
    }

}

module.exports = new TaskController();
